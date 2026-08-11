"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 10000;
const HOST = "0.0.0.0";

const publicDirectory = path.join(__dirname, "public");
const indexFile = path.join(publicDirectory, "index.html");

const server = http.createServer((req, res) => {
    try {
        if (req.method !== "GET" && req.method !== "HEAD") {
            res.writeHead(405, {
                "Content-Type": "text/plain; charset=utf-8",
                "Allow": "GET, HEAD"
            });

            res.end("Method Not Allowed");
            return;
        }

        let requestedPath = req.url || "/";

        requestedPath = requestedPath.split("?")[0];

        if (requestedPath === "/" || requestedPath === "") {
            requestedPath = "/index.html";
        }

        const decodedPath = decodeURIComponent(requestedPath);

        const normalizedPath = path.normalize(decodedPath);

        if (
            normalizedPath.includes("..") ||
            normalizedPath.startsWith("\\") ||
            path.isAbsolute(normalizedPath)
        ) {
            res.writeHead(403);
            res.end("Forbidden");
            return;
        }

        const filePath = path.join(publicDirectory, normalizedPath);

        if (!filePath.startsWith(publicDirectory)) {
            res.writeHead(403);
            res.end("Forbidden");
            return;
        }

        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.writeHead(404);
            res.end("Not Found");
            return;
        }

        const extension = path.extname(filePath).toLowerCase();

        let contentType = "application/octet-stream";

        if (extension === ".html") {
            contentType = "text/html; charset=utf-8";
        } else if (extension === ".css") {
            contentType = "text/css; charset=utf-8";
        } else if (extension === ".js") {
            contentType = "application/javascript; charset=utf-8";
        } else if (extension === ".json") {
            contentType = "application/json; charset=utf-8";
        } else if (extension === ".png") {
            contentType = "image/png";
        } else if (extension === ".jpg" || extension === ".jpeg") {
            contentType = "image/jpeg";
        } else if (extension === ".gif") {
            contentType = "image/gif";
        } else if (extension === ".svg") {
            contentType = "image/svg+xml";
        } else if (extension === ".ico") {
            contentType = "image/x-icon";
        } else if (extension === ".webp") {
            contentType = "image/webp";
        }

        res.writeHead(200, {
            "Content-Type": contentType,
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            "Referrer-Policy": "no-referrer",
            "Cache-Control": extension === ".html"
                ? "no-store"
                : "public, max-age=3600"
        });

        if (req.method === "HEAD") {
            res.end();
            return;
        }

        const data = fs.readFileSync(filePath);

        res.end(data);

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Internal Server Error");
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
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
