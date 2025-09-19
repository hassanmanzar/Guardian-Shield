import { report } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('report-form');
    const reportConfirmationDiv = document.getElementById('report-confirmation');
    let token = localStorage.getItem('token');

    reportForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!token) {
            alert('You must be logged in to report misinformation.');
            return;
        }

        const url = document.getElementById('report-url').value;
        const text = document.getElementById('report-text').value;
        const userFeedback = document.getElementById('user-feedback').value;

        const data = await report(url, text, userFeedback, token);

        reportConfirmationDiv.querySelector('p').textContent = data.message;
        reportConfirmationDiv.style.display = 'block';
    });
});
