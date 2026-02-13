const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;

app.use(express.json());

const DB_FILE = "student.json";

function readData() {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
    res.send("welcome to home page");
});

app.get("/student", (req, res) => {
    const students = readData();
    res.json(students);
});

app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const students = readData();

    const found = students.find(s => s.id === id);

    if (!found) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(found);
});

app.post("/student", (req, res) => {
    const { id, name, branch } = req.body;

    if (!id || !name || !branch) {
        return res.status(400).json({
            error: "Please provide required details"
        });
    }

    const students = readData();

    const exists = students.find(s => s.id === id);

    if (exists) {
        return res.status(400).json({
            error: "Student ID already exists"
        });
    }

    const newStudent = { id, name, branch };
    students.push(newStudent);

    writeData(students);

    res.status(201).json({
        message: "Student saved in local database",
        newStudent
    });
});

app.put("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const newId = parseInt(req.body.newId);

    const students = readData();

    const studentToUpdate = students.find(s => s.id === id);

    if (!studentToUpdate) {
        return res.status(404).json({ error: "Student not found" });
    }

    const idExists = students.find(s => s.id === newId);

    if (idExists) {
        return res.status(400).json({ error: "ID already exists" });
    }

    studentToUpdate.id = newId;

    writeData(students);

    res.json({
        message: "Student updated in local database",
        updatedStudent: studentToUpdate
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});