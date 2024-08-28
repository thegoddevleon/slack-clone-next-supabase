# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files from the project-root
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Check if .env file exists, if not copy .env.example to .env
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Build the Next.js application
RUN pnpm build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
