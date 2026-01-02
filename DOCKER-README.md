# WHAMazon Docker Deployment

Multi-architecture Docker container for the WHAMazon CTF challenge.

## Quick Start

### Pull and Run

```bash
docker run -d \
  -p 5000:5000 \
  --tmpfs /var/lib/postgresql/data:rw,size=50m \
  --name whamazon \
  strayerraptors/whamazon-react:latest
```

Access the application at `http://localhost:5000`

### Using Docker Compose

```bash
docker-compose up -d
```

## Architecture Support

The image supports multiple architectures:
- `linux/amd64` (x86_64)
- `linux/arm64` (ARM64/Graviton)

Docker will automatically pull the correct image for your platform.

## Container Specifications

- **Port**: 5000
- **Database**: Embedded PostgreSQL (tmpfs, 50MB limit)
- **Storage**: All data is ephemeral (resets on container restart)
- **Pre-loaded Data**:
  - 108 products across 5 categories
  - 20+ user accounts with weak passwords (CTF challenge)
  - Sample orders

## CTF Challenge Details

### User Accounts

The container includes 20 pre-seeded user accounts with intentionally weak passwords for CTF participants to discover:

- `admin` / `admin123` (has admin privileges)
- `jsmith` / `password123`
- `sarah_jones` / `letmein`
- And 17 more with common weak passwords

### Admin Features

Admin users can access `/admin` to:
- View all users
- View all orders
- Manage products

## Building from Source

### Prerequisites

- Docker with buildx support
- Node.js 20+
- npm

### Build Multi-Arch Image

1. Export the database:
```bash
npm run db:export
```

2. Build and push:
```bash
./build-and-push.sh
```

This will:
- Create a buildx builder
- Export the current database state
- Build for both amd64 and arm64
- Push to Docker Hub

### Manual Build

```bash
# Create/use builder
docker buildx create --name multiarch --use
docker buildx inspect --bootstrap

# Build and push
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag strayerraptors/whamazon-react:latest \
  --push \
  .
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Application port |
| `NODE_ENV` | `production` | Node environment |
| `DATABASE_URL` | `postgresql://whamazon:whamazon_password@localhost:5432/whamazon` | PostgreSQL connection string |
| `SESSION_SECRET` | Auto-generated | Session secret key |

## Data Persistence

**Important**: This container uses tmpfs for the database, meaning:
- ✅ Fast performance
- ✅ Perfect for CTF challenges (clean slate on restart)
- ❌ All data is lost when container stops
- ❌ Not suitable for production use

If you need persistence (not recommended for CTF):
```bash
docker run -d \
  -p 5000:5000 \
  -v whamazon-data:/var/lib/postgresql/data \
  strayerraptors/whamazon-react:latest
```

## Health Check

The container includes a health check that verifies the API is responding:

```bash
docker ps  # Check HEALTH status
```

## Troubleshooting

### Container won't start

Check logs:
```bash
docker logs whamazon
```

### Port already in use

Change the host port:
```bash
docker run -p 8080:5000 ... strayerraptors/whamazon-react:latest
```

### Database initialization issues

Remove the container and start fresh:
```bash
docker rm -f whamazon
docker run -p 5000:5000 --tmpfs /var/lib/postgresql/data:rw,size=50m strayerraptors/whamazon-react:latest
```

## Security Notes

This is a CTF challenge container with **intentionally weak security**:
- Weak passwords
- Exposed admin endpoints
- SQL injection possibilities
- Session hijacking vulnerabilities

**DO NOT** use in production or expose to the internet without additional security measures.

## License

MIT
