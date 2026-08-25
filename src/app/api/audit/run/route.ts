import { NextResponse } from 'next/server';
import { runFullAudit } from '@/lib/audit-engine';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      businessName,
      category,
      city,
      country = 'Pakistan',
      description,
      targetAudience,
      hasWebsite,
      websiteUrl,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      linkedinUrl,
      youtubeUrl,
      hasWhatsApp,
      whatsappNumber,
      googleBusinessUrl,
      mainGoal,
    } = body;

    if (!businessName || !category || !city || !mainGoal) {
      return NextResponse.json(
        { error: 'Missing required business information fields (Business Name, Category, City, Goal).' },
        { status: 400 }
      );
    }

    // Run Full Audit Engine
    const auditOutput = await runFullAudit({
      businessName,
      category,
      city,
      country,
      description,
      targetAudience,
      hasWebsite: hasWebsite !== false,
      websiteUrl,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      linkedinUrl,
      youtubeUrl,
      hasWhatsApp: hasWhatsApp !== false,
      whatsappNumber,
      googleBusinessUrl,
      mainGoal,
    });

    const currentUser = await getCurrentUser();
    let userId: string | null = currentUser?.userId || null;

    // Create Business Record
    const business = await prisma.business.create({
      data: {
        userId: userId,
        name: businessName,
        category,
        city,
        country,
        description,
        targetAudience,
        websiteUrl,
        instagramUrl,
        facebookUrl,
        tiktokUrl,
        linkedinUrl,
        youtubeUrl,
        whatsappNumber,
        googleBusinessUrl,
        mainGoal,
      },
    });

    // Create Audit Record with relations
    const audit = await prisma.audit.create({
      data: {
        businessId: business.id,
        overallScore: auditOutput.overallScore,
        status: auditOutput.status,
        scores: {
          create: auditOutput.categoryScores.map((c) => ({
            category: c.category,
            score: c.score,
            maxScore: c.maxScore,
            status: c.status,
            detailsJson: JSON.stringify(c.findings),
          })),
        },
        issues: {
          create: auditOutput.aiAnalysis.issues.map((i) => ({
            title: i.title,
            description: i.description,
            severity: i.severity,
            category: i.category,
            impact: i.impact,
            difficulty: i.difficulty,
          })),
        },
        recommendations: {
          create: auditOutput.aiAnalysis.recommendations.map((r) => ({
            rank: r.rank,
            title: r.title,
            action: r.action,
            category: r.category,
            impact: r.impact,
            effort: r.effort,
          })),
        },
        growthPlan: {
          create: {
            planJson: JSON.stringify(auditOutput.aiAnalysis.growthPlan),
          },
        },
      },
    });

    // If user is logged in, log audit history
    if (userId) {
      await prisma.auditHistory.create({
        data: {
          userId,
          auditId: audit.id,
          score: auditOutput.overallScore,
        },
      });
    }

    return NextResponse.json({
      success: true,
      auditId: audit.id,
      overallScore: auditOutput.overallScore,
      status: auditOutput.status,
    });
  } catch (error: any) {
    console.error('Audit execution error:', error);
    return NextResponse.json(
      { error: 'We could not analyze this digital presence right now. Please try again later.' },
      { status: 500 }
    );
  }
}
