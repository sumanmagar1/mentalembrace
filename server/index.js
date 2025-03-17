require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// PostgreSQL Connection
const pool = new Pool({
    user: "postgres",
    password: "localhostmysql",
    host: "localhost",
    port: 5432,
    database: "mentalbrace"
});

// Middleware
app.use(cors());
app.use(bodyParser.json());




// 🔹 Handle Form Submission
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email, mobile_number, message } = req.body;

        const result = await pool.query(
            'INSERT INTO users (username, email, number, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, mobile_number, message]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error("Form Submission Error:", err);
        res.status(500).json({ success: false, message: 'Error saving data' });
    }
});

// 🔹 Admin Login Route
app.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email' });
        }

        const admin = result.rows[0];

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        console.log('Admin authenticated successfully:', admin.email);

        // Generate JWT Token (Valid for 7 days)
        const token = jwt.sign(
            { adminId: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('Generated JWT:', token);

        res.json({ success: true, token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 🔹 Middleware: Verify Token for Protected Routes
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Received Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(403).json({ success: false, message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.admin = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ success: false, message: "Access Denied: Invalid Token" });
    }
};

// 🔹 Protected Route Example
app.get('/admin-dashboard', verifyToken, (req, res) => {
    res.json({ success: true, message: `Welcome Admin: ${req.admin.email}` });
});
//fetch data fram database;
app.get('/get-users', async (req, res) => {
    try {
        const result = await pool.query('SELECT username, email, number, message FROM users');
        res.json({ success: true, users: result.rows });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});


// Start Server
app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});
