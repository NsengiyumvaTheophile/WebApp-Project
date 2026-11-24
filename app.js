
const http = require("http");
const fs = require("fs");
const path = require("path");

function createServer() {
    return http.createServer((req, res) => {
        if (req.url === "/health") {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            return res.end(JSON.stringify({ status: "OK" }));
        }

        let filename;

        if (req.url === "/") {
            filename = "index.html";
        } else if (req.url === "/login") {
            filename = "login.html";
        } else {
            res.writeHead(404);
            return res.end("Page not found");
        }

        fs.readFile(path.join(__dirname, filename), (error, data) => {
            if (error) {
                res.writeHead(500);
                return res.end("Unable to load page");
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    });
}

if (require.main === module) {
    const server = createServer();

    server.listen(3000, "0.0.0.0", () => {
        console.log("CODERWANDA WebApp running on port 3000");
    });
}

module.exports = { createServer };

