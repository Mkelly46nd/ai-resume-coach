# Setup Instructions for AI Resume Coach

## The Problem: CORS Error

Anthropic's API doesn't allow direct browser requests due to CORS (Cross-Origin Resource Sharing) security policies. This is why you're seeing "Failed to fetch" errors.

## Solution: Backend Proxy

We've created a simple Node.js/Express server that acts as a proxy between your browser and the Anthropic API. This solves the CORS issue.

## Quick Start

### 1. Install Node.js

If you don't have Node.js installed:
- Download from [nodejs.org](https://nodejs.org/)
- Install the LTS version

### 2. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

This will install Express and CORS packages needed for the server.

### 3. Start the Server

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Open your browser and navigate to the URL above
```

### 4. Open in Browser

Navigate to: **http://localhost:3000**

The app should now work! The server handles the API calls, avoiding CORS issues.

## How It Works

1. Your browser makes a request to `http://localhost:3000/api/analyze`
2. The Express server receives the request
3. The server makes the API call to Anthropic (no CORS issues from server)
4. The server returns the response to your browser

## API Key Security

⚠️ **Important**: The API key is now in `server.js` (server-side), which is more secure than having it in `script.js` (client-side). However:

- **For local development**: This is fine
- **For production**: Consider using environment variables:
  ```javascript
  const API_KEY = process.env.ANTHROPIC_API_KEY;
  ```
  Then set it when running: `ANTHROPIC_API_KEY=your-key npm start`

## Alternative: Deploy to Production

For a production deployment, you can:

1. **Deploy to Heroku/Railway/Render**:
   - Push your code to GitHub
   - Connect to a hosting service
   - Set environment variables for the API key
   - Deploy!

2. **Use Serverless Functions**:
   - Netlify Functions
   - Vercel Functions
   - AWS Lambda

## Troubleshooting

**Port already in use?**
- Change the port in `server.js`: `const PORT = 3001;`
- Or kill the process using port 3000

**Still getting errors?**
- Check that the server is running
- Check browser console for specific error messages
- Verify your API key is correct in `server.js`

