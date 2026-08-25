import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const auditId = params.id;

    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
      include: {
        business: true,
        scores: true,
        issues: true,
        recommendations: {
          orderBy: { rank: 'asc' },
        },
        growthPlan: true,
      },
    });

    if (!audit) {
      return NextResponse.json({ error: 'Audit report not found.' }, { status: 404 });
    }

    // Format scores details JSON
    const formattedScores = audit.scores.map((s) => ({
      ...s,
      findings: s.detailsJson ? JSON.parse(s.detailsJson) : [],
    }));

    const formattedGrowthPlan = audit.growthPlan?.planJson
      ? JSON.parse(audit.growthPlan.planJson)
      : [];

    return NextResponse.json({
      audit: {
        ...audit,
        scores: formattedScores,
        growthPlanData: formattedGrowthPlan,
      },
    });
  } catch (error: any) {
    console.error('Error fetching audit details:', error);
    return NextResponse.json({ error: 'Failed to retrieve audit report details.' }, { status: 500 });
  }
}
