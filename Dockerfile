FROM ghcr.io/techarohq/anubis:latest
COPY index.html /index.html
ENV BIND=":8080"
ENV SERVE_ROBOTS_TXT="true"
ENV TARGET="file:///index.html"
ENV USE_REMOTE_ADDRESS="true"
EXPOSE 8080
