export interface WebsiteCheckResult {
  score: number;
  maxScore: number;
  status: 'Verified' | 'Unable to verify' | 'Needs Improvement' | 'Strong';
  findings: {
    checkName: string;
    passed: boolean | null; // null if unable to verify
    scoreDelta: number;
    details: string;
  }[];
  summary: string;
}

export async function analyzeWebsite(url?: string | null): Promise<WebsiteCheckResult> {
  const maxScore = 20;

  if (!url || url.trim() === '' || url.trim().toLowerCase() === 'no') {
    return {
      score: 0,
      maxScore,
      status: 'Needs Improvement',
      findings: [
        {
          checkName: 'Website Availability',
          passed: false,
          scoreDelta: 0,
          details: 'No website URL was provided. Operating without a website reduces digital credibility and limits Google search visibility.',
        },
      ],
      summary: 'No active website found for this business.',
    };
  }

  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  const findings: WebsiteCheckResult['findings'] = [];
  let currentScore = 0;

  // Check 1: HTTPS protocol
  const isHttps = cleanUrl.startsWith('https://');
  if (isHttps) {
    currentScore += 3;
    findings.push({
      checkName: 'HTTPS Security',
      passed: true,
      scoreDelta: 3,
      details: 'Website uses secure HTTPS encryption, protecting user data and building visitor trust.',
    });
  } else {
    findings.push({
      checkName: 'HTTPS Security',
      passed: false,
      scoreDelta: 0,
      details: 'Website does not default to secure HTTPS protocol.',
    });
  }

  // Attempt real HTTP fetch with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(cleanUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'PakGrowth-Bot/1.0 (+https://pakgrowth.pk)',
      },
      signal: controller.signal,
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (!response || !response.ok) {
      // Mark as Unable to verify as instructed by rules
      return {
        score: isHttps ? 3 : 0,
        maxScore,
        status: 'Unable to verify',
        findings: [
          ...findings,
          {
            checkName: 'HTTP Verification',
            passed: null,
            scoreDelta: 0,
            details: `Unable to verify website content. Server returned status ${response ? response.status : 'Connection Timeout/Refused'}.`,
          },
        ],
        summary: 'Website server could not be reached or verified.',
      };
    }

    const htmlText = await response.text();

    // Check 2: Title Tag
    const hasTitle = /<title[^>]*>(.*?)<\/title>/i.test(htmlText);
    if (hasTitle) {
      currentScore += 3;
      findings.push({
        checkName: 'Page Title',
        passed: true,
        scoreDelta: 3,
        details: 'Valid HTML title tag present for search engine indexing.',
      });
    } else {
      findings.push({
        checkName: 'Page Title',
        passed: false,
        scoreDelta: 0,
        details: 'Missing page title tag in HTML header.',
      });
    }

    // Check 3: Meta Description
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i.test(htmlText);
    if (hasMetaDesc) {
      currentScore += 3;
      findings.push({
        checkName: 'Meta Description',
        passed: true,
        scoreDelta: 3,
        details: 'Meta description tag found, helping Google display a rich snippet.',
      });
    } else {
      findings.push({
        checkName: 'Meta Description',
        passed: false,
        scoreDelta: 0,
        details: 'No meta description tag detected in homepage HTML.',
      });
    }

    // Check 4: Mobile Viewport
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(htmlText);
    if (hasViewport) {
      currentScore += 3;
      findings.push({
        checkName: 'Mobile Responsiveness Tag',
        passed: true,
        scoreDelta: 3,
        details: 'Viewport tag detected ensuring website displays properly on smartphones.',
      });
    } else {
      findings.push({
        checkName: 'Mobile Responsiveness Tag',
        passed: false,
        scoreDelta: 0,
        details: 'Viewport meta tag missing, website may render poorly on mobile screens.',
      });
    }

    // Check 5: WhatsApp Direct Link or CTA on website
    const hasWhatsAppLink = /wa\.me|api\.whatsapp\.com|whatsapp/i.test(htmlText);
    if (hasWhatsAppLink) {
      currentScore += 4;
      findings.push({
        checkName: 'WhatsApp CTA Button',
        passed: true,
        scoreDelta: 4,
        details: 'Direct WhatsApp click-to-chat CTA button or link detected on website.',
      });
    } else {
      findings.push({
        checkName: 'WhatsApp CTA Button',
        passed: false,
        scoreDelta: 0,
        details: 'No direct WhatsApp CTA link detected on website homepage.',
      });
    }

    // Check 6: Phone/Contact Information
    const hasContactInfo = /tel:|phone|contact|address|email|03\d{9}/i.test(htmlText);
    if (hasContactInfo) {
      currentScore += 4;
      findings.push({
        checkName: 'Contact Information Visibility',
        passed: true,
        scoreDelta: 4,
        details: 'Phone or contact information clearly visible on website.',
      });
    } else {
      findings.push({
        checkName: 'Contact Information Visibility',
        passed: false,
        scoreDelta: 0,
        details: 'Contact info could not be automatically located on homepage.',
      });
    }

    return {
      score: Math.min(currentScore, maxScore),
      maxScore,
      status: currentScore >= 14 ? 'Strong' : 'Needs Improvement',
      findings,
      summary: `Website analyzed successfully (${currentScore}/${maxScore} pts).`,
    };
  } catch (err) {
    return {
      score: isHttps ? 3 : 0,
      maxScore,
      status: 'Unable to verify',
      findings: [
        ...findings,
        {
          checkName: 'Verification Exception',
          passed: null,
          scoreDelta: 0,
          details: 'Unable to verify website due to network or CORS restrictions.',
        },
      ],
      summary: 'Website content could not be verified automatically.',
    };
  }
}
