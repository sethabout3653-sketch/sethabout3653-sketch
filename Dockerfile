FROM nginx:alpine

# Default port for local testing (Render overrides $PORT dynamically at runtime)
ENV PORT=10000

# Copy your HTML file into Nginx web root
COPY index.html /usr/share/nginx/html/index.html

# Generate the Nginx template cleanly without quote collisions
RUN mkdir -p /etc/nginx/templates && \
    echo "server {" > /etc/nginx/templates/default.conf.template && \
    echo "    listen \${PORT};" >> /etc/nginx/templates/default.conf.template && \
    echo "    location / {" >> /etc/nginx/templates/default.conf.template && \
    echo "        root /usr/share/nginx/html;" >> /etc/nginx/templates/default.conf.template && \
    echo "        index index.html;" >> /etc/nginx/templates/default.conf.template && \
    echo "        add_header Content-Security-Policy \"default-src 'none'; frame-src *; style-src 'unsafe-inline';\" always;" >> /etc/nginx/templates/default.conf.template && \
    echo "        add_header X-Frame-Options \"DENY\" always;" >> /etc/nginx/templates/default.conf.template && \
    echo "        add_header X-Content-Type-Options \"nosniff\" always;" >> /etc/nginx/templates/default.conf.template && \
    echo "        add_header Referrer-Policy \"no-referrer\" always;" >> /etc/nginx/templates/default.conf.template && \
    echo "    }" >> /etc/nginx/templates/default.conf.template && \
    echo "}" >> /etc/nginx/templates/default.conf.template

EXPOSE 10000
