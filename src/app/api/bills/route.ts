import { NextResponse } from 'next/server';
import { fetchBillDetails, PROVIDERS_META, getOfficialPortalDirectUrl, BillFetchError } from '@/services/billScraper';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'PakBill Hub API Gateway is active.',
    supportedProviders: Object.keys(PROVIDERS_META).map((key) => ({
      code: key,
      ...PROVIDERS_META[key],
    })),
    disclaimer: 'PakBill Hub is an independent third-party tool and is not affiliated with, endorsed by, or representing any government entity or utility DISCO. Data is parsed from publicly accessible portals.',
  });
}

export async function POST(request: Request) {
  let company = '';
  let query = '';

  try {
    const body = await request.json();
    company = (body.company || '').toString().trim();
    query = (body.referenceNumber || body.consumerId || '').toString().trim();

    if (!company || !query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: `company` and `referenceNumber` or `consumerId` are mandatory.',
        },
        { status: 400 }
      );
    }

    const billData = await fetchBillDetails(company, query, body.searchType);

    return NextResponse.json({
      success: true,
      data: billData,
      disclaimer: 'This bill information is provided for user convenience from public portals. PakBill Hub has no official affiliation with the government or utility providers.',
    });
  } catch (error) {
    const officialPortalUrl = error instanceof BillFetchError
      ? error.officialPortalUrl
      : getOfficialPortalDirectUrl(company || 'LESCO', query || '');

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch live bill details from portal.',
        messageUrdu: 'سرور سے لائیو ڈیٹا حاصل نہیں ہو سکا۔ سرکاری پورٹل پر اپنا اصل بل دیکھنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔',
        officialPortalUrl,
        company,
        referenceNumber: query,
      },
      { status: 200 }
    );
  }
}

