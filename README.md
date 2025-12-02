# AI Resume Coach

> Get instant, expert-level resume feedback powered by Claude Sonnet 4. Improve your ATS compatibility, strengthen your content, and stand out to recruiters—completely free.

[![Live Demo](https://img.shields.io/badge/Live-Demo-10b981?style=for-the-badge)](https://Mkelly46nd.github.io/ai-resume-coach)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-2563eb?style=for-the-badge)](https://github.com/Mkelly46nd/ai-resume-coach)

## 📋 Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [Target Users](#target-users)
- [Features](#features)
- [How AI Works in This Project](#how-ai-works-in-this-project)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Prompt Engineering](#prompt-engineering)
- [Known Limitations](#known-limitations)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

AI Resume Coach is a web application that provides instant, comprehensive resume analysis using Anthropic's Claude Sonnet 4 API. The tool analyzes resumes for clarity, structure, ATS compatibility, and provides actionable feedback with specific before/after rewrite suggestions.

Unlike expensive professional resume coaching services, AI Resume Coach offers expert-level feedback instantly and for free, making professional resume improvement accessible to everyone.

## 🔴 The Problem

Job seekers face significant challenges when crafting effective resumes:

- **6-8 Seconds**: That's all the time a recruiter spends reviewing your resume on average. Every word counts, and suboptimal content can lead to immediate rejection.

- **$100-500 Cost**: Professional resume coaching services charge hundreds of dollars for feedback, making it inaccessible for many job seekers, especially students and recent graduates.

- **75% Rejection Rate**: Most resumes are rejected by Applicant Tracking Systems (ATS) before a human recruiter even sees them. Poor keyword usage, formatting issues, and structural problems cause qualified candidates to be filtered out.

- **Lack of Actionable Feedback**: Generic resume tips don't provide specific, personalized feedback. Job seekers need concrete examples of what to change and why.

AI Resume Coach solves these problems by providing instant, detailed, and actionable resume analysis powered by advanced AI—completely free.

## 👥 Target Users

AI Resume Coach is designed for:

- **Students & Recent Graduates**: Those entering the job market for the first time who need guidance on resume best practices
- **Job Seekers**: Active job seekers looking to improve their resume quality and ATS compatibility
- **Career Changers**: Professionals transitioning to new industries who need to reframe their experience
- **Returning Professionals**: Individuals re-entering the workforce after a gap who need to update their resume format
- **Anyone Seeking Feedback**: Anyone who wants professional-level resume feedback without the cost

## ✨ Features

- ✅ **Instant AI-Powered Analysis**: Get comprehensive resume feedback in seconds using Claude Sonnet 4
- ✅ **ATS Compatibility Scoring**: Receive a 1-10 ATS compatibility score with detailed explanations
- ✅ **Structured Feedback**: Organized analysis covering strengths, weaknesses, and detailed recommendations
- ✅ **Before/After Rewrite Suggestions**: See specific examples of weak content transformed into strong, impactful statements
- ✅ **Job Description Matching**: Optionally include a job description for targeted, role-specific feedback
- ✅ **Overall Rating**: Get a numerical score (X/10) with justification for your resume's effectiveness
- ✅ **Actionable Next Steps**: Receive concrete action items to improve your resume
- ✅ **Clean, Modern UI**: Professional, responsive design that works on all devices
- ✅ **Free & Accessible**: No cost, no sign-up required—just paste and analyze
- ✅ **Privacy-Focused**: All analysis happens client-side with secure API calls

## 🤖 How AI Works in This Project

### AI Model: Claude Sonnet 4

AI Resume Coach uses **Claude Sonnet 4** (`claude-sonnet-4-20250514`) via the Anthropic API. Claude Sonnet 4 is one of the most advanced language models available, capable of understanding context, evaluating content quality, and providing nuanced feedback.

### Analysis Process

1. **Text Analysis**: Claude analyzes the resume text for:
   - **Clarity & Readability**: Evaluates how easy the resume is to read and understand
   - **Quantifiable Metrics**: Identifies where numbers, percentages, and concrete achievements are used (or missing)
   - **Action Verbs**: Assesses the strength and impact of action verbs used
   - **Structure & Organization**: Evaluates the logical flow and organization of information
   - **Spelling & Grammar**: Checks for language errors that could hurt credibility

2. **ATS Compatibility Assessment**: When analyzing ATS compatibility, Claude evaluates:
   - **Keyword Usage**: Checks if relevant keywords are present and naturally integrated
   - **Formatting Simplicity**: Assesses whether the format is ATS-friendly (simple, clean, no complex tables/graphics)
   - **Section Organization**: Verifies standard sections are present and properly structured
   - **Job Description Alignment**: When provided, compares resume content against job requirements

3. **Structured Feedback Generation**: Claude provides feedback in a structured format:
   - Overall rating with justification
   - Key strengths (3-4 items)
   - Key weaknesses (3-4 items)
   - Detailed feedback on multiple dimensions
   - Specific rewrite suggestions with BEFORE/AFTER/WHY format
   - ATS compatibility score and explanation
   - Concrete next steps

### User Flow Diagram

```
┌─────────────────┐
│  User Pastes    │
│  Resume Text    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  (Optional)     │
│  Add Job        │
│  Description     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Click "Analyze │
│  Resume" Button │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Loading State  │
│  (Button Disabled)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  JavaScript     │
│  Builds Prompt  │
│  with Resume    │
│  + Job Desc     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  POST Request   │
│  to Anthropic   │
│  API Endpoint   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Claude Sonnet 4│
│  Analyzes Text  │
│  & Generates    │
│  Feedback       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Response       │
│  Parsed into    │
│  Sections       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Results        │
│  Displayed in   │
│  Formatted Cards│
└─────────────────┘
```

### Why Claude Sonnet 4?

- **Deep Understanding**: Claude understands context and nuance, not just keyword matching
- **Structured Output**: Consistently provides well-formatted, parseable responses
- **Actionable Feedback**: Goes beyond generic advice to provide specific, actionable recommendations
- **Professional Quality**: Feedback quality rivals that of professional career coaches

## 🛠 Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with CSS Grid and Flexbox for responsive layouts)
  - Vanilla JavaScript (ES6+)

- **AI/API**:
  - Anthropic Claude Sonnet 4 API (`claude-sonnet-4-20250514`)
  - RESTful API integration via Fetch API

- **Design**:
  - Custom CSS with modern design principles
  - Responsive design (mobile-first approach)
  - Smooth animations and transitions

- **Development**:
  - No build tools required (pure HTML/CSS/JS)
  - Client-side only (no backend needed)

## 🚀 Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Claude API key from [Anthropic](https://console.anthropic.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mkelly46nd/ai-resume-coach.git
   cd ai-resume-coach
   ```

2. **Get your Claude API Key**:
   - Sign up for an account at [Anthropic Console](https://console.anthropic.com/)
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key (starts with `sk-ant-...`)

3. **Add your API key to `script.js`**:
   - Open `script.js` in your code editor
   - Find the line: `const API_KEY = 'YOUR_CLAUDE_API_KEY_HERE';`
   - Replace `'YOUR_CLAUDE_API_KEY_HERE'` with your actual API key:
     ```javascript
     const API_KEY = 'sk-ant-api03-your-actual-key-here';
     ```

4. **Open the application**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Then visit http://localhost:8000
     ```

### Security Note

⚠️ **Important**: Never commit your API key to version control. If you're using Git, make sure `script.js` is in your `.gitignore` or use environment variables for production deployments.

## 📝 Prompt Engineering

The prompt used in AI Resume Coach has been iteratively refined to produce consistent, high-quality feedback. Here are three iterations showing the evolution:

### Iteration 1: Basic Prompt

```
Analyze this resume and provide feedback on strengths and weaknesses.
```

**Issues**: Too vague, no structure, inconsistent output format, no specific guidance.

### Iteration 2: Structured Prompt

```
You are a resume expert. Analyze the following resume:

RESUME:
[resume text]

Provide feedback on:
- Strengths
- Weaknesses
- Suggestions for improvement
```

**Issues**: Better structure, but still lacks specificity, no format requirements, no ATS focus, no before/after examples.

### Iteration 3: Current Production Prompt (Refined)

```
You are an expert career coach and resume writer. Analyze the following resume and provide detailed, actionable feedback.

RESUME:
${resumeText}

TARGET JOB DESCRIPTION:
${jobDescText}

Please provide your analysis in the following structured format:

1. OVERALL RATING (X/10): Give a numerical score and brief justification.

2. KEY STRENGTHS: List 3-4 things the resume does well.

3. KEY WEAKNESSES: List 3-4 areas that need improvement.

4. DETAILED FEEDBACK:
   - Comment on clarity and readability
   - Evaluate the use of action verbs and quantifiable metrics
   - Assess the overall structure and organization
   - Check for spelling/grammar issues
   - Analyze alignment with the target job description

5. REWRITE SUGGESTIONS: Provide 3-5 specific examples of weak bullet points or sentences, along with improved versions. Format each as:
   BEFORE: [original text]
   AFTER: [improved version]
   WHY: [brief explanation of what was improved]

6. ATS COMPATIBILITY: Rate from 1-10 and explain why. Comment on:
   - Keyword usage
   - Formatting simplicity
   - Section organization
   - Match with job requirements

7. NEXT STEPS: Give 3 concrete action items the job seeker should tackle first.

Please be constructive, specific, and actionable in your feedback.
```

**Improvements**:
- ✅ Clear role definition ("expert career coach")
- ✅ Structured output format for easy parsing
- ✅ Specific sections with clear requirements
- ✅ BEFORE/AFTER/WHY format for rewrite suggestions
- ✅ ATS-specific evaluation criteria
- ✅ Actionable next steps
- ✅ Conditional job description analysis
- ✅ Consistent, parseable format

### Prompt Engineering Best Practices Used

1. **Role Definition**: Establishes Claude as an expert, improving response quality
2. **Structured Output**: Uses numbered sections and specific formats for consistency
3. **Specific Instructions**: Clear requirements for each section (e.g., "3-4 things", "1-10 rating")
4. **Format Specifications**: Explicit formatting requirements (BEFORE/AFTER/WHY) ensure parseable output
5. **Conditional Logic**: Adapts prompt based on whether job description is provided
6. **Tone Guidance**: "Constructive, specific, and actionable" sets the right feedback style

## ⚠️ Known Limitations

1. **Text-Only Analysis**: The tool analyzes text only. It cannot evaluate:
   - Visual design and layout
   - Color choices
   - Font selection
   - Graphics or images
   - PDF formatting issues

2. **No File Upload**: Currently requires manual copy-paste of resume text. PDF parsing is not supported.

3. **API Rate Limits**: Subject to Anthropic API rate limits. High-volume usage may require API tier upgrades.

4. **Token Limits**: Very long resumes (exceeding ~4000 tokens) may be truncated or require splitting.

5. **Language Support**: Optimized for English resumes. Performance may vary for other languages.

6. **Industry-Specific Nuances**: While Claude is knowledgeable, it may not capture all industry-specific resume conventions.

7. **No Resume Storage**: Resumes are not saved. Each analysis is independent.

8. **Client-Side API Key**: In the current implementation, the API key is visible in client-side code. For production, consider using a backend proxy.

9. **Parsing Assumptions**: The result parser relies on consistent formatting from Claude. Unusual responses may not parse correctly.

10. **No Historical Tracking**: Cannot compare resume versions over time or track improvements.

## 🗺 Future Roadmap

### Short-Term (Next 1-2 Months)

- [ ] **PDF Upload Support**: Allow users to upload PDF resumes with text extraction
- [ ] **Resume Templates**: Provide ATS-friendly resume templates
- [ ] **Export Functionality**: Allow users to download analysis as PDF or markdown
- [ ] **Improved Error Handling**: Better error messages and retry mechanisms
- [ ] **Loading Progress**: Show progress indicators for long analyses

### Medium-Term (3-6 Months)

- [ ] **Resume Versioning**: Save and compare multiple versions of resumes
- [ ] **Industry-Specific Analysis**: Specialized feedback for different industries
- [ ] **Resume Builder Integration**: Build resumes directly in the tool
- [ ] **Cover Letter Analysis**: Extend analysis to cover letters
- [ ] **LinkedIn Profile Analysis**: Analyze LinkedIn profiles for consistency
- [ ] **Multi-Language Support**: Optimize for resumes in multiple languages

### Long-Term (6+ Months)

- [ ] **Backend Integration**: Secure API key handling with user authentication
- [ ] **User Accounts**: Save analysis history and track improvements
- [ ] **Collaboration Features**: Share resumes with mentors or career coaches
- [ ] **AI Resume Builder**: Generate resume content from scratch using AI
- [ ] **ATS Simulation**: Test how specific ATS systems parse your resume
- [ ] **Interview Prep**: Extend to interview question generation based on resume
- [ ] **Career Path Suggestions**: Recommend career paths based on resume analysis

### Technical Improvements

- [ ] **Backend API**: Move API calls to secure backend
- [ ] **Caching**: Cache common analyses to reduce API calls
- [ ] **Analytics**: Track usage patterns and improve prompts
- [ ] **A/B Testing**: Test different prompt variations for better results
- [ ] **Unit Tests**: Add comprehensive test coverage
- [ ] **CI/CD Pipeline**: Automated testing and deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [https://Mkelly46nd.github.io/ai-resume-coach](https://Mkelly46nd.github.io/ai-resume-coach)
- **GitHub Repository**: [https://github.com/Mkelly46nd/ai-resume-coach](https://github.com/Mkelly46nd/ai-resume-coach)
- **Anthropic API Documentation**: [https://docs.anthropic.com](https://docs.anthropic.com)
- **Claude Sonnet 4 Model Info**: [https://www.anthropic.com/claude](https://www.anthropic.com/claude)

## 🙏 Acknowledgments

- Built with [Claude Sonnet 4](https://www.anthropic.com/claude) by Anthropic
- Inspired by the need to make professional resume feedback accessible to everyone

---

**Made with ❤️ to help job seekers land their dream jobs.**

