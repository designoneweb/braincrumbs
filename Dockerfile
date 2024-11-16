# Use Node.js LTS version as base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Default to development mode
ENV NODE_ENV=development

# Start the application in development mode by default
CMD ["npm", "start"]
