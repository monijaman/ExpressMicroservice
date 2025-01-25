# Use node:20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema and generate the client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3003

# Start the application
CMD ["npm", "run", "dev"]
