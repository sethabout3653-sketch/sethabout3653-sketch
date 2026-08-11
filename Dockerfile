# Step 1: Use the official lightweight stable Caddy image
FROM caddy:alpine

# Step 2: Copy your configuration rules and HTML source
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY ./index.html /usr/share/caddy/index.html

# Step 3: Open port 80 internally for Render traffic mapping
EXPOSE 80

# Step 4: Run Caddy directly using the copied config file
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
