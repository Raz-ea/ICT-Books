# Stage 1: Build the Vue application

# Use a Node.js image to build the Vue app
FROM node:latest as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e., 'app' folder)
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app with Nginx

# Use an official Nginx image
FROM nginx:alpine as production-stage

# Copy built assets from build-stage to Nginx's serve directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]
