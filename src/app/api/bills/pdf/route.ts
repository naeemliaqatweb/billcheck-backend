import { NextResponse } from 'next/server';
import { fetchOfficialBillHtml, PROVIDERS_META } from '@/services/billScraper';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, referenceNumber, consumerId, searchType } = body;
    const query = (referenceNumber || consumerId || '').toString().trim();

    if (!company || !query) {
      return NextResponse.json(
        { success: false, error: 'Missing company or referenceNumber parameter' },
        { status: 400 }
      );
    }

    const officialHtml = await fetchOfficialBillHtml(company, query, searchType);
    const cleanRef = query.replace(/[^0-9a-zA-Z]/g, '');
    const fileName = `Official_Bill_${company.toUpperCase()}_${cleanRef}.pdf`;

    return NextResponse.json({
      success: true,
      hasOfficialHtml: Boolean(officialHtml),
      html: officialHtml || null,
      company: company.toUpperCase(),
      referenceNumber: cleanRef,
      fileName,
      portalUrl: PROVIDERS_META[company.toUpperCase()]?.portalUrl || 'https://bill.pitc.com.pk/',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch official bill PDF',
      },
      { status: 500 }
    );
  }
}
