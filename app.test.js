
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("./app");

let server;
let baseUrl;

before(async () => {
    server = createServer();

    await new Promise(resolve => {
        server.listen(0, "127.0.0.1", resolve);
    });

    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise(resolve => server.close(resolve));
});

test("Homepage returns 200", async () => {
    const response = await fetch(baseUrl);
    assert.equal(response.status, 200);
});

test("Login page returns 200", async () => {
    const response = await fetch(`${baseUrl}/login`);
    assert.equal(response.status, 200);
});

test("Health endpoint returns OK", async () => {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "OK");
});
