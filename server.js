"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "0.0.0.0";
const PORT = Number(process.env.PORT) || 10000;

const INDEX_FILE = path.join(__dirname, "index.html");

let indexHtml = null;

/*
 * Load index.html once at startup.
 */
try {
    indexHtml = fs.readFileSync(INDEX_FILE);
} catch (error) {
    console.error("Could not load index.html:");
    console.error(error);
    process.exit(1);
}

function sendIndex(res, method) {
    const headers = {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": indexHtml.length,

        "X-Content-Type-Options": "nosniff",

        "Referrer-Policy": "no-referrer",

        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",

        /*
         * Only your own page may frame this document.
         */
        "X-Frame-Options": "SAMEORIGIN",

        /*
         * Prevent this document from loading arbitrary resources
         * that are not explicitly allowed.
         *
         * frame-src is restricted to HTTPS because the iframe is
         * expected to load an HTTPS website.
         */
        "Content-Security-Policy":
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "connect-src 'self'; " +
            "frame-src https:; " +
            "object-src 'none'; " +
            "base-uri 'none'; " +
            "form-action 'none'; " +
            "worker-src 'none'; " +
            "manifest-src 'none'; " +
            "font-src 'self' data:;"
    };

    res.writeHead(200, headers);

    if (method !== "HEAD") {
        res.end(indexHtml);
    } else {
        res.end();
    }
}

const server = http.createServer((req, res) => {
    try {
        const method = String(req.method || "GET").toUpperCase();

        /*
         * Only GET and HEAD are needed.
         */
        if (method !== "GET" && method !== "HEAD") {
            res.writeHead(405, {
                "Content-Type": "text/plain; charset=utf-8",
                "Allow": "GET, HEAD",
                "X-Content-Type-Options": "nosniff"
            });

            res.end("Method Not Allowed");
            return;
        }

        /*
         * Remove query parameters.
         */
        const url = new URL(
            req.url || "/",
            `http://${req.headers.host || "localhost"}`
        );

        const pathname = url.pathname;

        /*
         * Root page.
         */
        if (pathname === "/" || pathname === "/index.html") {
            sendIndex(res, method);
            return;
        }

        /*
         * Common Render/browser health request.
         */
        if (
            pathname === "/health" ||
            pathname === "/healthz" ||
            pathname === "/_health"
        ) {
            const body = Buffer.from("OK", "utf8");

            res.writeHead(200, {
                "Content-Type": "text/plain; charset=utf-8",
                "Content-Length": body.length,
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff"
            });

            if (method === "HEAD") {
                res.end();
            } else {
                res.end(body);
            }

            return;
        }

        /*
         * Do NOT expose arbitrary files from the container.
         */
        res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff"
        });

        res.end("Not Found");
    } catch (error) {
        console.error("Request error:");
        console.error(error);

        if (!res.headersSent) {
            res.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff"
            });
        }

        res.end("Internal Server Error");
    }
});

server.on("error", (error) => {
    console.error("Server failed:");
    console.error(error);

    process.exit(1);
});

server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Listening on ${HOST}:${PORT}`);
});

function shutdown(signal) {
    console.log(`${signal} received. Shutting down...`);

    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });

    setTimeout(() => {
        process.exit(1);
    }, 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
