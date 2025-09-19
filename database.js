const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                isAdmin BOOLEAN DEFAULT false
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                url TEXT,
                text TEXT,
                userFeedback TEXT,
                timestamp TIMESTAMPTZ DEFAULT NOW(),
                userId INTEGER REFERENCES users(id)
            );
        `);

        const adminUsername = 'admin';
        const adminPassword = 'admin';

        const res = await client.query('SELECT * FROM users WHERE username = $1', [adminUsername]);
        if (res.rows.length === 0) {
            const hash = await bcrypt.hash(adminPassword, saltRounds);
            await client.query('INSERT INTO users (username, password, isAdmin) VALUES ($1, $2, $3)', [adminUsername, hash, true]);
            console.log('Admin user created successfully.');
        }
    } finally {
        client.release();
    }
};

createTables().catch(console.error);

module.exports = pool;