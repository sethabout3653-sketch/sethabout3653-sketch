# Step 1: Use the official Anubis image
FROM ghcr.io/techarohq/anubis:latest

# Step 2: Copy your index.html directly into the root directory
COPY index.html /index.html

# Step 3: Configure Anubis to serve this single file on Render's port
ENV BIND=":10000"
ENV SERVE_ROBOTS_TXT="true"
ENV TARGET="file:///index.html"

# FIX THE LOOP: Tell Anubis to trust Render's proxy headers
ENV TRUSTED_PROXIES="0.0.0.0/0"

# Step 4: Expose Render's standard web port
EXPOSE 10000
