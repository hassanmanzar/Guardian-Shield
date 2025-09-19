import { getUsers, getFeedback, deleteUser, deleteFeedback } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userList = document.querySelector('.user-list');
    const feedbackList = document.querySelector('.feedback-list');
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/auth';
        return;
    }

    // Fetch users
    const users = await getUsers(token);

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-item');
        userDiv.innerHTML = `
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Admin:</strong> ${user.isAdmin ? 'Yes' : 'No'}</p>
            <button class="delete-btn" data-id="${user.id}" data-type="user">Delete</button>
        `;
        userList.appendChild(userDiv);
    });

    // Fetch feedback
    const feedbacks = await getFeedback(token);

    feedbacks.forEach(feedback => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('feedback-item');
        feedbackDiv.innerHTML = `
            <p><strong>ID:</strong> ${feedback.id}</p>
            <p><strong>URL:</strong> ${feedback.url}</p>
            <p><strong>Text:</strong> ${feedback.text}</p>
            <p><strong>User Feedback:</strong> ${feedback.userFeedback}</p>
            <p><strong>Timestamp:</strong> ${feedback.timestamp}</p>
            <p><strong>User ID:</strong> ${feedback.userId}</p>
            <button class="delete-btn" data-id="${feedback.id}" data-type="feedback">Delete</button>
        `;
        feedbackList.appendChild(feedbackDiv);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const type = e.target.dataset.type;

            if (type === 'user') {
                await deleteUser(id, token);
            } else if (type === 'feedback') {
                await deleteFeedback(id, token);
            }

            location.reload();
        });
    });
});
