# Dockerfile

# Stage 1: Build environment
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . /app

EXPOSE 9000

CMD ["npm", "run", "dev"]




# # Stage 2: Production environment
# FROM node:20

# # Set the working directory inside the container
# WORKDIR /app

# # Copy dependencies from the builder stage
# COPY --from=builder /app/node_modules ./node_modules

# # Copy built code and other necessary files
# COPY --from=builder /app/dist ./dist
# COPY package*.json ./

# # Expose the application port
# EXPOSE 3001

# # Start the application
# CMD ["npm", "start"]
