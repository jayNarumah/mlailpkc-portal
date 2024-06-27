### STAGE 1: Build ###
FROM node AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

#### install angular cli
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the files
COPY . .

# Generate build --prod
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginxinc/nginx-unprivileged

# Copy the build artifacts from the build stage
COPY --from=build /usr/src/app/dist/sakai-ng /usr/share/nginx/html

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
