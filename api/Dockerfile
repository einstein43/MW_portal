FROM node:20-alpine

WORKDIR /app

# Install netcat
RUN apk add --no-cache netcat-openbsd

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .



 

# Build the application
RUN npm run build

# Give execution permissions to the startup script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh



EXPOSE 3002

# Use the startup script as entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Start the application
CMD ["npm", "start"]