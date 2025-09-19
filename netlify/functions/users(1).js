const pool = require('../../database');
const { authenticateAdmin } = require('../../middleware/auth');

exports.handler = async (event, context) => {
    const path = event.path.replace(/\.netlify\/functions\/users/, "");

    if (event.httpMethod === 'GET' && path === '') {
        return authenticateAdmin(event, async () => {
            try {
                const result = await pool.query('SELECT id, username, isAdmin FROM users');
                return {
                    statusCode: 200,
                    body: JSON.stringify(result.rows)
                };
            } catch (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: error.message })
                };
            }
        });
    }

    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
        return authenticateAdmin(event, async () => {
            try {
                const id = path.split('/')[1];
                await pool.query('DELETE FROM users WHERE id = $1', [id]);
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: `User with id ${id} deleted` })
                };
            } catch (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: error.message })
                };
            }
        });
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
    };
};