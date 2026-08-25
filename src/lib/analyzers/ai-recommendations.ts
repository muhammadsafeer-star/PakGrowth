export interface AuditIssueItem {
  title: string;
  description: string;
  severity: 'Critical' | 'Important' | 'Optimization';
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  recommendation: string;
}

export interface RecommendationItem {
  rank: number;
  title: string;
  action: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
}

export interface WeeklyPlanTask {
  day: number;
  title: string;
  description: string;
  channel: string;
}

export interface GrowthPlanWeek {
  weekNumber: number;
  title: string;
  objective: string;
  tasks: WeeklyPlanTask[];
}

export interface AIAnalysisOutput {
  issues: AuditIssueItem[];
  recommendations: RecommendationItem[];
  growthPlan: GrowthPlanWeek[];
}

export function generateAIAnalysis(params: {
  businessName: string;
  category: string;
  city: string;
  mainGoal: string;
  scores: {
    website: number;
    social: number;
    whatsapp: number;
    google: number;
    branding: number;
    content: number;
    conversion: number;
  };
  hasWebsite: boolean;
  hasWhatsApp: boolean;
  hasGoogle: boolean;
}): AIAnalysisOutput {
  const issues: AuditIssueItem[] = [];
  const recs: RecommendationItem[] = [];

  // Issue 1: WhatsApp CTA missing
  if (!params.hasWhatsApp || params.scores.whatsapp < 8) {
    issues.push({
      title: 'Your business has no visible WhatsApp CTA',
      description: 'Pakistani consumers prefer inquiring and ordering directly via WhatsApp rather than filling email forms.',
      severity: 'Critical',
      category: 'WhatsApp Business',
      impact: 'High',
      difficulty: 'Easy',
      recommendation: 'Add a prominent floating WhatsApp button to your website, social media bios, and marketing materials.',
    });
  }

  // Issue 2: Website missing or non-performant
  if (!params.hasWebsite) {
    issues.push({
      title: 'Missing Dedicated Business Website',
      description: 'Relying solely on social media limits organic Google search leads and reduces customer trust for larger orders.',
      severity: 'Critical',
      category: 'Website',
      impact: 'High',
      difficulty: 'Medium',
      recommendation: 'Launch a clean, fast single-page website featuring your services, pricing, customer reviews, and direct contact buttons.',
    });
  } else if (params.scores.website < 12) {
    issues.push({
      title: 'Website Lacks Essential Conversion & SEO Tags',
      description: 'Your website is missing key meta titles or clear contact call-to-actions, making it hard for Google users to discover you.',
      severity: 'Important',
      category: 'Website',
      impact: 'High',
      difficulty: 'Easy',
      recommendation: 'Update page titles with target city keywords (e.g. "Best ' + params.category + ' in ' + params.city + '") and insert clear CTA buttons.',
    });
  }

  // Issue 3: Google Business Profile missing
  if (!params.hasGoogle) {
    issues.push({
      title: 'No Google Maps / Business Profile Found',
      description: `Customers in ${params.city} searching "near me" for ${params.category} will not see your business location.`,
      severity: 'Critical',
      category: 'Google Presence',
      impact: 'High',
      difficulty: 'Easy',
      recommendation: 'Claim and verify your free Google Business Profile, add your exact location in ' + params.city + ', and upload high-resolution photos.',
    });
  }

  // Issue 4: Social Media Engagement & Short-Form Video
  if (params.scores.social < 12) {
    issues.push({
      title: 'Low Multi-Platform Social Coverage',
      description: 'Your business is inactive on key visual platforms where Pakistani buyers spend 2+ hours daily.',
      severity: 'Important',
      category: 'Social Media',
      impact: 'High',
      difficulty: 'Easy',
      recommendation: 'Optimize your Instagram & Facebook bio links with a single tap-to-chat WhatsApp link.',
    });
  }

  // Issue 5: Customer Trust & Reviews
  if (params.scores.conversion < 7) {
    issues.push({
      title: 'Insufficient Social Proof & Customer Reviews',
      description: 'Online buyers in Pakistan hesitate to purchase without seeing authentic customer reviews, video testimonials, or unboxing clips.',
      severity: 'Important',
      category: 'Conversion Readiness',
      impact: 'High',
      difficulty: 'Easy',
      recommendation: 'Collect 10 authentic Google and WhatsApp customer review screenshots and feature them on your main profiles.',
    });
  }

  // Issue 6: Content Consistency
  if (params.scores.content < 7) {
    issues.push({
      title: 'Inconsistent Content & Video Strategy',
      description: 'Posting infrequently causes algorithms to drop your reach. Short-form video (Reels/TikTok) is required for free organic reach in Pakistan.',
      severity: 'Optimization',
      category: 'Content',
      impact: 'Medium',
      difficulty: 'Medium',
      recommendation: 'Publish 3 weekly short vertical videos showcasing Behind-The-Scenes, customer problem solving, and product highlights.',
    });
  }

  // Generate Ranked Recommendations ("Fix First" System)
  let rankCounter = 1;

  if (!params.hasWhatsApp || params.scores.whatsapp < 8) {
    recs.push({
      rank: rankCounter++,
      title: 'Improve WhatsApp Conversion Gateway',
      action: 'Install a floating WhatsApp chat button and format your bio link to wa.me/923XXXXXXXXX with a pre-filled greeting message.',
      category: 'WhatsApp Business',
      impact: 'High',
      effort: 'Low',
    });
  }

  if (!params.hasGoogle) {
    recs.push({
      rank: rankCounter++,
      title: 'Setup & Verify Google Maps Profile',
      action: `Create your Google Business Profile for ${params.businessName} in ${params.city}. Request physical postcard or video verification.`,
      category: 'Google Presence',
      impact: 'High',
      effort: 'Low',
    });
  }

  recs.push({
    rank: rankCounter++,
    title: 'Optimize Social Media Bio & Link Tree',
    action: 'Standardize bio description across Instagram and Facebook. Clearly state what you offer, target location, and add a single call-to-action.',
    category: 'Social Media',
    impact: 'High',
    effort: 'Low',
  });

  recs.push({
    rank: rankCounter++,
    title: 'Collect & Publish 10 Customer Reviews',
    action: 'Send a post-purchase feedback link via WhatsApp to your last 20 satisfied customers and publish highlights as Instagram Highlights.',
    category: 'Conversion Readiness',
    impact: 'Medium',
    effort: 'Low',
  });

  if (params.hasWebsite && params.scores.website < 15) {
    recs.push({
      rank: rankCounter++,
      title: 'Optimize Website SEO & Meta Title Tags',
      action: `Include your core service and city (${params.category} in ${params.city}) inside the website header title tag.`,
      category: 'Website',
      impact: 'High',
      effort: 'Medium',
    });
  }

  recs.push({
    rank: rankCounter++,
    title: 'Implement Weekly Short-Form Reel Strategy',
    action: 'Create 12 short video clips showcasing raw product quality, process, or client transformations to drive viral local discovery.',
    category: 'Content',
    impact: 'Medium',
    effort: 'Medium',
  });

  // Generate 30-Day Growth Plan (4 Weeks)
  const growthPlan: GrowthPlanWeek[] = [
    {
      weekNumber: 1,
      title: 'Fix Digital Foundation & Quick Wins',
      objective: 'Eliminate friction points preventing prospective clients in Pakistan from contacting you immediately.',
      tasks: [
        { day: 1, title: 'Optimize Instagram & Facebook Bio', description: 'Update profile image to crisp logo, add business slogan, and set WhatsApp link.', channel: 'Social Media' },
        { day: 2, title: 'Add WhatsApp Click-to-Chat CTA', description: 'Configure direct floating WhatsApp button on website and social profiles.', channel: 'WhatsApp' },
        { day: 3, title: 'Claim/Verify Google Business Profile', description: `Submit business location details for ${params.city} on Google Maps.`, channel: 'Google' },
        { day: 4, title: 'Collect Customer Reviews', description: 'Ask 5 recent happy clients for star reviews on Google or WhatsApp screenshot.', channel: 'Trust' },
        { day: 5, title: 'Update Website Contact Header', description: 'Ensure phone number and city location are visible without scrolling.', channel: 'Website' },
      ],
    },
    {
      weekNumber: 2,
      title: 'Content & Trust Building',
      objective: 'Establish authority and visual proof of your product or service quality.',
      tasks: [
        { day: 6, title: 'Script 3 Short Educational Videos', description: 'Draft simple 30-second answers to top 3 questions customers ask before buying.', channel: 'Content' },
        { day: 7, title: 'Record Behind-the-Scenes Clip', description: 'Show how your work or order packaging is done cleanly in Pakistan.', channel: 'Content' },
        { day: 8, title: 'Publish Instagram Review Highlight', description: 'Group customer screenshots into a permanent "Reviews" story highlight.', channel: 'Social Media' },
        { day: 9, title: 'Post Reel #1: Product Highlight', description: 'Publish first short video Reel with local trending audio.', channel: 'Social Media' },
        { day: 10, title: 'Review Competitor Pricing & Offers', description: 'Analyze top 3 local competitors in ' + params.city + ' to refine your value proposition.', channel: 'Strategy' },
      ],
    },
    {
      weekNumber: 3,
      title: 'Lead Generation & Customer Acquisition',
      objective: 'Drive targeted inbound inquiries from local customers actively searching for your service.',
      tasks: [
        { day: 11, title: 'Setup WhatsApp Auto-Responder', description: 'Enable greeting message in WhatsApp Business app with business hours and menu.', channel: 'WhatsApp' },
        { day: 12, title: 'Launch First Local Targeted Ad / Boost', description: 'Run a modest budget ($2/day) Meta campaign targeted to ' + params.city + ' residents.', channel: 'Paid Growth' },
        { day: 13, title: 'Post Educational Reel #2', description: 'Share a problem-solving video demonstrating customer benefits.', channel: 'Content' },
        { day: 14, title: 'Engage Local Niche Accounts', description: 'Leave thoughtful comments on 10 relevant local community or industry pages.', channel: 'Organic Growth' },
        { day: 15, title: 'Audit Weekly Ad / Inquiry Performance', description: 'Track how many WhatsApp messages resulted in active sales conversations.', channel: 'Analytics' },
      ],
    },
    {
      weekNumber: 4,
      title: 'Optimization & Measurement',
      objective: 'Refine converting channels, double down on top content, and review updated Digital Score.',
      tasks: [
        { day: 16, title: 'Gather Week 3 Leads Feedback', description: 'Analyze conversion percentage of inbound WhatsApp conversations.', channel: 'Sales' },
        { day: 17, title: 'Publish Product Transformation Reel', description: 'Post Before vs After or finished project showcase.', channel: 'Content' },
        { day: 18, title: 'Update Google Business Photos', description: 'Upload 5 new photos of work, office, storefront, or inventory.', channel: 'Google' },
        { day: 19, title: 'Re-run PakGrowth Free Audit', description: 'Run a fresh audit to verify score improvement and mark fixed issues.', channel: 'PakGrowth' },
        { day: 20, title: 'Set Next Month Growth Target', description: 'Establish clear target for WhatsApp inquiries and sales revenue.', channel: 'Strategy' },
      ],
    },
  ];

  return {
    issues,
    recommendations: recs,
    growthPlan,
  };
}
