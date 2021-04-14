const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const db = require('./db');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/users', async (req, res) => {
    try {
        let results = await db.getAll();
        res.json(results);
    } catch (err) {

    }
});

app.post('/api/user', async (req, res) => {
    try {
        let results = await db.insertData();
        res.send(results);
    } catch (err) {

    }
});

app.put('/api/update/:id', async (req, res) => {
    try {
        let results = await db.updateData(req.params.id);
        res.json(results);
    } catch (err) {

    }
});

app.delete('/api/delete/:id', async (req, res) => {
    try {
        let results = await db.deleteData(req.params.id);
        res.json(results);
    } catch (err) {

    }
});

app.listen(port, (err) => {
    if (err) { throw err }
    console.log(`running on port ${port}`);
});
