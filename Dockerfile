# Stage 1: Build the React frontend
FROM node:20-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:20-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy the built frontend static files
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose port 8080 (default for Cloud Run)
EXPOSE 8080

# Start the server
CMD ["npm", "start"]
