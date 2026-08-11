# Use a secure, lightweight Caddy server alpine build
FROM caddy:alpine

# Copy your local HTML file into Caddy's default directory
COPY ./index.html /usr/share/caddy/index.html

# Inject server-side proxy filters to remove X-Frame blocks and stop top navigation redirects
RUN echo ' \n\
:$PORT { \n\
    # Route 1: Serve your main page at the root \n\
    route / { \n\
        file_server { \n\
            root /usr/share/caddy \n\
        } \n\
    } \n\
    \n\
    # Route 2: Acts as a clean server-side proxy to fetch the unblocked game source safely \n\
    route /proxy/* { \n\
        uri strip_prefix /proxy \n\
        reverse_proxy https://numbercraftacademy.com { \n\
            header_up Host {upstream_host} \n\
            header_up X-Real-IP {remote_host} \n\
            \n\
            # Force strip the block headers from the source before delivering to your browser \n\
            header_down -X-Frame-Options \n\
            header_down -Content-Security-Policy \n\
            header_down -Clear-Site-Data \n\
        } \n\
    } \n\
}' > /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
