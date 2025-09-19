import { analyze } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const analyzeForm = document.getElementById('analyze-form');
    const resultsDiv = document.getElementById('results');
    const trustScoreSpan = document.getElementById('trust-score');
    const reasonsUl = document.getElementById('reasons');

    analyzeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const url = document.getElementById('url').value;
        const text = document.getElementById('text').value;

        const data = await analyze(url, text);

        trustScoreSpan.textContent = data.trustScore;
        reasonsUl.innerHTML = '';
        data.reasons.forEach(reason => {
            const li = document.createElement('li');
            li.textContent = reason;
            reasonsUl.appendChild(li);
        });

        resultsDiv.style.display = 'block';
    });
});
