FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html

# Block extensions from executing third-party scripts or frames on your site
RUN sed -i '/location \/ {/a \ \ \ \ \ \ \ \ add_header Content-Security-Policy "default-src '\''self'\''; script-src '\''self'\''; style-src '\''self'\'' '\''unsafe-inline'\''; frame-src '\''none'\''; object-src '\''none'\'';";' /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
