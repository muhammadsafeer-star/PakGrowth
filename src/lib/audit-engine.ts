import { analyzeWebsite } from './analyzers/website';
import { analyzeSocialMedia } from './analyzers/social';
import { analyzeWhatsApp } from './analyzers/whatsapp';
import { analyzeGooglePresence } from './analyzers/google';
import { generateAIAnalysis, AIAnalysisOutput } from './analyzers/ai-recommendations';
import { getScoreTier } from './constants';

export interface AuditRunInput {
  businessName: string;
  category: string;
  city: string;
  country?: string;
  description?: string;
  targetAudience?: string;
  hasWebsite?: boolean;
  websiteUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  hasWhatsApp?: boolean;
  whatsappNumber?: string;
  googleBusinessUrl?: string;
  mainGoal: string;
}

export interface AuditCategoryScore {
  category: string;
  score: number;
  maxScore: number;
  status: 'Verified' | 'Unable to verify' | 'Needs Improvement' | 'Strong';
  findings: Array<{ checkName?: string; platform?: string; passed: boolean | null; details: string }>;
  summary: string;
}

export interface AuditRunOutput {
  overallScore: number;
  status: string;
  categoryScores: AuditCategoryScore[];
  aiAnalysis: AIAnalysisOutput;
}

export async function runFullAudit(input: AuditRunInput): Promise<AuditRunOutput> {
  // 1. Analyze Website (20 pts)
  const websiteRes = await analyzeWebsite(input.hasWebsite !== false ? input.websiteUrl : null);

  // 2. Analyze Social Media (20 pts)
  const socialRes = await analyzeSocialMedia({
    instagramUrl: input.instagramUrl,
    facebookUrl: input.facebookUrl,
    tiktokUrl: input.tiktokUrl,
    linkedinUrl: input.linkedinUrl,
    youtubeUrl: input.youtubeUrl,
  });

  // 3. Analyze WhatsApp (15 pts)
  const whatsappRes = await analyzeWhatsApp(input.hasWhatsApp !== false ? input.whatsappNumber : null);

  // 4. Analyze Google Presence (15 pts)
  const googleRes = await analyzeGooglePresence(input.googleBusinessUrl, input.city);

  // 5. Evaluate Branding (10 pts)
  let brandingScore = 0;
  const brandingFindings = [];
  if (websiteRes.score > 5 || socialRes.score > 5) {
    brandingScore += 4;
    brandingFindings.push({ checkName: 'Digital Brand Footprint', passed: true, details: 'Active digital presence established across web/social touchpoints.' });
  } else {
    brandingFindings.push({ checkName: 'Digital Brand Footprint', passed: false, details: 'Limited online brand identity assets detected.' });
  }
  if (input.instagramUrl || input.facebookUrl) {
    brandingScore += 4;
    brandingFindings.push({ checkName: 'Visual Channel Presence', passed: true, details: 'Visual channels available for brand logo & image positioning.' });
  }
  brandingScore += 2; // Baseline professional presence
  const brandingCategory: AuditCategoryScore = {
    category: 'Branding',
    score: Math.min(brandingScore, 10),
    maxScore: 10,
    status: brandingScore >= 7 ? 'Strong' : 'Needs Improvement',
    findings: brandingFindings,
    summary: `Branding evaluated (${brandingScore}/10 pts).`,
  };

  // 6. Evaluate Content (10 pts)
  let contentScore = 0;
  const contentFindings = [];
  if (socialRes.score >= 10) {
    contentScore += 5;
    contentFindings.push({ checkName: 'Social Distribution Channels', passed: true, details: 'Multiple channels available for regular content publishing.' });
  } else {
    contentFindings.push({ checkName: 'Social Distribution Channels', passed: false, details: 'Few content distribution channels available.' });
  }
  if (input.tiktokUrl || input.youtubeUrl) {
    contentScore += 4;
    contentFindings.push({ checkName: 'Video Content Reach', passed: true, details: 'Dedicated video content distribution channel present.' });
  } else {
    contentFindings.push({ checkName: 'Video Content Reach', passed: false, details: 'No dedicated video channel (TikTok/YouTube) detected.' });
  }
  contentScore += 1;
  const contentCategory: AuditCategoryScore = {
    category: 'Content',
    score: Math.min(contentScore, 10),
    maxScore: 10,
    status: contentScore >= 7 ? 'Strong' : 'Needs Improvement',
    findings: contentFindings,
    summary: `Content strategy evaluated (${contentScore}/10 pts).`,
  };

  // 7. Evaluate Conversion Readiness (10 pts)
  let conversionScore = 0;
  const conversionFindings = [];
  if (whatsappRes.score >= 8) {
    conversionScore += 5;
    conversionFindings.push({ checkName: 'Direct Lead Capture Pathway', passed: true, details: 'WhatsApp gateway active for rapid customer conversion.' });
  } else {
    conversionFindings.push({ checkName: 'Direct Lead Capture Pathway', passed: false, details: 'Missing instant WhatsApp conversation pathway.' });
  }
  if (websiteRes.score >= 10 || googleRes.score >= 8) {
    conversionScore += 4;
    conversionFindings.push({ checkName: 'Trust & Location Verification', passed: true, details: 'Location and official presence verified to lower buyer resistance.' });
  }
  conversionScore += 1;
  const conversionCategory: AuditCategoryScore = {
    category: 'Conversion Readiness',
    score: Math.min(conversionScore, 10),
    maxScore: 10,
    status: conversionScore >= 7 ? 'Strong' : 'Needs Improvement',
    findings: conversionFindings,
    summary: `Conversion readiness evaluated (${conversionScore}/10 pts).`,
  };

  // Category Scores Mapping
  const websiteCategory: AuditCategoryScore = {
    category: 'Website',
    score: websiteRes.score,
    maxScore: 20,
    status: websiteRes.status,
    findings: websiteRes.findings,
    summary: websiteRes.summary,
  };

  const socialCategory: AuditCategoryScore = {
    category: 'Social Media',
    score: socialRes.score,
    maxScore: 20,
    status: socialRes.status,
    findings: socialRes.findings,
    summary: socialRes.summary,
  };

  const whatsappCategory: AuditCategoryScore = {
    category: 'WhatsApp',
    score: whatsappRes.score,
    maxScore: 15,
    status: whatsappRes.status,
    findings: whatsappRes.findings,
    summary: whatsappRes.summary,
  };

  const googleCategory: AuditCategoryScore = {
    category: 'Google Presence',
    score: googleRes.score,
    maxScore: 15,
    status: googleRes.status,
    findings: googleRes.findings,
    summary: googleRes.summary,
  };

  const categoryScores = [
    websiteCategory,
    socialCategory,
    whatsappCategory,
    googleCategory,
    brandingCategory,
    contentCategory,
    conversionCategory,
  ];

  const totalScore = categoryScores.reduce((sum, item) => sum + item.score, 0);
  const roundedScore = Math.min(Math.max(totalScore, 0), 100);
  const tier = getScoreTier(roundedScore);

  // AI Recommendation Engine call
  const aiAnalysis = generateAIAnalysis({
    businessName: input.businessName,
    category: input.category,
    city: input.city,
    mainGoal: input.mainGoal,
    scores: {
      website: websiteCategory.score,
      social: socialCategory.score,
      whatsapp: whatsappCategory.score,
      google: googleCategory.score,
      branding: brandingCategory.score,
      content: contentCategory.score,
      conversion: conversionCategory.score,
    },
    hasWebsite: !!input.websiteUrl && input.websiteUrl.trim().length > 3,
    hasWhatsApp: !!input.whatsappNumber && input.whatsappNumber.trim().length > 3,
    hasGoogle: !!input.googleBusinessUrl && input.googleBusinessUrl.trim().length > 3,
  });

  return {
    overallScore: roundedScore,
    status: tier.label,
    categoryScores,
    aiAnalysis,
  };
}
