// ideaValidator.js
const axios = require('axios');
 
/**
* Checks newIdeas (array) against allRegisteredIdeas (array) for semantic similarity.
* Returns an array of booleans - true if similar found, false if unique.
*/
async function isIdeaSimilarUsingGemini(currentIdea, allRegisteredIdeas) {
  // First, do a quick keyword check for obvious similarities
  const currentLower = currentIdea.toLowerCase().trim();
  for (const existingIdea of allRegisteredIdeas) {
    const existingLower = existingIdea.toLowerCase().trim();
    // Check for exact matches or one containing the other
    if (currentLower === existingLower || 
        currentLower.includes(existingLower) || 
        existingLower.includes(currentLower)) {
      console.log(`Quick match found: "${currentIdea}" vs "${existingIdea}"`);
      return true;
    }
  }
 
  const prompt = `
You are an EXPERT project idea similarity detector. Analyze these ideas with EXTREME precision.
 
CURRENT IDEA: "${currentIdea}"
 
EXISTING IDEAS:
${allRegisteredIdeas.map((idea, idx) => `${idx + 1}. ${idea}`).join('\n')}
 
DEEP ANALYSIS REQUIRED:
 
1. SEMANTIC MEANING:
   - What is the core business concept?
   - What specific problem does it solve?
   - Who is the target user/market?
 
2. FUNCTIONAL SIMILARITY:
   - Do they perform similar operations?
   - Do they serve the same business purpose?
   - Would they compete in the same space?
 
3. CONCEPTUAL OVERLAP:
   - Are they in the same industry/domain?
   - Do they use similar approaches/methods?
   - Do they reference the same existing services?
 
4. IDENTITY/NAMING:
   - Any person names, brand names, or specific entities mentioned?
   - References to existing apps/services (like "MakeMyTrip", "Uber", etc.)?
   - Similar product categories or descriptions?
 
MARK AS SIMILAR IF:
- Same person/entity names appear in both
- Both reference the same existing service/app
- Core business function is identical (>80% overlap)
- They solve the exact same problem for same users
- Same industry + same primary feature
- One is clearly inspired by/copying the other
 
BE EXTREMELY THOROUGH:
- Consider context and implied meaning
- Look for paraphrased versions of same concept
- Check for different wordings of identical ideas
- Identify "X for Y" vs "Y-like X" patterns
 
EXAMPLES OF SIMILAR:
- "Ansh Thakare" vs "build Ansh Thakare" = SIMILAR (same entity)
- "Travel booking app" vs "MakeMyTrip clone" = SIMILAR  
- "Food delivery" vs "restaurant ordering system" = SIMILAR
- "Chat application" vs "messaging platform" = SIMILAR
 
RESPONSE: Answer with just "SIMILAR" or "UNIQUE" followed by a brief reason.
`;
 
  try {
    const response = await axios.post(
      process.env.GEMINI_API_URL,
      {
        contents: [{ 
          parts: [{ text: prompt }] 
        }],
        generationConfig: {
          temperature: 0.05, // Even lower for more consistency
          maxOutputTokens: 200,
          topP: 0.1
        }
      },
      {
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        timeout: 20000
      }
    );
    const answer = (response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '').toLowerCase().trim();
    console.log(`Gemini detailed analysis for "${currentIdea}":`, answer);
    // More robust similarity detection
    const isSimilar = answer.includes('similar') || 
                     answer.startsWith('similar') ||
                     answer.includes('yes') || 
                     answer.includes('same') ||
                     answer.includes('duplicate');
    return isSimilar;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    // Enhanced fallback with better keyword matching
    const currentWords = currentIdea.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 2);
    const isSimilar = allRegisteredIdeas.some(prevIdea => {
      const prevWords = prevIdea.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 2);
      // Check for high word overlap
      const commonWords = currentWords.filter(w => prevWords.includes(w));
      const overlapPercentage = commonWords.length / Math.min(currentWords.length, prevWords.length);
      return overlapPercentage > 0.6; // 60% word overlap = similar
    });
    console.log(`Fallback similarity check result: ${isSimilar}`);
    throw error;
  }
}
 
async function checkIdeaSimilarity(newIdeas = [], allRegisteredIdeas = []) {
  console.log(`Checking ${newIdeas.length} new ideas against ${allRegisteredIdeas.length} registered ideas`);
  // Fallback logic if Gemini not set up
  if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_URL) {
    console.log('Gemini not configured, using enhanced fallback similarity check');
    return newIdeas.map(idea => {
      const currentLower = idea.toLowerCase().trim();
      return allRegisteredIdeas.some(prev => {
        const prevLower = prev.toLowerCase().trim();
        // Exact match
        if (currentLower === prevLower) return true;
        // One contains the other
        if (currentLower.includes(prevLower) || prevLower.includes(currentLower)) return true;
        // High word overlap
        const currentWords = currentLower.split(/[\s,.-]+/).filter(w => w.length > 2);
        const prevWords = prevLower.split(/[\s,.-]+/).filter(w => w.length > 2);
        const commonWords = currentWords.filter(w => prevWords.includes(w));
        const overlapPercentage = commonWords.length / Math.min(currentWords.length, prevWords.length);
        return overlapPercentage > 0.7; // 70% overlap for fallback
      });
    });
  }
 
  // Gemini analysis with better error handling
  try {
    const results = [];
    for (let i = 0; i < newIdeas.length; i++) {
      const idea = newIdeas[i];
      console.log(`Analyzing idea ${i + 1}/${newIdeas.length}: "${idea}"`);
      let isSimilar = false;
      let retryCount = 0;
      const maxRetries = 2;
      while (retryCount <= maxRetries) {
        try {
          isSimilar = await isIdeaSimilarUsingGemini(idea, allRegisteredIdeas);
          break; // Success, exit retry loop
        } catch (error) {
          retryCount++;
          if (retryCount <= maxRetries) {
            console.log(`Retry ${retryCount} for idea: "${idea}"`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
          } else {
            console.error(`Failed after ${maxRetries} retries for idea: "${idea}"`);
            // Use enhanced fallback for this specific idea
            const currentLower = idea.toLowerCase().trim();
            isSimilar = allRegisteredIdeas.some(prev => {
              const prevLower = prev.toLowerCase().trim();
              return currentLower === prevLower || 
                     currentLower.includes(prevLower) || 
                     prevLower.includes(currentLower);
            });
          }
        }
      }
      results.push(isSimilar);
      // Longer delay between API calls to avoid rate limiting
      if (i < newIdeas.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    console.log('Final similarity results:', results);
    return results;
  } catch (e) {
    console.error('Gemini similarity check completely failed:', e.message);
    // Complete fallback
    return newIdeas.map(idea => {
      const currentLower = idea.toLowerCase().trim();
      return allRegisteredIdeas.some(prev => 
        prev && currentLower === prev.toLowerCase().trim()
      );
    });
  }
}
 
module.exports = { checkIdeaSimilarity };
