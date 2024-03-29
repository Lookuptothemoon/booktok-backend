const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name: "course1"},
    {id:2, name: "course2"},
    {id:3, name: "course3"},
];

app.get("/", (req, res) => {
    res.send("Hello World!!!")
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID was not found.");
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    if(!req.body.name) res.status(400).send("Name required but not given");
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID was not found.");

    if(!req.body.name) res.status(400).send("Name required but not given");

    course.name = req.body.name;

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID was not found.");

    const idx = courses.indexOf(course);
    courses.splice(idx, 1);

    res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));