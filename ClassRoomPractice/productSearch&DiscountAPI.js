const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/product") {
    const { name, price, discount } = parsedUrl.query;

    if (!name || !price || !discount) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("<h2>Missing query parameters</h2>");
      return;
    }

    const finalPrice = Number(price) - (Number(price) * Number(discount)) / 100;

    const log = `Product: ${name}, Price: ${price}, Discount: ${discount}%, Final: ${finalPrice}, Time: ${new Date().toISOString()}\n`;

    fs.appendFile("searches.txt", log, () => {});

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <head>
          <title>Product Search</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 40px; }
            .card { background: white; padding: 20px; border-radius: 8px; width: 400px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1 { text-align: center; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Product Details</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Original Price:</strong> ₹${price}</p>
            <p><strong>Discount:</strong> ${discount}%</p>
            <p><strong>Final Price:</strong> ₹${finalPrice}</p>
          </div>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h2>Route Not Found</h2>");
  }
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
