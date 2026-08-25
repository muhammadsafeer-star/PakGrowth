import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const userBusinesses = await prisma.business.findMany({
      where: { userId: user.userId },
      include: {
        audits: {
          orderBy: { createdAt: 'desc' },
          include: {
            scores: true,
            issues: true,
            recommendations: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const allAudits = userBusinesses.flatMap((b) => b.audits);
    const latestAudit = allAudits.length > 0 ? allAudits[0] : null;
    const previousAudit = allAudits.length > 1 ? allAudits[1] : null;

    const currentScore = latestAudit ? latestAudit.overallScore : 0;
    const previousScore = previousAudit ? previousAudit.overallScore : currentScore;
    const scoreImprovement = currentScore - previousScore;

    return NextResponse.json({
      success: true,
      stats: {
        totalBusinesses: userBusinesses.length,
        totalAudits: allAudits.length,
        currentScore,
        previousScore,
        scoreImprovement,
        latestAudit,
        businesses: userBusinesses,
      },
    });
  } catch (error: any) {
    console.error('Error fetching user dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to retrieve dashboard statistics.' }, { status: 500 });
  }
}
