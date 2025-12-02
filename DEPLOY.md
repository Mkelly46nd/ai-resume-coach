# Deployment Guide - AI Resume Coach

This guide will help you deploy your AI Resume Coach to a public hosting service so others can use it.

## 🚀 Recommended: Deploy to Railway (Easiest)

Railway is the simplest option with a free tier and easy GitHub integration.

### Step 1: Prepare Your Repository

Make sure all your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Deploy to Railway

1. **Go to Railway**: Visit [railway.app](https://railway.app/)
2. **Sign up**: Click "Start a New Project" and sign up with GitHub
3. **Create Project**: Click "New Project"
4. **Deploy from GitHub**: 
   - Select "Deploy from GitHub repo"
   - Choose your `ai-resume-coach` repository
   - Railway will automatically detect it's a Node.js app

5. **Add Environment Variable**:
   - Go to your project settings
   - Click "Variables" tab
   - Add a new variable:
     - **Name**: `ANTHROPIC_API_KEY`
     - **Value**: Your actual API key (starts with `sk-ant-...`)
   - Click "Add"

6. **Deploy**:
   - Railway will automatically start deploying
   - Wait for deployment to complete (usually 2-3 minutes)
   - Once done, Railway will give you a public URL like: `https://your-app-name.up.railway.app`

7. **Set Custom Domain (Optional)**:
   - In project settings, go to "Settings" → "Domains"
   - Add your custom domain if you have one

### Step 3: Test Your Deployment

1. Visit your Railway URL
2. Try analyzing a resume
3. Check that it works!

**That's it!** Your app is now live and anyone can use it.

---

## Alternative: Deploy to Render

### Step 1: Create Account

1. Go to [render.com](https://render.com/)
2. Sign up with GitHub

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `ai-resume-coach`

### Step 3: Configure

- **Name**: `ai-resume-coach` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `master`
- **Root Directory**: Leave blank
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 4: Add Environment Variable

1. Scroll to "Environment Variables"
2. Add:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Get your public URL: `https://ai-resume-coach.onrender.com`

---

## Alternative: Deploy to Heroku

### Prerequisites

Install Heroku CLI: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

### Step 1: Login

```bash
heroku login
```

### Step 2: Create App

```bash
heroku create your-app-name
```

### Step 3: Set Environment Variable

```bash
heroku config:set ANTHROPIC_API_KEY=your-actual-api-key-here
```

### Step 4: Deploy

```bash
git push heroku master
```

### Step 5: Open App

```bash
heroku open
```

---

## 💰 Cost Considerations

### API Usage Costs

Anthropic Claude Sonnet 4 pricing (as of 2024):
- **Input**: ~$3 per 1M tokens
- **Output**: ~$15 per 1M tokens

**Typical resume analysis:**
- Input: ~2,000-3,000 tokens (resume + prompt)
- Output: ~1,500-2,500 tokens (analysis)
- **Cost per analysis**: ~$0.04 - $0.06

**Example monthly costs:**
- 100 analyses/month: ~$4-6
- 1,000 analyses/month: ~$40-60
- 10,000 analyses/month: ~$400-600

### Hosting Costs

- **Railway**: Free tier (500 hours/month), then $5/month
- **Render**: Free tier (750 hours/month), then $7/month
- **Heroku**: $7/month (no free tier anymore)

### Recommendations

1. **Start with Railway free tier** - Test it out
2. **Monitor usage** - Check Anthropic dashboard regularly
3. **Consider rate limiting** - Prevent abuse (we can add this later)
4. **Set budget alerts** - In Anthropic console

---

## 🔒 Security Best Practices

1. ✅ **API key is secure** - Stored as environment variable, never in code
2. ✅ **CORS handled** - Server-side proxy prevents direct API access
3. ⚠️ **Consider rate limiting** - Prevent abuse (can add later)
4. ⚠️ **Monitor usage** - Watch for unusual spikes

---

## 🛠 Post-Deployment

### Add Rate Limiting (Recommended)

To prevent abuse and control costs, consider adding rate limiting:

```bash
npm install express-rate-limit
```

Then add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 10 requests per windowMs
});

app.use('/api/analyze', limiter);
```

### Monitor Your App

- **Railway**: Built-in metrics dashboard
- **Render**: Usage stats in dashboard
- **Anthropic**: Check API usage at console.anthropic.com

### Update Documentation

Update your README with the live URL once deployed!

---

## 🐛 Troubleshooting

**App won't start?**
- Check that `ANTHROPIC_API_KEY` environment variable is set
- Check server logs in hosting dashboard
- Verify Node.js version compatibility

**API errors?**
- Verify API key is correct
- Check Anthropic API status
- Review server logs for specific error messages

**High costs?**
- Add rate limiting
- Monitor usage patterns
- Consider adding usage limits per IP

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variable set with API key
- [ ] App deployed successfully
- [ ] Tested with a sample resume
- [ ] Custom domain configured (optional)
- [ ] Rate limiting added (recommended)
- [ ] Monitoring set up
- [ ] README updated with live URL

---

**Need help?** Check the hosting service's documentation or open an issue on GitHub.

