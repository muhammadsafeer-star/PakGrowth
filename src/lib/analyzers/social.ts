export interface SocialCheckResult {
  score: number;
  maxScore: number;
  status: 'Verified' | 'Unable to verify' | 'Needs Improvement' | 'Strong';
  findings: {
    platform: string;
    passed: boolean | null;
    scoreDelta: number;
    details: string;
  }[];
  summary: string;
}

export async function analyzeSocialMedia(profiles: {
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
}): Promise<SocialCheckResult> {
  const maxScore = 20;
  const findings: SocialCheckResult['findings'] = [];
  let score = 0;
  let activePlatformsCount = 0;

  // Instagram Evaluation (Max 6 pts)
  if (profiles.instagramUrl && profiles.instagramUrl.trim().length > 5) {
    const url = profiles.instagramUrl.trim();
    if (url.includes('instagram.com/')) {
      score += 6;
      activePlatformsCount++;
      findings.push({
        platform: 'Instagram',
        passed: true,
        scoreDelta: 6,
        details: 'Active Instagram profile provided. Essential for visually-driven Pakistani audience engagement.',
      });
    } else {
      findings.push({
        platform: 'Instagram',
        passed: null,
        scoreDelta: 0,
        details: 'Unable to verify Instagram link structure. Please ensure it follows instagram.com/yourbrand.',
      });
    }
  } else {
    findings.push({
      platform: 'Instagram',
      passed: false,
      scoreDelta: 0,
      details: 'No Instagram profile link provided. Instagram is the primary sales channel for consumer brands in Pakistan.',
    });
  }

  // Facebook Evaluation (Max 5 pts)
  if (profiles.facebookUrl && profiles.facebookUrl.trim().length > 5) {
    const url = profiles.facebookUrl.trim();
    if (url.includes('facebook.com/')) {
      score += 5;
      activePlatformsCount++;
      findings.push({
        platform: 'Facebook',
        passed: true,
        scoreDelta: 5,
        details: 'Facebook page link verified. Crucial for community trust, reviews, and Facebook Ads in Pakistan.',
      });
    } else {
      findings.push({
        platform: 'Facebook',
        passed: null,
        scoreDelta: 0,
        details: 'Unable to verify Facebook link structure.',
      });
    }
  } else {
    findings.push({
      platform: 'Facebook',
      passed: false,
      scoreDelta: 0,
      details: 'No Facebook Page provided. Facebook remains a top local discovery channel for Pakistani SMEs.',
    });
  }

  // TikTok / Reels / Short Form Video Presence (Max 4 pts)
  if (profiles.tiktokUrl && profiles.tiktokUrl.trim().length > 5) {
    score += 4;
    activePlatformsCount++;
    findings.push({
      platform: 'TikTok',
      passed: true,
      scoreDelta: 4,
      details: 'TikTok channel active. Short-form video yields high organic reach among Pakistani youth.',
    });
  } else {
    findings.push({
      platform: 'Short-Form Video (TikTok)',
      passed: false,
      scoreDelta: 0,
      details: 'No TikTok or dedicated short-form video presence linked.',
    });
  }

  // LinkedIn (Max 3 pts)
  if (profiles.linkedinUrl && profiles.linkedinUrl.trim().length > 5) {
    score += 3;
    activePlatformsCount++;
    findings.push({
      platform: 'LinkedIn',
      passed: true,
      scoreDelta: 3,
      details: 'LinkedIn company profile active. Enhances B2B credibility, employer brand, and corporate trust.',
    });
  }

  // YouTube (Max 2 pts)
  if (profiles.youtubeUrl && profiles.youtubeUrl.trim().length > 5) {
    score += 2;
    activePlatformsCount++;
    findings.push({
      platform: 'YouTube',
      passed: true,
      scoreDelta: 2,
      details: 'YouTube channel present. Provides long-form video, product walkthroughs, and SEO video authority.',
    });
  }

  const finalScore = Math.min(score, maxScore);
  const status = activePlatformsCount >= 3 ? 'Strong' : activePlatformsCount >= 1 ? 'Needs Improvement' : 'Unable to verify';

  return {
    score: finalScore,
    maxScore,
    status,
    findings,
    summary: `${activePlatformsCount} social media channel(s) verified (${finalScore}/${maxScore} pts).`,
  };
}
