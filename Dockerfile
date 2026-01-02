FROM node:20-slim AS builder

# Install PostgreSQL client for database operations
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim

# Install PostgreSQL for embedded database
RUN apt-get update && apt-get install -y \
    postgresql \
    postgresql-contrib \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy database init script
COPY docker/init-db.sql /docker-entrypoint-initdb.d/

# Copy entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create postgres data directory with 50MB limit via tmpfs (will be mounted at runtime)
RUN mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql

# Create app user
RUN useradd -m -s /bin/bash appuser && \
    chown -R appuser:appuser /app

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production \
    PORT=5000 \
    DATABASE_URL=postgresql://whamazon:whamazon_password@localhost:5432/whamazon \
    SESSION_SECRET=whamazon_ctf_secret_key_change_me

# Use entrypoint script to start both PostgreSQL and the app
ENTRYPOINT ["/entrypoint.sh"]
