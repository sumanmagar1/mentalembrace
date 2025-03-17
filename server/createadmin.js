require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
    user:"postgres",
    password:"localhostmysql",
    host:"localhost",
    port:5432,
    database:"mentalbrace"
});

async function createAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;

    if (!email || !plainPassword) {
        console.error("Admin email or password is missing in .env file!");
        return;
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    try {
        await pool.query('INSERT INTO admins (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', 
                         [email, hashedPassword]);
        console.log('Admin created successfully.');
    } catch (error) {
        console.error('Error inserting admin:', error);
    } finally {
        pool.end();
    }
}

createAdmin();
