# Use the official Node.js 14 base image
FROM node:16.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Generate RSA Certificates
RUN mkdir certs
RUN openssl genrsa -out certs/private.pem
RUN openssl rsa -in certs/private.pem -pubout -out certs/public.pem

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i -g prisma

RUN npm install
RUN npm rebuild bcrypt --build-from-source

# RUN npx prisma generate
# RUN npx prisma db push

# Copy the application code to the container
COPY . .

RUN prisma generate

# Expose the port that the application listens on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "start"]