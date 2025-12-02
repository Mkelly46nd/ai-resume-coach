# Quick Start Guide

## For Users Who Want to Use This App

### Option 1: Run Locally (Recommended)

1. **Install Node.js** (if you don't have it)
   - Download from [nodejs.org](https://nodejs.org/)
   - Install the LTS version

2. **Clone and Setup**:
   ```bash
   git clone https://github.com/Mkelly46nd/ai-resume-coach.git
   cd ai-resume-coach
   npm install
   ```

3. **Get Your API Key**:
   - Go to [Anthropic Console](https://console.anthropic.com/)
   - Sign up/login and create an API key
   - Copy your key

4. **Create `.env` File**:
   - Create a file named `.env` in the project folder
   - Add this line (replace with your actual key):
     ```
     ANTHROPIC_API_KEY=your-api-key-here
     ```

5. **Run the App**:
   ```bash
   npm start
   ```
   Then open http://localhost:3000 in your browser

### Option 2: Deploy Online (For Public Use)

If you want others to use your app without setting it up themselves, you can deploy it to a hosting service:

#### Deploy to Railway (Easiest)

1. Go to [railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your `ai-resume-coach` repository
5. Add environment variable: `ANTHROPIC_API_KEY` = your API key
6. Deploy! Railway will give you a public URL

#### Deploy to Render

1. Go to [render.com](https://render.com/)
2. Sign up and create a new "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variable: `ANTHROPIC_API_KEY`
7. Deploy!

#### Deploy to Heroku

1. Install Heroku CLI
2. Run:
   ```bash
   heroku create your-app-name
   heroku config:set ANTHROPIC_API_KEY=your-key-here
   git push heroku master
   ```

### Important Notes

- **Each user needs their own API key** - Anthropic API keys are personal and shouldn't be shared
- **For public deployment** - You'll be paying for all API usage, so consider rate limiting
- **Free tier limits** - Anthropic has usage limits on free tier accounts

### Troubleshooting

**"Failed to fetch" error?**
- Make sure the server is running (`npm start`)
- Check that your `.env` file exists and has the correct API key
- Verify the server is running on port 3000

**Port already in use?**
- Change the port in `server.js`: `const PORT = 3001;`
- Or stop the process using port 3000

**API key not working?**
- Verify your key at [console.anthropic.com](https://console.anthropic.com/)
- Check that you've added it to the `.env` file correctly
- Make sure there are no extra spaces in the `.env` file

