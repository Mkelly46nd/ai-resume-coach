// AI Resume Coach - Main JavaScript File
// This file handles the Claude API integration for resume analysis

// API Configuration
// Note: API calls now go through backend proxy (server.js) to avoid CORS issues
// The API key is stored securely on the server side
const PROXY_URL = '/api/analyze';

// DOM Elements
const analyzeBtn = document.getElementById('analyze-btn');
const resumeInput = document.getElementById('resume-input');
const jobDescription = document.getElementById('job-description');
const resultsSection = document.getElementById('results-section');
const resultsContent = document.getElementById('results-content');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');

// Event Listener
analyzeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any default button behavior
    analyzeResume(); // Call without passing the event
});

// Main Function: Analyze Resume
// Accepts resume text and optional job description as parameters
// If not provided, reads from DOM elements
async function analyzeResume(resumeTextParam = null, jobDescriptionParam = null) {
    // Get values from parameters or DOM
    // Ensure we're getting strings, not event objects
    let resumeTextValue = '';
    let jobDescText = '';
    
    if (resumeTextParam && typeof resumeTextParam === 'string') {
        resumeTextValue = resumeTextParam.trim();
    } else if (resumeInput) {
        resumeTextValue = resumeInput.value.trim();
    }
    
    if (jobDescriptionParam && typeof jobDescriptionParam === 'string') {
        jobDescText = jobDescriptionParam.trim();
    } else if (jobDescription) {
        jobDescText = jobDescription.value.trim();
    }

    // Validation
    if (!resumeTextValue) {
        showError('Please paste your resume text before analyzing.');
        return;
    }

    // Show loading state (only if DOM elements exist)
    if (analyzeBtn) {
        setLoadingState(true);
    }

    try {
        // Call Claude API
        const analysis = await callClaudeAPI(resumeTextValue, jobDescText);
        
        // Display results (only if DOM elements exist)
        if (resultsContent) {
            displayResults(analysis);
            // Scroll to results
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        return analysis;
        
    } catch (error) {
        console.error('Analysis error:', error);
        const errorMessage = `Analysis failed: ${error.message}. Please check your API key and try again.`;
        if (resultsContent) {
            showError(errorMessage);
        }
        throw error;
    } finally {
        // Reset loading state (only if DOM elements exist)
        if (analyzeBtn) {
            setLoadingState(false);
        }
    }
}

// Call Claude API via backend proxy (solves CORS issue)
async function callClaudeAPI(resumeText, jobDescText) {
    // Construct the prompt
    const prompt = buildPrompt(resumeText, jobDescText);

    // Use backend proxy endpoint instead of direct API call
    // This solves CORS issues by making the request from the server
    const proxyUrl = '/api/analyze';
    
    // Make API request through proxy
    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
    }

    const data = await response.json();
    return data.analysis;
}

// Build the AI Prompt
function buildPrompt(resumeText, jobDescText) {
    let prompt = `You are an expert career coach and resume writer. Analyze the following resume and provide detailed, actionable feedback.

RESUME:
${resumeText}
`;

    if (jobDescText) {
        prompt += `\nTARGET JOB DESCRIPTION:
${jobDescText}
`;
    }

    prompt += `
Please provide your analysis in the following structured format:

1. OVERALL RATING (X/10): Give a numerical score and brief justification.

2. KEY STRENGTHS: List 3-4 things the resume does well.

3. KEY WEAKNESSES: List 3-4 areas that need improvement.

4. DETAILED FEEDBACK:
   - Comment on clarity and readability
   - Evaluate the use of action verbs and quantifiable metrics
   - Assess the overall structure and organization
   - Check for spelling/grammar issues
   ${jobDescText ? '- Analyze alignment with the target job description' : ''}

5. REWRITE SUGGESTIONS: Provide 3-5 specific examples of weak bullet points or sentences, along with improved versions. Format each as:
   BEFORE: [original text]
   AFTER: [improved version]
   WHY: [brief explanation of what was improved]

6. ATS COMPATIBILITY ${jobDescText ? '(comparing to job description)' : ''}: Rate from 1-10 and explain why. Comment on:
   - Keyword usage
   - Formatting simplicity
   - Section organization
   ${jobDescText ? '- Match with job requirements' : ''}

7. NEXT STEPS: Give 3 concrete action items the job seeker should tackle first.

Please be constructive, specific, and actionable in your feedback.`;

    return prompt;
}

// Display Results
function displayResults(analysisText) {
    resultsSection.style.display = 'block';
    
    // Parse the analysis into sections
    const sections = parseAnalysis(analysisText);
    
    // Build HTML
    let html = '';
    
    // Overall Rating
    if (sections.rating) {
        html += `
        <div class="result-card">
            <h4>📊 Overall Rating</h4>
            <div class="score">${sections.rating.score}</div>
            <p>${sections.rating.text}</p>
        </div>`;
    }
    
    // Strengths
    if (sections.strengths) {
        html += `
        <div class="result-card">
            <h4>✅ Key Strengths</h4>
            ${sections.strengths}
        </div>`;
    }
    
    // Weaknesses
    if (sections.weaknesses) {
        html += `
        <div class="result-card">
            <h4>⚠️ Areas for Improvement</h4>
            ${sections.weaknesses}
        </div>`;
    }
    
    // Detailed Feedback
    if (sections.detailed) {
        html += `
        <div class="result-card">
            <h4>🔍 Detailed Analysis</h4>
            ${sections.detailed}
        </div>`;
    }
    
    // Rewrite Suggestions
    if (sections.rewrites) {
        html += `
        <div class="result-card">
            <h4>✍️ Rewrite Suggestions</h4>
            ${sections.rewrites}
        </div>`;
    }
    
    // ATS Compatibility
    if (sections.ats) {
        html += `
        <div class="result-card">
            <h4>🤖 ATS Compatibility</h4>
            ${sections.ats}
        </div>`;
    }
    
    // Next Steps
    if (sections.nextSteps) {
        html += `
        <div class="result-card">
            <h4>🚀 Next Steps</h4>
            ${sections.nextSteps}
        </div>`;
    }
    
    // If parsing failed, just show the raw text
    if (html === '') {
        html = `<div class="result-card"><pre style="white-space: pre-wrap; font-family: inherit;">${analysisText}</pre></div>`;
    }
    
    resultsContent.innerHTML = html;
}

// Parse Analysis Text into Sections
function parseAnalysis(text) {
    const sections = {};
    
    // Extract rating
    const ratingMatch = text.match(/OVERALL RATING.*?(\d+\/10)[:\s]*(.+?)(?=\n\n|\n[A-Z]|$)/s);
    if (ratingMatch) {
        sections.rating = {
            score: ratingMatch[1],
            text: ratingMatch[2].trim()
        };
    }
    
    // Extract strengths
    const strengthsMatch = text.match(/KEY STRENGTHS:(.+?)(?=\n\n[A-Z]|KEY WEAKNESSES|$)/s);
    if (strengthsMatch) {
        sections.strengths = formatList(strengthsMatch[1]);
    }
    
    // Extract weaknesses
    const weaknessesMatch = text.match(/KEY WEAKNESSES:(.+?)(?=\n\n[A-Z]|DETAILED FEEDBACK|$)/s);
    if (weaknessesMatch) {
        sections.weaknesses = formatList(weaknessesMatch[1]);
    }
    
    // Extract detailed feedback
    const detailedMatch = text.match(/DETAILED FEEDBACK:(.+?)(?=\n\n[A-Z]|REWRITE SUGGESTIONS|$)/s);
    if (detailedMatch) {
        sections.detailed = formatList(detailedMatch[1]);
    }
    
    // Extract rewrites
    const rewritesMatch = text.match(/REWRITE SUGGESTIONS:(.+?)(?=\n\n[A-Z]|ATS COMPATIBILITY|$)/s);
    if (rewritesMatch) {
        sections.rewrites = formatRewrites(rewritesMatch[1]);
    }
    
    // Extract ATS
    const atsMatch = text.match(/ATS COMPATIBILITY(.+?)(?=\n\n[A-Z]|NEXT STEPS|$)/s);
    if (atsMatch) {
        sections.ats = formatList(atsMatch[1]);
    }
    
    // Extract next steps
    const nextStepsMatch = text.match(/NEXT STEPS:(.+?)$/s);
    if (nextStepsMatch) {
        sections.nextSteps = formatList(nextStepsMatch[1]);
    }
    
    return sections;
}

// Format bullet lists
function formatList(text) {
    // Convert numbered lists or dashes to HTML list
    const items = text.split('\n').filter(line => line.trim());
    let html = '<ul>';
    
    items.forEach(item => {
        let cleaned = item.trim()
            .replace(/^[\d\-\*\.]+\s*/, '') // Remove list markers
            .replace(/^[:\s]+/, ''); // Remove leading colons/spaces
        
        if (cleaned) {
            html += `<li>${cleaned}</li>`;
        }
    });
    
    html += '</ul>';
    return html;
}

// Format before/after rewrites
function formatRewrites(text) {
    let html = '';
    
    // Try to extract BEFORE/AFTER/WHY patterns
    const examples = text.split(/(?=BEFORE:|Example \d+:)/i);
    
    examples.forEach(example => {
        const beforeMatch = example.match(/BEFORE:(.+?)(?=AFTER:|$)/s);
        const afterMatch = example.match(/AFTER:(.+?)(?=WHY:|$)/s);
        const whyMatch = example.match(/WHY:(.+?)(?=BEFORE:|$)/s);
        
        if (beforeMatch || afterMatch) {
            html += '<div style="margin: 1rem 0; padding: 1rem; background: #f8fafc; border-radius: 8px;">';
            
            if (beforeMatch) {
                html += `<p><strong>❌ Before:</strong> ${beforeMatch[1].trim()}</p>`;
            }
            if (afterMatch) {
                html += `<p><strong>✅ After:</strong> ${afterMatch[1].trim()}</p>`;
            }
            if (whyMatch) {
                html += `<p><strong>💡 Why:</strong> ${whyMatch[1].trim()}</p>`;
            }
            
            html += '</div>';
        }
    });
    
    // If no structured rewrites found, just format as list
    if (!html) {
        html = formatList(text);
    }
    
    return html;
}

// Show Error Message
function showError(message) {
    resultsSection.style.display = 'block';
    resultsContent.innerHTML = `
        <div class="error-message">
            <strong>⚠️ Error:</strong> ${message}
        </div>
    `;
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Set Loading State
function setLoadingState(isLoading) {
    if (isLoading) {
        analyzeBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        resumeInput.disabled = true;
        jobDescription.disabled = true;
    } else {
        analyzeBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        resumeInput.disabled = false;
        jobDescription.disabled = false;
    }
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// AI Resume Coach initialized and ready
console.log('AI Resume Coach initialized and ready!');