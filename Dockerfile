# Use an official Nginx runtime as a parent image
FROM nginx:stable-alpine

# Install necessary packages for Nginx configuration and potential optimizations
RUN apk add --no-cache \
    bash \
    curl \
    gzip \
    openssl \
    # Add any other modules you might need, e.g., for Lua scripting if you plan advanced logic
    # Example: nginx-module-vts for Nginx statistics
    && apk add --no-cache nginx-module-vts \
    # Clean up apk cache
    && rm -rf /var/cache/apk/*

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy your website's static files (if serving static content directly from this container)
# If you are proxying to another backend, you might not need this.
# COPY html/ /usr/share/nginx/html/

# Copy any custom scripts or configurations
# COPY scripts/ /usr/local/bin/

# Ensure Nginx logs are accessible
VOLUME /var/log/nginx

# Expose port 80 (HTTP) and 443 (HTTPS if you configure it)
EXPOSE 80
EXPOSE 443

# Start Nginx when the container launches
# We'll use a script to ensure proper startup and potentially dynamic config loading
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
