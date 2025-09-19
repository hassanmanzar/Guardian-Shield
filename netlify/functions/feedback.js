const pool = require('../../database');
const { authenticateToken, authenticateAdmin } = require('../../middleware/auth');

exports.handler = async (event, context) => {
    const path = event.path.replace(/\.netlify\/functions\/feedback/, "");

    if (event.httpMethod === 'GET' && path === '') {
        try {
            const result = await pool.query('SELECT * FROM feedback');
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
    }

    if (event.httpMethod === 'GET' && path === '/user') {
        return authenticateToken(event, async () => {
            try {
                const userId = context.clientContext.user.id;
                const result = await pool.query('SELECT * FROM feedback WHERE userId = $1', [userId]);
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

    if (event.httpMethod === 'POST' && path === '/report') {
        return authenticateToken(event, async () => {
            try {
                const { url, text, userFeedback } = JSON.parse(event.body);
                const userId = context.clientContext.user.id;
                await pool.query('INSERT INTO feedback (url, text, userFeedback, userId) VALUES ($1, $2, $3, $4)', [url, text, userFeedback, userId]);
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Feedback received. Thank you for your contribution.' })
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
                await pool.query('DELETE FROM feedback WHERE id = $1', [id]);
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: `Feedback with id ${id} deleted` })
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