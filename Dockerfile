FROM nginx:alpine

# Step 1: Copy your HTML file into the container's web directory
COPY ./index.html /usr/share/nginx/html/index.html

# Step 2: Write the proxy configuration inside the Docker container to strip headers
RUN echo 'server { \n\
    listen 80; \n\
    \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html; \n\
    } \n\
    \n\
    location /proxy/ { \n\
        proxy_pass https://numbercraftacademy.com; \n\
        proxy_set_header Host ://numbercraftacademy.com; \n\
        proxy_set_header User-Agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"; \n\
        proxy_set_header Referer "https://numbercraftacademy.com"; \n\
        proxy_set_header Accept-Encoding ""; \n\
        \n\
        # Hide the blocking headers before they reach your browser \n\
        proxy_hide_header X-Frame-Options; \n\
        proxy_hide_header Content-Security-Policy; \n\
        proxy_hide_header Content-Security-Policy-Report-Only; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

# Step 3: Open port 80 for Render's internal traffic routing
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
