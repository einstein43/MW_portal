FROM node:20-alpine

WORKDIR /app

# Install netcat for network checking and dos2unix for line ending conversion
RUN apk add --no-cache netcat-openbsd dos2unix

# Copy package files and install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy Prisma files and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy entry script and make it executable
COPY docker-entrypoint.sh /usr/local/bin/
# Convert to Unix line endings and make executable
RUN dos2unix /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy remaining source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3002

# Use the startup script as entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Start the application
CMD ["npm", "start"]