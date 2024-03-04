const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>First Time</title></head>");
    response.write(
      '<body><form action ="/message" method="POST"><input type="text" name ="message"><button type="submit">Submit</button></form></body>'
    );
    response.write("</html>");
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
  }
  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<head><title>First Time</title></head>");
  response.write(`<body><h1>Hello from Server</h1></body>`);
  response.write("</html>");
  response.end();
});

server.listen(3000);
