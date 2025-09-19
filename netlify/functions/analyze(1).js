const { reliableSources, unreliableSources, sensationalistWords } = require('../../config/lists');

function analyzeSource(url) {
    try {
        const domain = new URL(url).hostname.replace(/^www\./, '');
        if (reliableSources.includes(domain)) {
            return { score: 20, reason: 'Source is known to be reliable.' };
        }
        if (unreliableSources.includes(domain)) {
            return { score: -30, reason: 'Source has a history of publishing misinformation.' };
        }
        return { score: 0, reason: 'Source is not in our database.' };
    } catch (error) {
        return { score: -10, reason: 'Invalid URL provided.' };
    }
}

function analyzeContent(text) {
    let score = 0;
    let reason = 'Content analysis:';
    let foundWords = [];

    if (!text || typeof text !== 'string') {
        return { score: -5, reason: 'No text provided for analysis.' };
    }

    const words = text.toLowerCase().split(/\s+/);
    sensationalistWords.forEach(word => {
        if (words.includes(word)) {
            foundWords.push(word);
        }
    });

    const percentage = (foundWords.length / words.length) * 100;

    if (percentage < 1) {
        score += 10;
        reason += ' No major red flags found in content.';
    } else if (percentage >= 1 && percentage < 5) {
        score -= 5;
        reason += ` Found a low number of sensationalist words: ${foundWords.join(', ')}.`;
    } else if (percentage >= 5 && percentage < 10) {
        score -= 10;
        reason += ` Found a moderate number of sensationalist words: ${foundWords.join(', ')}.`;
    } else {
        score -= 20;
        reason += ` Found a high number of sensationalist words: ${foundWords.join(', ')}.`;
    }

    return { score, reason };
}

exports.handler = async (event, context) => {
    const { url, text } = JSON.parse(event.body);

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required.' })
        };
    }

    const sourceAnalysis = analyzeSource(url);
    const contentAnalysis = analyzeContent(text);

    let trustScore = 50; // Starting score
    trustScore += sourceAnalysis.score;
    trustScore += contentAnalysis.score;

    // Clamp the score between 0 and 100
    trustScore = Math.max(0, Math.min(100, trustScore));

    return {
        statusCode: 200,
        body: JSON.stringify({
            trustScore,
            reasons: [sourceAnalysis.reason, contentAnalysis.reason]
        })
    };
};