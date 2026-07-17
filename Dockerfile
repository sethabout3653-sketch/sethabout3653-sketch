# Step 1: Use the official Anubis image
FROM ghcr.io/techarohq/anubis:latest

# Step 2: Copy your index.html directly into the root directory
COPY index.html /index.html

# Step 3: Configure Anubis to serve this single file on Hugging Face's port
ENV BIND=":7860"
ENV SERVE_ROBOTS_TXT="true"
ENV TARGET="file:///index.html"

# Step 4: Tell Anubis to read client IPs directly from the Hugging Face proxy layer
ENV USE_REMOTE_ADDRESS="true"

# Step 5: Expose Hugging Face's mandatory port
EXPOSE 7860
