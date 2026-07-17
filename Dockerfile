# Step 1: Use the official Anubis image
FROM ghcr.io/techarohq/anubis:latest

# Step 2: Copy your index.html directly into the root directory
COPY index.html /index.html

# Step 3: Configure Anubis to serve this single file on Render's port
ENV BIND=":10000"
ENV SERVE_ROBOTS_TXT="true"
ENV TARGET="file:///index.html"

# MAP RENDER'S PROXY HEADERS CORRECTLY
ENV CUSTOM_REAL_IP_HEADER="X-Forwarded-For"

# Step 4: Expose Render's standard web port
EXPOSE 10000
