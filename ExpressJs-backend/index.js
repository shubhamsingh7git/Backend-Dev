const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;

app.use(express.json());

const FILE_PATH = "student.json";



function readData() {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeData(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
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

    if (id == null || !name || !branch) {
        return res.status(400).json({ error: "All fields required (id, name, branch)" });
    }

    const students = readData();

    const exists = students.find(s => s.id === id);
    if (exists) {
        return res.status(400).json({ error: "Student ID already exists" });
    }

    const newStudent = { id, name, branch };
    students.push(newStudent);

    writeData(students);

    res.status(201).json({
        message: "Student added successfully",
        newStudent
    });
});



app.put("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { id: newId, name, branch } = req.body;

    const students = readData();

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

 
    if (newId != null && newId !== id) {
        const idExists = students.find(s => s.id === newId);
        if (idExists) {
            return res.status(400).json({ error: "ID already exists" });
        }
    }

    students[index] = {
        ...students[index],
        id: newId ?? students[index].id,
        name: name ?? students[index].name,
        branch: branch ?? students[index].branch
    };

    writeData(students);

    res.json({
        message: "Student updated successfully",
        updatedStudent: students[index]
    });
});

app.delete("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const students = readData();

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    const deletedStudent = students[index];

   
    students.splice(index, 1);

  
    writeData(students);

    res.json({
        message: "Student deleted successfully",
        deletedStudent
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});