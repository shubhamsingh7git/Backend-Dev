const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/complain', (req, res) => {
  const { name, issue, priority } = req.body;

  if (!name || !issue || !priority) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Please provide name, issue, and priority'
    });
  }

  const ticketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const complaint = {
    ticketId,
    name,
    issue,
    priority,
    timestamp: new Date().toISOString()
  };

  const complaintText = `

Ticket ID: ${ticketId}
Name: ${name}
Issue: ${issue}
Priority: ${priority}
Date: ${complaint.timestamp}

`;

  let fileName;
  if (priority.toLowerCase() === 'high') {
    fileName = 'URGENT.txt';
  } else {
    fileName = 'normal_complaints.txt';
  }

  const filePath = path.join(__dirname, fileName);

  fs.appendFile(filePath, complaintText, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({
        error: 'Failed to log complaint',
        message: 'Internal server error'
      });
    }

    console.log(`Complaint logged: ${ticketId} in ${fileName}`);

    res.status(201).json({
      ticketId: ticketId,
      message: 'We will solve your issue soon.'
    });
  });
});

app.get('/complaints/:type', (req, res) => {
  const type = req.params.type;
  const fileName = type === 'urgent' ? 'URGENT.txt' : 'normal_complaints.txt';
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({
          message: 'No complaints found'
        });
      }
      return res.status(500).json({
        error: 'Failed to read complaints'
      });
    }

    res.type('text/plain').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Complaint System running on http://localhost:${PORT}`);
  console.log(`POST /complain - Submit a complaint`);
  console.log(`GET /complaints/urgent - View urgent complaints`);
  console.log(`GET /complaints/normal - View normal complaints`);
});