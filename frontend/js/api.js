const API_BASE_URL = '/.netlify/functions';

const request = async (endpoint, method, body, headers = {}) => {
    const config = {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return response.json();
};

export const analyze = (url, text) => request('/analyze', 'POST', { url, text });
export const register = (username, password) => request('/auth/register', 'POST', { username, password });
export const login = (username, password) => request('/auth/login', 'POST', { username, password });
export const getFeedback = () => request('/feedback', 'GET');
export const getUserFeedback = (token) => request('/feedback/user', 'GET', null, { 'Authorization': `Bearer ${token}` });
export const report = (url, text, userFeedback, token) => request('/feedback/report', 'POST', { url, text, userFeedback }, { 'Authorization': `Bearer ${token}` });
export const getUsers = (token) => request('/users', 'GET', null, { 'Authorization': `Bearer ${token}` });
export const deleteUser = (id, token) => request(`/users/${id}`, 'DELETE', null, { 'Authorization': `Bearer ${token}` });
export const deleteFeedback = (id, token) => request(`/feedback/${id}`, 'DELETE', null, { 'Authorization': `Bearer ${token}` });
