// Simple Express server to proxy Anthropic API requests
// This solves the CORS issue by making API calls from the server

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// Your Anthropic API key from environment variable (keep this secure!)
// Set it in a .env file or as an environment variable
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

// Check if API key is set
if (!API_KEY) {
    console.error('ERROR: ANTHROPIC_API_KEY environment variable is not set!');
    console.error('Please create a .env file with: ANTHROPIC_API_KEY=your-key-here');
    process.exit(1);
}

// Proxy endpoint for Claude API
app.post('/api/analyze', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: MODEL,
                max_tokens: 4096,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ 
                error: errorData.error?.message || 'API request failed' 
            });
        }

        const data = await response.json();
        res.json({ analysis: data.content[0].text });

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Open your browser and navigate to the URL above');
});

