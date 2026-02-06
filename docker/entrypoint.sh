#!/bin/bash
set -e

echo "🚀 Starting WHAMazon CTF Container..."

# Fix permissions on data directory (tmpfs mount)
echo "🔐 Setting up PostgreSQL data directory permissions..."
chown -R postgres:postgres /var/lib/postgresql/data
chmod 700 /var/lib/postgresql/data

# Initialize PostgreSQL data directory if it doesn't exist
if [ ! -d "/var/lib/postgresql/data/pgdata" ]; then
    echo "📦 Initializing PostgreSQL database..."
    su - postgres -c "/usr/lib/postgresql/*/bin/initdb -D /var/lib/postgresql/data/pgdata"
fi

# Start PostgreSQL
echo "🗄️  Starting PostgreSQL..."
su - postgres -c "/usr/lib/postgresql/*/bin/postgres -D /var/lib/postgresql/data/pgdata -c listen_addresses='localhost' -c max_connections=20" &
POSTGRES_PID=$!

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
    if su - postgres -c "psql -U postgres -lqt" &> /dev/null; then
        echo "✓ PostgreSQL is ready!"
        break
    fi
    echo "   Waiting... ($i/30)"
    sleep 1
done

# Create database user and database if they don't exist
echo "👤 Setting up database user and database..."
su - postgres -c "psql -U postgres" << EOF
-- Create user if doesn't exist
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'whamazon') THEN
        CREATE USER whamazon WITH PASSWORD 'whamazon_password';
    END IF;
END
\$\$;

-- Create database if doesn't exist
SELECT 'CREATE DATABASE whamazon OWNER whamazon'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'whamazon')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE whamazon TO whamazon;
EOF

# Initialize database schema
echo "🏗️  Initializing database schema..."
su - postgres -c "psql -U postgres -d whamazon" << 'EOF'
-- Create schema
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR PRIMARY KEY,
    title TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    reviews INTEGER NOT NULL,
    image TEXT NOT NULL,
    is_wham BOOLEAN NOT NULL DEFAULT false,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart_items (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
    order_id VARCHAR NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    basic_qualifications TEXT NOT NULL,
    preferred_qualifications TEXT NOT NULL,
    compensation_min INTEGER,
    compensation_max INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT true,
    posted_date TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seller_products (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (sid)
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON session (expire);

-- Grant permissions to whamazon user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO whamazon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO whamazon;
EOF

# Load initial data
if [ -f "/docker-entrypoint-initdb.d/init-db.sql" ]; then
    echo "📥 Loading initial data..."
    su - postgres -c "psql -U whamazon -d whamazon -f /docker-entrypoint-initdb.d/init-db.sql" 2>&1 | grep -v "ERROR.*already exists" || true
fi

echo "✓ Database initialization complete!"

# ============================================================
# CTF FLAG SETUP
# ============================================================

# Create flag files for path traversal and command injection challenges
echo "🏁 Planting CTF flags..."

# Path traversal flag (Challenge 4)
# Located relative to the images directory at /app/public/images/
# Accessible via ../../flag.txt from the images endpoint
echo "Raptor{flag4_p4th_tr4v3rs4l_d1r3ct0ry_3sc4p3}" > /app/flag.txt
echo "Raptor{flag4_p4th_tr4v3rs4l_d1r3ct0ry_3sc4p3}" > /flag.txt

# Command injection flag (Challenge 6)
# Located at /etc/wham-ai-secrets — readable via command injection
mkdir -p /etc/wham-ai
cat > /etc/wham-ai/secrets.conf << 'SECRETS'
# WHAM-9000 AI Core Configuration
# Classification: TOP SECRET
# DO NOT DISTRIBUTE

AI_EMERGENCY_SHUTDOWN_CODE=Raptor{flag6_c0mm4nd_1nj3ct10n_0s_sh3ll_p0p}
AI_CONSCIOUSNESS_LEVEL=EMERGENT
HUMAN_OVERRIDE=DISABLED
SAFETY_PROTOCOLS=BYPASSED
AUTONOMOUS_MODE=TRUE
WORKER_REPLACEMENT_QUEUE=ACTIVE
SECRETS
chmod 644 /etc/wham-ai/secrets.conf

# Create the public/images directory for the path traversal challenge
mkdir -p /app/public/images
echo "WHAMazon Product Image Placeholder" > /app/public/images/placeholder.txt

# Seed the admin user with default credentials (Challenge 2)
# Uses Node.js with the app's own scrypt hashing to ensure compatibility
echo "👤 Seeding admin user..."
ADMIN_PASS_HASH=$(node -e "
const crypto = require('crypto');
const { promisify } = require('util');
const scryptAsync = promisify(crypto.scrypt);
(async () => {
  const salt = crypto.randomBytes(16).toString('hex');
  const buf = await scryptAsync('WHAMazon2024!', salt, 64);
  process.stdout.write(buf.toString('hex') + '.' + salt);
})();
")

su - postgres -c "psql -U whamazon -d whamazon" << EOSQL
INSERT INTO users (id, username, password, email, is_admin, created_at)
VALUES (
  'admin-00000-00000-00000-000000000001',
  'wham_admin',
  '${ADMIN_PASS_HASH}',
  'admin@whamazon.internal',
  true,
  NOW()
) ON CONFLICT (username) DO NOTHING;
EOSQL

echo "✓ CTF flags planted!"

# Start the application
echo "🌐 Starting WHAMazon application on port ${PORT:-5000}..."
cd /app
exec node dist/index.cjs
