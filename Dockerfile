# Use a lightweight production Nginx container
FROM nginx:alpine

# Copy your clean index.html straight over
COPY ./index.html /usr/share/nginx/html

# Expose the standard port for Render web services
EXPOSE 80

# Run Nginx normally in the foreground
CMD ["nginx", "-g", "daemon off;"]
