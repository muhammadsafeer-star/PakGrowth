const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'pk_hash_' + Math.abs(hash).toString(36);
}

async function main() {
  console.log('Seeding PakGrowth database...');

  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@pakgrowth.pk' },
    update: {},
    create: {
      email: 'admin@pakgrowth.pk',
      name: 'PakGrowth Administrator',
      passwordHash: hashPassword('AdminPass2026!'),
      role: 'ADMIN',
    },
  });

  // Create Demo Business User
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@zafelectrical.pk' },
    update: {},
    create: {
      email: 'demo@zafelectrical.pk',
      name: 'Zafar Iqbal',
      passwordHash: hashPassword('DemoPass2026!'),
      role: 'USER',
    },
  });

  // Create Demo Business: ZAF Electrical Solutions
  const demoBusiness = await prisma.business.create({
    data: {
      userId: demoUser.id,
      name: 'ZAF Electrical Solutions',
      category: 'Solar',
      city: 'Lahore',
      country: 'Pakistan',
      description: 'Leading provider of Solar PV installations, CCTV security systems, and commercial networking across Punjab.',
      targetAudience: 'Homeowners, commercial plazas, factories, and schools',
      websiteUrl: 'https://zafelectrical.pk',
      instagramUrl: 'https://instagram.com/zafelectrical.pk',
      facebookUrl: 'https://facebook.com/zafelectrical.pk',
      whatsappNumber: '03001234567',
      googleBusinessUrl: 'https://maps.google.com/?q=ZAF+Electrical+Lahore',
      mainGoal: 'Get more customers',
    },
  });

  // Create Demo Audit for ZAF Electrical Solutions
  const demoAudit = await prisma.audit.create({
    data: {
      businessId: demoBusiness.id,
      overallScore: 73,
      status: 'Good',
      scores: {
        create: [
          {
            category: 'Website',
            score: 16,
            maxScore: 20,
            status: 'Strong',
            detailsJson: JSON.stringify([
              { checkName: 'HTTPS Security', passed: true, scoreDelta: 3, details: 'HTTPS active' },
              { checkName: 'Page Title', passed: true, scoreDelta: 3, details: 'Title present' },
              { checkName: 'WhatsApp CTA', passed: true, scoreDelta: 4, details: 'WhatsApp button active' },
            ]),
          },
          {
            category: 'Social Media',
            score: 14,
            maxScore: 20,
            status: 'Strong',
            detailsJson: JSON.stringify([
              { platform: 'Instagram', passed: true, scoreDelta: 6, details: 'Instagram active' },
              { platform: 'Facebook', passed: true, scoreDelta: 5, details: 'Facebook active' },
            ]),
          },
          {
            category: 'WhatsApp',
            score: 11,
            maxScore: 15,
            status: 'Strong',
            detailsJson: JSON.stringify([
              { checkName: 'WhatsApp Number', passed: true, scoreDelta: 6, details: 'Verified number' },
            ]),
          },
          {
            category: 'Google Presence',
            score: 10,
            maxScore: 15,
            status: 'Needs Improvement',
            detailsJson: JSON.stringify([
              { checkName: 'Google Maps Profile', passed: true, scoreDelta: 8, details: 'Google profile active' },
            ]),
          },
          {
            category: 'Branding',
            score: 8,
            maxScore: 10,
            status: 'Strong',
            detailsJson: JSON.stringify([
              { checkName: 'Brand Logo', passed: true, details: 'Logo verified' },
            ]),
          },
          {
            category: 'Content',
            score: 7,
            maxScore: 10,
            status: 'Needs Improvement',
            detailsJson: JSON.stringify([
              { checkName: 'Reels Presence', passed: false, details: 'Missing vertical short video reels' },
            ]),
          },
          {
            category: 'Conversion Readiness',
            score: 7,
            maxScore: 10,
            status: 'Needs Improvement',
            detailsJson: JSON.stringify([
              { checkName: 'Customer Reviews', passed: false, details: 'Fewer than 5 visible Google reviews' },
            ]),
          },
        ],
      },
      issues: {
        create: [
          {
            title: 'Your website has no visible WhatsApp CTA banner',
            description: 'Visitors browsing your solar installation packages cannot immediately start a direct WhatsApp chat.',
            severity: 'Critical',
            category: 'WhatsApp Business',
            impact: 'High',
            difficulty: 'Easy',
          },
          {
            title: 'Fewer than 10 Google Business Reviews',
            description: 'Competitors in Lahore have 40+ 5-star reviews, causing potential solar buyers to pick competitors first.',
            severity: 'Important',
            category: 'Google Presence',
            impact: 'High',
            difficulty: 'Easy',
          },
          {
            title: 'No Vertical Video Reels (TikTok/Instagram)',
            description: 'Solar PV transformation videos perform exceptionally well on TikTok and Instagram Reels in Pakistan.',
            severity: 'Optimization',
            category: 'Content',
            impact: 'Medium',
            difficulty: 'Medium',
          },
        ],
      },
      recommendations: {
        create: [
          {
            rank: 1,
            title: 'Improve WhatsApp Conversion Gateway',
            action: 'Add a floating WhatsApp chat widget on zafelectrical.pk homepage.',
            category: 'WhatsApp Business',
            impact: 'High',
            effort: 'Low',
            isCompleted: false,
          },
          {
            rank: 2,
            title: 'Collect 15 Google Reviews from Recent Solar Clients',
            action: 'Send direct WhatsApp review links to recent home and commercial clients in Lahore.',
            category: 'Google Presence',
            impact: 'High',
            effort: 'Low',
            isCompleted: false,
          },
          {
            rank: 3,
            title: 'Publish Weekly Solar Installation Reels',
            action: 'Record 30-second clips of inverter setups and solar panel mountings.',
            category: 'Content',
            impact: 'Medium',
            effort: 'Medium',
            isCompleted: true,
          },
        ],
      },
    },
  });

  console.log('Database seeded successfully!');
  console.log(`Demo Audit ID: ${demoAudit.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
