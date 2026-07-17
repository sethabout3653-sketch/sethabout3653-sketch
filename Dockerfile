# Step 1: Use the official Anubis image as the base
FROM ghcr.io/techarohq/anubis:latest

# Step 2: Create a local directory inside the container to hold your web files
USER root
RUN mkdir -p /var/www/html

# Step 3: Copy your local index.html into the container's web directory
COPY index.html /var/www/html/index.html

# Step 4: Configure environment variables for Render's free tier
ENV BIND=":10000"
ENV SERVE_ROBOTS_TXT="true"

# Tell Anubis to serve your local folder as the target asset
ENV TARGET="file:///var/www/html"

# Expose Render's standard web port
EXPOSE 10000
