import { getFeedback } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const feedbackContainer = document.querySelector('.feedback-container');

    const feedbacks = await getFeedback();

    feedbacks.forEach(feedback => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('feedback-item');
        feedbackDiv.innerHTML = `
            <p><strong>URL:</strong> ${feedback.url}</p>
            <p><strong>Text:</strong> ${feedback.text}</p>
            <p><strong>User Feedback:</strong> ${feedback.userFeedback}</p>
            <p><strong>Timestamp:</strong> ${feedback.timestamp}</p>
            <p><strong>User ID:</strong> ${feedback.userId}</p>
        `;
        feedbackContainer.appendChild(feedbackDiv);
    });
});
