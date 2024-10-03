# Build stage
FROM node:16-alpine AS build

# Set the working directory to the root of the repo
WORKDIR /app

# Copy only package.json from the root (since package-lock.json is absent)
COPY package.json ./

# Install dependencies without package-lock.json
RUN npm install --legacy-peer-deps

# Change to the server directory where your server code is
WORKDIR /app/apps/server

# Copy the server code (this will copy everything from the monorepo, so adjust paths as needed)
COPY . .

# Run prisma generate
RUN npx prisma generate

# Build the server (this assumes your build script compiles TypeScript to `dist`)
RUN npm run build

# Production stage
FROM node:16-alpine AS production

# Set the working directory to the server directory in the production image
WORKDIR /app/apps/server

# Copy the production dependencies from the previous build stage
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json ./

# Copy the built application code
COPY --from=build /app/apps/server/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Expose the server port
EXPOSE 8080

# Start the application
CMD ["node", "dist/index.js"]
