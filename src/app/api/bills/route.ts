import { NextResponse } from 'next/server';
import { fetchBillDetails, PROVIDERS_META, getOfficialPortalDirectUrl, BillFetchError } from '@/services/billScraper';

// ── In-Memory Serverless Cache Map (12-Hour TTL) ─────────────────────────────
interface CacheEntry {
  data: any;
  cachedAt: number;
}
const BILL_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours (bills change only once monthly)

function getCacheKey(company: string, ref: string): string {
  return `${company.toUpperCase().trim()}_${ref.replace(/[^0-9a-zA-Z]/g, '').trim()}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const company = (searchParams.get('company') || '').trim();
  const ref = (searchParams.get('referenceNumber') || searchParams.get('refno') || searchParams.get('consumerId') || '').trim();

  // If no params, return API meta
  if (!company || !ref) {
    return NextResponse.json({
      success: true,
      message: 'PakBill Hub API Gateway is active.',
      supportedProviders: Object.keys(PROVIDERS_META).map((key) => ({
        code: key,
        ...PROVIDERS_META[key],
      })),
      disclaimer: 'PakBill Hub is an independent third-party tool and is not affiliated with, endorsed by, or representing any government entity or utility DISCO.',
    });
  }

  // Handle cached GET request (Allows Vercel Edge CDN caching)
  const cacheKey = getCacheKey(company, ref);
  const cached = BILL_CACHE.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(
      {
        success: true,
        data: cached.data,
        cached: true,
        disclaimer: 'Served from high-speed cache. PakBill Hub is an independent utility viewer.',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=43200, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
  }

  try {
    const billData = await fetchBillDetails(company, ref);
    BILL_CACHE.set(cacheKey, { data: billData, cachedAt: Date.now() });

    return NextResponse.json(
      {
        success: true,
        data: billData,
        disclaimer: 'This bill information is provided for user convenience from public portals.',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=43200, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    const officialPortalUrl = error instanceof BillFetchError
      ? error.officialPortalUrl
      : getOfficialPortalDirectUrl(company || 'LESCO', ref || '');

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch live bill details from portal.',
        messageUrdu: 'سرور سے لائیو ڈیٹا حاصل نہیں ہو سکا۔ سرکاری پورٹل پر اپنا اصل بل دیکھنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔',
        officialPortalUrl,
        company,
        referenceNumber: ref,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
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

    // ── Check Server-side In-Memory Cache (0 Compute Cost) ────────────────────
    const cacheKey = getCacheKey(company, query);
    const cached = BILL_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return NextResponse.json(
        {
          success: true,
          data: cached.data,
          cached: true,
          disclaimer: 'Served from high-speed cache. PakBill Hub has no official affiliation with utility providers.',
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=43200, max-age=3600, stale-while-revalidate=86400',
          },
        }
      );
    }

    const billData = await fetchBillDetails(company, query, body.searchType);
    BILL_CACHE.set(cacheKey, { data: billData, cachedAt: Date.now() });

    return NextResponse.json(
      {
        success: true,
        data: billData,
        disclaimer: 'This bill information is provided for user convenience from public portals. PakBill Hub has no official affiliation with the government or utility providers.',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=43200, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
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
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

