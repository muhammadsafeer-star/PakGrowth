import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 });
    }

    const totalUsers = await prisma.user.count();
    const totalAudits = await prisma.audit.count();

    const audits = await prisma.audit.findMany({
      include: {
        business: true,
        issues: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const avgScore =
      audits.length > 0
        ? Math.round(audits.reduce((acc, curr) => acc + curr.overallScore, 0) / audits.length)
        : 0;

    // City distribution
    const cityMap: Record<string, number> = {};
    const categoryMap: Record<string, number> = {};
    const issueMap: Record<string, number> = {};

    audits.forEach((a) => {
      if (a.business.city) {
        cityMap[a.business.city] = (cityMap[a.business.city] || 0) + 1;
      }
      if (a.business.category) {
        categoryMap[a.business.category] = (categoryMap[a.business.category] || 0) + 1;
      }
      a.issues.forEach((iss) => {
        issueMap[iss.title] = (issueMap[iss.title] || 0) + 1;
      });
    });

    const topCities = Object.entries(cityMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const topCategories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const topIssues = Object.entries(issueMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));

    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalAudits,
        avgScore,
        topCities,
        topCategories,
        topIssues,
        recentAudits: audits.slice(0, 10),
        recentUsers,
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to retrieve admin system statistics.' }, { status: 500 });
  }
}
