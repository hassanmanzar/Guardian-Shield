import { getUserFeedback } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const usernameSpan = document.getElementById('username');
    const feedbackContainer = document.querySelector('.feedback-container');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
        window.location.href = '/auth';
        return;
    }

    usernameSpan.textContent = username;

    const feedbacks = await getUserFeedback(token);

    feedbacks.forEach(feedback => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('feedback-item');
        feedbackDiv.innerHTML = `
            <p><strong>URL:</strong> ${feedback.url}</p>
            <p><strong>Text:</strong> ${feedback.text}</p>
            <p><strong>User Feedback:</strong> ${feedback.userFeedback}</p>
            <p><strong>Timestamp:</strong> ${feedback.timestamp}</p>
        `;
        feedbackContainer.appendChild(feedbackDiv);
    });
});
