const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
// Custom middleware to add headers
server.use((req, res, next) => {
  if (req.method === "GET" && req.path === "/products") {
    const data = router.db.get("products").value();
    res.header("X-Total-Count", data.length); // Set the custom header
  }
  next();
});
server.use(router);

server.listen(port, () => {
  console.log("server started ");
});
