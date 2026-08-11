FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000

COPY server.js ./server.js
COPY index.html ./index.html

RUN useradd \
    --system \
    --create-home \
    --shell /usr/sbin/nologin \
    appuser \
    && chown -R appuser:appuser /app

USER appuser

EXPOSE 10000

CMD ["node", "server.js"]
