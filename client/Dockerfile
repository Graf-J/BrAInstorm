#stage 1
# Pull node
FROM node:16.16.0 as node
# Create working directory
WORKDIR /app
# Copy full application code into working directory
COPY . .
# Install all dependencies of angular application
RUN npm install
# Build Angular application
RUN npm run build
# stage 2
# Pull nginx for angular hosting
FROM nginx:alpine
# Copy angular target folder (dist) into the static hosting path of nginx
COPY --from=node /app/dist/client /usr/share/nginx/html
# Copy in Nginx-ConfigFile
COPY nginx.conf /etc/nginx/conf.d/default.conf