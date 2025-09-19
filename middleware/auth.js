require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('../database');

const authenticateToken = async (event, handler) => {
    const authHeader = event.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return { statusCode: 401 };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const context = { clientContext: { user: decoded } };
        return await handler(event, context);
    } catch (err) {
        return { statusCode: 403 };
    }
};

const authenticateAdmin = async (event, handler) => {
    return authenticateToken(event, async (event, context) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1 AND isAdmin = true', [context.clientContext.user.id]);
            if (result.rows.length === 0) {
                return { statusCode: 403 };
            }
            return await handler(event, context);
        } catch (error) {
            return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
        }
    });
};

module.exports = { authenticateToken, authenticateAdmin };