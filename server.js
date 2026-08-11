"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "0.0.0.0";
const PORT = Number(process.env.PORT) || 10000;

const INDEX_FILE = path.join(__dirname, "index.html");

let INDEX_HTML;

try {
    INDEX_HTML = fs.readFileSync(INDEX_FILE);
} catch (error) {
    console.error("Failed to read index.html:", error);
    process.exit(1);
}

function sendHtml(res, statusCode = 200) {
    res.writeHead(statusCode, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": INDEX_HTML.length,
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "Referrer-Policy": "no-referrer",
        "Content-Security-Policy":
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "connect-src 'self'; " +
            "frame-src https:; " +
            "object-src 'none'; " +
            "base-uri 'none'; " +
            "form-action 'none';"
    });

    res.end(INDEX_HTML);
}

const server = http.createServer((req, res) => {
    const method = req.method || "GET";

    if (method !== "GET" && method !== "HEAD") {
        res.writeHead(405, {
            "Content-Type": "text/plain; charset=utf-8",
            "Allow": "GET, HEAD"
        });

        res.end("Method Not Allowed");
        return;
    }

    let pathname = "/";

    try {
        const parsed = new URL(
            req.url || "/",
            `http://${req.headers.host || "localhost"}`
        );

        pathname = parsed.pathname;
    } catch {
        pathname = "/";
    }

    /*
     * Health check.
     */
    if (
        pathname === "/health" ||
        pathname === "/healthz" ||
        pathname === "/_health"
    ) {
        const body = "OK";

        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Length": Buffer.byteLength(body),
            "Cache-Control": "no-store"
        });

        res.end(body);
        return;
    }

    /*
     * Serve the same index.html for EVERYTHING.
     *
     * This prevents "Not Found" when the browser requests
     * a path directly or refreshes the page.
     */
    if (method === "HEAD") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Length": INDEX_HTML.length,
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            "Referrer-Policy": "no-referrer",
            "Content-Security-Policy":
                "default-src 'self'; " +
                "script-src 'self' 'unsafe-inline'; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data:; " +
                "connect-src 'self'; " +
                "frame-src https:; " +
                "object-src 'none'; " +
                "base-uri 'none'; " +
                "form-action 'none';"
        });

        res.end();
        return;
    }

    sendHtml(res, 200);
});

server.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});

server.on("error", (error) => {
    console.error("Server error:", error);
    process.exit(1);
});

process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
    server.close(() => process.exit(0));
});
