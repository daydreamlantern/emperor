import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",        // Corrected 'username' to 'user'
    password: "",        // Set your MySQL password if any
    database: "crud"     // The name of the database created in phpMyAdmin
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// GET route to retrieve all books
app.get('/', (req, res) => {
    const sql = "SELECT * FROM book";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error retrieving data" });
        }
        return res.json(data);
    });
});

// POST route to create a new book
app.post('/create', (req, res) => {
    const sql = "INSERT INTO book (publisher, name, date) VALUES (?, ?, ?)";
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.date
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json({ Error: "Error inserting data" });
        }
        return res.json(data);
    });
});

// PUT route to update a book by ID
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE book SET publisher = ?, name = ?, date = ? WHERE id = ?";
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.date
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error updating data" });
        }
        return res.json(data);
    });
});

// DELETE route to delete a book by ID
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM book WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error deleting data" });
        }
        return res.json(data);
    });
});

// Start the Express server
app.listen(3030, () => {
    console.log("Server running on port 3030");
});
