# Step 1: Build stage
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./

# CHANGE THIS LINE: Add the --legacy-peer-deps flag
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Step 2: Production stage (Nginx)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
