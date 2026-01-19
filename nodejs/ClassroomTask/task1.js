const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/complain') {
    let body = '';
    
    req.on('data', chunk => body += chunk.toString());
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        if (!data.name || !data.issue || !data.priority) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Missing required fields' }));
        }

        const ticketId = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const fileName = data.priority.toLowerCase() === 'high' ? 'URGENT.txt' : 'normal_complaints.txt';
        
        const complaint = `

Ticket ID: ${ticketId}
Name: ${data.name}
Issue: ${data.issue}
Priority: ${data.priority}
Date: ${new Date().toISOString()}

`;

        fs.appendFile(path.join(__dirname, fileName), complaint, (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Failed to log complaint' }));
          }

          console.log(`Logged ${ticketId} to ${fileName}`);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ticketId: ticketId,
            message: 'We will solve your issue soon.'
          }));
        });

      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
}).listen(3000, () => console.log('Server running on port 3000'));