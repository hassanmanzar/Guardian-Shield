const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database');
const saltRounds = 10;

exports.handler = async (event, context) => {
    const path = event.path.replace(/\.netlify\/functions\/auth/, "");
    const { username, password } = JSON.parse(event.body);

    if (path === '/register') {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hash]);
            return {
                statusCode: 201,
                body: JSON.stringify({ message: 'User created successfully' })
            };
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    if (path === '/login') {
        try {
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const user = result.rows[0];

            if (!user) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'User not found' })
                };
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const accessToken = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isadmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return {
                    statusCode: 200,
                    body: JSON.stringify({ accessToken })
                };
            } else {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ error: 'Invalid password' })
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
    };
};