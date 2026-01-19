const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/complain") {
    const { name, issue, priority } = parsedUrl.query;

    if (!name || !issue || !priority) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing query parameters" }));
      return;
    }

    const ticketId = "TKT-" + Math.floor(Math.random() * 1000000);

    const log = `TicketID: ${ticketId}, Name: ${name}, Issue: ${issue}, Priority: ${priority}, Time: ${new Date().toISOString()}\n`;

    const fileName = priority.toLowerCase() === "high" ? "URGENT.txt" : "normal_complaints.txt";

    fs.appendFile(fileName, log, () => {});

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        ticketId: ticketId,
        message: "We will solve your issue soon."
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route Not Found" }));
  }
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
