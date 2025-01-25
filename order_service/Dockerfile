# Use node:20 as the base image
FROM node:20

# Install netcat and required dependencies
RUN apt-get update && apt-get install -y netcat-traditional && apt-get clean

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# # Copy wait-for-it script
# COPY wait-for-it.sh /usr/local/bin/wait-for-it
# RUN chmod +x /usr/local/bin/wait-for-it

# Set the database URL for drizzle-kit
ENV DATABASE_URL=postgres://order_db:order_db_password@order_db_server:5432/order_service

# Wait for the database and run db:generate
# RUN /usr/local/bin/wait-for-it order_db_server:5433 --timeout=60 -- \
#     npm run db:generate

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
# CMD ["npm", "start"]

CMD ["npm", "run", "dev"]
