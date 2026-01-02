#!/bin/bash
set -e

echo "🏗️  Building multi-arch WHAMazon Docker image..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="strayerraptors/whamazon-react"
TAG="latest"
PLATFORMS="linux/amd64,linux/arm64"

# Check if logged into Docker Hub
echo -e "${BLUE}📝 Checking Docker Hub login...${NC}"
if ! docker info | grep -q "Username:"; then
    echo -e "${YELLOW}⚠️  Not logged into Docker Hub. Please login:${NC}"
    docker login
fi

# Create buildx builder if it doesn't exist
echo -e "${BLUE}🔨 Setting up buildx builder...${NC}"
if ! docker buildx ls | grep -q "multiarch"; then
    docker buildx create --name multiarch --use
else
    docker buildx use multiarch
fi

# Bootstrap the builder
docker buildx inspect --bootstrap

# Export database first
echo -e "${BLUE}📦 Exporting database...${NC}"
npm run db:export

# Build and push multi-arch image
echo -e "${BLUE}🚀 Building and pushing ${IMAGE_NAME}:${TAG} for ${PLATFORMS}...${NC}"
docker buildx build \
    --platform ${PLATFORMS} \
    --tag ${IMAGE_NAME}:${TAG} \
    --push \
    --progress=plain \
    .

# Verify the manifest
echo -e "${GREEN}✓ Build complete! Verifying manifest...${NC}"
docker manifest inspect ${IMAGE_NAME}:${TAG}

echo -e "${GREEN}✅ Successfully built and pushed multi-arch image!${NC}"
echo -e "${GREEN}   Image: ${IMAGE_NAME}:${TAG}${NC}"
echo -e "${GREEN}   Platforms: ${PLATFORMS}${NC}"
echo ""
echo -e "${BLUE}To run the container:${NC}"
echo -e "  docker run -p 5000:5000 --tmpfs /var/lib/postgresql/data:rw,size=50m ${IMAGE_NAME}:${TAG}"
echo ""
echo -e "${BLUE}Or use docker-compose:${NC}"
echo -e "  docker-compose up -d"
