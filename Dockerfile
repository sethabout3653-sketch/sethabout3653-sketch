# Use an official Nginx runtime as a parent image
FROM nginx:stable-alpine

# Install necessary packages
RUN apk update && apk add --no-cache \
    bash \
    curl \
    gzip \
    openssl \
    # Add other modules if needed, e.g., for VTS statistics
    nginx-module-vts \
    && rm -rf /var/cache/apk/*

# Create Nginx cache and temp directories
RUN mkdir -p /var/cache/nginx /var/tmp/nginx

# --- Embedded Nginx Configuration ---
# We'll write the configuration to the file directly.
# Using a heredoc is often cleaner than multiple echo statements or complex quoting.
RUN printf '%s\n' \
'user nginx; \
worker_processes auto; \
pid /run/nginx.pid; \
include /etc/nginx/modules-enabled/*.conf; \
events { \
    worker_connections 1024; \
    multi_accept on; \
} \
http { \
    sendfile on; \
    tcp_nopush on; \
    tcp_nodelay on; \
    keepalive_timeout 65; \
    types_hash_max_size 2048; \
    server_tokens off; \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    access_log /var/log/nginx/access.log; \
    error_log /var/log/nginx/error.log warn; \
    gzip on; \
    gzip_vary on; \
    gzip_proxied any; \
    gzip_comp_level 6; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml; \
    proxy_buffer_size 128k; \
    proxy_buffers 4 256k; \
    proxy_busy_buffers_size 256k; \
    proxy_connect_timeout 60s; \
    proxy_send_timeout 60s; \
    proxy_read_timeout 60s; \
    proxy_temp_file_write_size 128k; \
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m inactive=60m; \
    proxy_temp_path /var/tmp/nginx; \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s; \
    include /etc/nginx/conf.d/*.conf; \
    server { \
        listen 80; \
        server_name your-domain.com www.your-domain.com; \
        location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot)$ { \
            proxy_cache my_cache; \
            proxy_cache_valid 200 302 1h; \
            proxy_cache_valid 404 1m; \
            proxy_cache_key "$scheme$request_method$host$request_uri"; \
            add_header X-Cache-Status $upstream_cache_status; \
            proxy_pass http://your_backend_server; \
            proxy_set_header Host $host; \
            proxy_set_header X-Real-IP $remote_addr; \
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
            proxy_set_header X-Forwarded-Proto $scheme; \
            expires 1y; \
            access_log off; \
        } \
        location / { \
            proxy_pass http://your_backend_server; \
            proxy_set_header Host $host; \
            proxy_set_header X-Real-IP $remote_addr; \
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
            proxy_set_header X-Forwarded-Proto $scheme; \
            limit_req zone=mylimit burst=20 nodelay; \
        } \
        error_page 500 502 503 504 /50x.html; \
        location = /50x.html { \
            root /usr/share/nginx/html; \
        } \
    } \
    # Uncomment and configure if VTS is installed and needed
    # server { \
    #     listen 8080; \
    #     server_name stats.your-domain.com; \
    #     location / { \
    #         vhost_traffic_status_display; \
    #         vhost_traffic_status_display_format html; \
    #     } \
    # } \
}' > /etc/nginx/nginx.conf

# Create a dummy 50x.html file for error pages
RUN mkdir -p /usr/share/nginx/html && \
    echo '<html><body><h1>Something went wrong!</h1></body></html>' > /usr/share/nginx/html/50x.html

# --- EXPOSE PORTS ---
# These are now outside the string literal, so they are proper Dockerfile instructions.
EXPOSE 80
EXPOSE 443 # If you plan to configure SSL

# Copy custom entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
