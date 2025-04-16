FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# No need to copy code or build for development mode
# The volume mount in docker-compose.yml will handle this

# Enhanced settings for file change detection
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
ENV NEXT_TELEMETRY_DISABLED=1
# Disable Turbopack to avoid conflicts
ENV NEXT_NO_TURBO=1
# Slow filesystem sensitivity settings
ENV CHOKIDAR_INTERVAL=1000
ENV CHOKIDAR_STABILITY_THRESHOLD=500

EXPOSE 3000

# Use this as default, but it will be overridden by docker-compose.yml
CMD ["npm", "run", "dev"]