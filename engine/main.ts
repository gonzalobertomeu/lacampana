const server = Bun.serve({
  port: 1234,
  routes: {
    "/health": new Response("OK"),
  },
  fetch(req) {
    return new Response("404");
  },
});

console.log(`Server running on port ${server.port}`);

