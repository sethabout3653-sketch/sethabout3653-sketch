# Step 1: Use the official Anubis image
FROM ghcr.io/techarohq/anubis:latest

# Step 2: Copy your index.html directly into the root directory
COPY index.html /index.html

# Step 3: Configure Anubis to serve this single file on Render's port
ENV BIND=":10000"
ENV SERVE_ROBOTS_TXT="true"
ENV TARGET="file:///index.html"

# STEP 4: BYPASS THE RENDER PROXY LOOP CRASH COMPLETELY
# Force Anubis to read client IPs directly from network sockets
ENV USE_REMOTE_ADDRESS="true"
# Provide a fallback header to satisfy the validator check requirement
ENV CUSTOM_REAL_IP_HEADER="Remote-Addr"

# Step 5: Expose Render's standard web port
EXPOSE 10000
