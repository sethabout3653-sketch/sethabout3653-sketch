"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 10000;
const HOST = "0.0.0.0";

const INDEX_FILE = path.join(__dirname, "index.html");

function sendResponse(res, statusCode, contentType, body) {
    res.writeHead(statusCode, {
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "Referrer-Policy": "no-referrer",
        "Cache-Control": "no-store",

        /*
         * Allow HTTPS sites to be embedded by the iframe.
         */
        "Content-Security-Policy":
            "default-src 'self'; " +
            "frame-src https:; " +
            "object-src 'none'; " +
            "base-uri 'none'; " +
            "script-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "connect-src 'self';"
    });

    res.end(body);
}

const server = http.createServer((req, res) => {
    try {
        const method = req.method || "GET";

        /*
         * Render health checks and normal browsers use GET/HEAD.
         */
        if (method !== "GET" && method !== "HEAD") {
            sendResponse(
                res,
                405,
                "text/plain; charset=utf-8",
                "Method Not Allowed"
            );
            return;
        }

        /*
         * Strip the query string.
         */
        const rawUrl = req.url || "/";
        const requestPath = rawUrl.split("?")[0];

        /*
         * Serve index.html for the root.
         */
        if (requestPath === "/" || requestPath === "") {
            if (!fs.existsSync(INDEX_FILE)) {
                sendResponse(
                    res,
                    500,
                    "text/plain; charset=utf-8",
                    "index.html is missing"
                );
                return;
            }

            const html = fs.readFileSync(INDEX_FILE);

            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "SAMEORIGIN",
                "Referrer-Policy": "no-referrer",
                "Cache-Control": "no-store",
                "Content-Security-Policy":
                    "default-src 'self'; " +
                    "frame-src https:; " +
                    "object-src 'none'; " +
                    "base-uri 'none'; " +
                    "script-src 'self'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data:; " +
                    "connect-src 'self';"
            });

            if (method === "HEAD") {
                res.end();
            } else {
                res.end(html);
            }

            return;
        }

        /*
         * Browsers may request /favicon.ico or other files.
         * Return 404 rather than 403 so these requests do not
         * produce a Forbidden page.
         */
        if (requestPath === "/favicon.ico") {
            sendResponse(
                res,
                404,
                "text/plain; charset=utf-8",
                "Not Found"
            );
            return;
        }

        /*
         * Only index.html is intentionally exposed.
         * Any other route gets the application page instead of
         * triggering the old forbidden path logic.
         */
        if (!requestPath.includes(".")) {
            if (!fs.existsSync(INDEX_FILE)) {
                sendResponse(
                    res,
                    500,
                    "text/plain; charset=utf-8",
                    "index.html is missing"
                );
                return;
            }

            const html = fs.readFileSync(INDEX_FILE);

            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "SAMEORIGIN",
                "Referrer-Policy": "no-referrer",
                "Cache-Control": "no-store",
                "Content-Security-Policy":
                    "default-src 'self'; " +
                    "frame-src https:; " +
                    "object-src 'none'; " +
                    "base-uri 'none'; " +
                    "script-src 'self'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data:; " +
                    "connect-src 'self';"
            });

            if (method === "HEAD") {
                res.end();
            } else {
                res.end(html);
            }

            return;
        }

        sendResponse(
            res,
            404,
            "text/plain; charset=utf-8",
            "Not Found"
        );
    } catch (error) {
        console.error("Server error:", error);

        sendResponse(
            res,
            500,
            "text/plain; charset=utf-8",
            "Internal Server Error"
        );
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
    console.log(`Port: ${PORT}`);
    console.log(`Host: ${HOST}`);
});

server.on("error", (error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});

process.on("SIGTERM", () => {
    server.close(() => {
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    server.close(() => {
        process.exit(0);
    });
});
