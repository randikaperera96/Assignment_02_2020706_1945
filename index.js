const express = require('express');
const { json } = require('express');

const logger = require('./middleware/logger')

const app = express();
const PORT = 5000;
const apiStudentPath = '/api/sms/student';
const apiSubjectPath = '/api/sms/subject';

app.use(express.json());

let nextStudentID = 4;
let nextSubjectID = 4;
let missingManFieldsMsg = {
    messageType: 'error',
    message: "Missing mandatory fields! Refer API Documentation!"
};
let studentIDNotFoundMsg = {
    messageType: 'error',
    message: "No student found with the given ID!"
};
let subjectIDNotFoundMsg = {
    messageType: 'error',
    message: "No subject found with the given ID!"
};

let studentArray = [
    {
        id: 1,
        name: "stu1"
    },
    {
        id: 2,
        name: "stu2"
    },
    {
        id: 3,
        name: "stu3"
    }
];
let subjectArray = [
    {
        id: 1,
        name: "subject_1"
    },
    {
        id: 2,
        name: "subject_2"
    },
    {
        id: 3,
        name: "subject_3"
    }
];

app.use(logger);

app.get('/', (req, res) => {
    res.send(
        {
            messageType: 'success',
            message: "Welcome to Scool Management REST API"
        }
    );
});

app.get(apiStudentPath, (req, res) => {
    let studentId = req.body.studentId;
    if (!studentId) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let student = studentArray.find(s => s.id == studentId);
    if (!student) {
        return res.status(400).send(studentIDNotFoundMsg);
    }
    res.send(
        {
            messageType: 'Success',
            message: "Student",
            obj: student
        }
    );
});

app.post(apiStudentPath, (req, res) => {
    let newStudentName = req.body.studentName;
    if (!newStudentName) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let newStudent = {
        id: nextStudentID++,
        name: newStudentName
    };
    studentArray.push(newStudent);
    res.send(
        {
            messageType: 'sucess',
            message: "Student added!",
            obj: newStudent
        }
    );
});

app.put(apiStudentPath, (req, res) => {
    let studentId = req.body.studentId;
    let newStudentName = req.body.newStudentName;
    if (!studentId || !newStudentName) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let student = studentArray.find(s => s.id == studentId);
    if (!student) {
        return res.status(404).send(studentIDNotFoundMsg);
    }
    student.name = newStudentName;
    res.send(
        {
            messageType: "success",
            message: "Student updated successfully!",
            obj: student
        }
    );
});

app.delete(apiStudentPath, (req, res) => {
    let studentId = req.body.studentId;
    if (!studentId) {
        return res.status(400).send(missingManFieldsMsg)
    }
    let student = studentArray.find(s => s.id == studentId);
    if (!student) {
        return res.status(404).send(studentIDNotFoundMsg);
    }
    studentArray.splice(studentArray.indexOf(student), 1);
    res.send(
        {
            messageType: "success",
            message: "Student deleted successfully!",
            obj: student
        }
    );
})

app.get(apiSubjectPath, (req, res) => {
    let subjectId = req.body.subjectId;
    if (!subjectId) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let subject = subjectArray.find(s => s.id == subjectId);
    if (!subject) {
        return res.status(404).send(subjectIDNotFoundMsg);
    }
    res.send(
        {
            messageType: "success",
            message: "Subject",
            obj: subject
        }
    );
});

app.post(apiSubjectPath, (req, res) => {
    let newSubjectName = req.body.newSubjectName;
    if (!newSubjectName) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let newSubject = {
        id: nextSubjectID++,
        name: newSubjectName
    }
    subjectArray.push(newSubject);
    res.send(
        {
            messageType: "success",
            message: "New subject added successfully!",
            obj: newSubject
        }
    );
});

app.put(apiSubjectPath, (req, res) => {
    let subjectId = req.body.subjectId;
    let newSubjectName = req.body.newSubjectName;
    if (!subjectId || !newSubjectName) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let subject = subjectArray.find(s => s.id == subjectId);
    if (!subject) {
        return res.status(404).send(subjectIDNotFoundMsg);
    }
    subject.name = newSubjectName;
    res.send(
        {
            messageType: "success",
            message: "Subject name updated successfully!",
            obj: subject
        }
    );
});

app.delete(apiSubjectPath, (req, res) => {
    let subjectId = req.body.subjectId;
    if (!subjectId) {
        return res.status(400).send(missingManFieldsMsg);
    }
    let subject = subjectArray.find(s => s.id == subjectId);
    if (!subject) {
        return res.status(404).send(subjectIDNotFoundMsg);
    }
    subjectArray.splice(subjectArray.indexOf(subject), 1);
    res.send(
        {
            messageType: "success",
            message: "Subject deleted successfully!",
            obj: subject
        }
    );
});

app.get('/*', (req, res) => {
    res.status(404).send({ message: "Invalid Request!" });
});

app.listen(PORT, () => {
    console.log("Listening on Port:" + PORT);
});