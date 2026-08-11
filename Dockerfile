
FROM nginx:alpine

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy the website
COPY index.html /usr/share/nginx/html/index.html

# Configure Nginx for Render's expected web port
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 10000;
    listen [::]:10000;

    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
}
EOF

EXPOSE 10000

CMD ["nginx", "-g", "daemon off;"]

