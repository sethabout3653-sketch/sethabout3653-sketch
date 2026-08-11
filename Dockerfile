# Step 1: Use an Nginx lightweight base to instantly serve your HTML page
FROM nginx:alpine

# Step 2: Copy your HTML file into Nginx's default directory
COPY ./index.html /usr/share/nginx/html

# Step 3: Pull the Anubis binary straight from GitHub into this same container
COPY --from=ghcr.io/techarohq/anubis:latest /app/anubis /usr/local/bin/anubis

# Step 4: Open port 8000 internally for Render
EXPOSE 80

# FIX: Start Nginx as a background daemon, wait 2 seconds, then boot Anubis
CMD ["sh", "-c", "nginx -g 'daemon on;' && sleep 2 && anubis --bind :$PORT --target http://localhost:80 --difficulty 3"]
