FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/index.html

RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 10000;
    listen [::]:10000;

    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()" always;

    add_header Content-Security-Policy "default-src 'self'; frame-src https:; child-src https:; object-src 'none'; base-uri 'none'; form-action 'none';" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /index.html {
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate" always;
        add_header Pragma "no-cache" always;
        add_header Expires "0" always;
    }

    location ~ /\.(?!well-known) {
        deny all;
    }
}
EOF

EXPOSE 10000

CMD ["nginx", "-g", "daemon off;"]
