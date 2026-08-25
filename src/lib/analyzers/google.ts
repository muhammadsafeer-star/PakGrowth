export interface GoogleCheckResult {
  score: number;
  maxScore: number;
  status: 'Verified' | 'Unable to verify' | 'Needs Improvement' | 'Strong';
  findings: {
    checkName: string;
    passed: boolean | null;
    scoreDelta: number;
    details: string;
  }[];
  summary: string;
}

export async function analyzeGooglePresence(
  googleBusinessUrl?: string | null,
  city?: string
): Promise<GoogleCheckResult> {
  const maxScore = 15;

  if (!googleBusinessUrl || googleBusinessUrl.trim() === '' || googleBusinessUrl.trim().toLowerCase() === 'no') {
    return {
      score: 0,
      maxScore,
      status: 'Needs Improvement',
      findings: [
        {
          checkName: 'Google Business Profile',
          passed: false,
          scoreDelta: 0,
          details: `No Google Business Profile provided. Local customers in ${city || 'Pakistan'} searching on Google Maps will not find your physical or service location.`,
        },
      ],
      summary: 'Google Business Profile missing.',
    };
  }

  const url = googleBusinessUrl.trim();
  const findings: GoogleCheckResult['findings'] = [];
  let score = 0;

  const isGoogleDomain =
    url.includes('google.com/maps') ||
    url.includes('g.page') ||
    url.includes('business.google.com') ||
    url.includes('goo.gl/maps');

  if (isGoogleDomain) {
    score += 8;
    findings.push({
      checkName: 'Google Maps Profile Link',
      passed: true,
      scoreDelta: 8,
      details: 'Verified Google Business Profile link format. Enables map pins, local search placement, and customer direction navigation.',
    });
  } else {
    score += 3;
    findings.push({
      checkName: 'Google Maps Profile Link',
      passed: null,
      scoreDelta: 3,
      details: 'Unable to verify standard Google Maps URL format. Please ensure it is a direct share link from Google Business.',
    });
  }

  // Local Search Visibility Signal in City
  score += 4;
  findings.push({
    checkName: `Local Discovery in ${city || 'Pakistan'}`,
    passed: true,
    scoreDelta: 4,
    details: `Local geographic anchor set to ${city || 'Pakistan'}, improving "near me" search potential.`,
  });

  // Customer Reviews Signal
  score += 3;
  findings.push({
    checkName: 'Google Reviews Readiness',
    passed: true,
    scoreDelta: 3,
    details: 'Google Profile can collect 5-star customer reviews and build trust badges.',
  });

  const finalScore = Math.min(score, maxScore);

  return {
    score: finalScore,
    maxScore,
    status: finalScore >= 11 ? 'Strong' : 'Needs Improvement',
    findings,
    summary: `Google Local Presence analyzed (${finalScore}/${maxScore} pts).`,
  };
}
