const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/student', (req, res) => {

    const filePath = path.join(__dirname, 'student.json');
    const newStudent = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {

        let students = [];

        // If file exists and has data
        if (!err && data) {
            try {
                students = JSON.parse(data);
            } catch (parseError) {
                students = [];
            }
        }

        students.push(newStudent);

        fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving data");
            }

            res.send("Student saved successfully!");
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});