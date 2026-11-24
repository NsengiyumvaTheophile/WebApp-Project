
const http = require("http");
const fs = require("fs");
const path = require("path");

function createServer() {
    return http.createServer((req, res) => {

        // Extract the pathname without query parameters
        const pathname = new URL(
            req.url,
            "http://localhost"
        ).pathname;

        // Health check
        if (pathname === "/health") {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                status: "OK"
            }));
        }

        let filename;

        // Homepage
        if (pathname === "/") {
            filename = "index.html";
        }

        // Login page
        else if (pathname === "/login") {
            filename = "login.html";
        }

        // Unknown pages
        else {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });

            return res.end("Page not found");
        }

        // Load the requested HTML file
        fs.readFile(
            path.join(__dirname, filename),
            (error, data) => {

                if (error) {
                    res.writeHead(500);
                    return res.end("Unable to load page");
                }

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);
            }
        );
    });
}

if (require.main === module) {
    const server = createServer();

    server.listen(3000, "0.0.0.0", () => {
        console.log(
            "CODERWANDA WebApp running on port 3000"
        );
    });
}

module.exports = { createServer };
