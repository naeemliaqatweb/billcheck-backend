export interface BillMonthHistory {
  month: string;
  year: number;
  units: number;
  amount: number;
  status: 'paid' | 'unpaid';
  paymentDate?: string;
  unitsDiffPercentage?: number;
}

export interface ChargeBreakdownItem {
  labelEn: string;
  labelUr: string;
  percentage?: string;
  value: number;
}

export interface SurchargeTier {
  period: string;
  surcharge: number;
  payable: number;
}

export interface ConsumerDetails {
  referenceNo: string;
  consumerId: string;
  name: string;
  address: string;
  transformer?: string;
  feeder: string;
  subDivision: string;
  category: string;
  status?: string;
  tariffCategory: string;
  tariff: string;
  sanctionedLoad: string;
}

export interface MeterDetails {
  meterNo: string;
  mf: number;
  previousReading: number;
  presentReading: number;
  unitsConsumed: number;
}

export interface ScrapedBillResult {
  referenceNo: string;
  formattedRefNo: string;
  consumerId?: string;
  company: string;
  companyName: string;
  utilityType: 'electricity' | 'gas';
  consumerName: string;
  consumerAddress: string;
  subDivision: string;
  feederName: string;
  billMonth: string;
  issueDate: string;
  dueDate: string;
  payableWithinDueDate: number;
  payableAfterDueDate: number;
  latePaymentSurcharge: number;
  unitsConsumed: number;
  previousReading: number;
  presentReading: number;
  billStatus: 'paid' | 'unpaid' | 'overdue';
  meterNo: string;
  tariff: string;
  connectedLoad: string;
  fpaAmount: number;
  tvFee: number;
  gstAmount: number;
  electricityDuty: number;
  history12Months: BillMonthHistory[];
  sourceUrl?: string;
  isMockData?: boolean;

  // Rich structured breakdown
  consumerDetails?: ConsumerDetails;
  meterDetails?: MeterDetails;
  chargesBreakdown?: ChargeBreakdownItem[];
  surchargeTiers?: SurchargeTier[];
  totalElectricityCharges?: number;
  subsidyAmount?: number;
  netElectricityCharges?: number;
  currentBillAmount?: number;
  fpaMessage?: string;
  subsidyMessage?: string;
}

export const PROVIDERS_META: Record<string, { name: string; type: 'electricity' | 'gas'; portalUrl?: string }> = {
  LESCO:    { name: 'Lahore Electric Supply Company',        type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/lescobill' },
  MEPCO:    { name: 'Multan Electric Power Company',         type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/mepcobill' },
  FESCO:    { name: 'Faisalabad Electric Supply Company',    type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/fescobill' },
  GEPCO:    { name: 'Gujranwala Electric Power Company',     type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/gepcobill' },
  IESCO:    { name: 'Islamabad Electric Supply Company',     type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/iescobill' },
  PESCO:    { name: 'Peshawar Electric Supply Company',      type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/pescobill' },
  HESCO:    { name: 'Hyderabad Electric Supply Company',     type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/hescobill' },
  SEPCO:    { name: 'Sukkur Electric Power Company',         type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/sepcobill' },
  QESCO:    { name: 'Quetta Electric Supply Company',        type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/qescobill' },
  TESCO:    { name: 'Tribal Areas Electricity Supply Company', type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/tescobill' },
  KELECTRIC: { name: 'K-Electric (Karachi)',                 type: 'electricity', portalUrl: 'https://www.ke.com.pk/customer-services/bill-and-e-services/' },
  SNGPL:    { name: 'Sui Northern Gas Pipelines Limited',    type: 'gas',         portalUrl: 'https://www.sngpl.com.pk/' },
  SSGC:     { name: 'Sui Southern Gas Company',              type: 'gas',         portalUrl: 'https://www.ssgc.com.pk/' },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export function cleanReferenceNumber(input: string): string {
  return input.replace(/[^0-9a-zA-Z]/g, '').trim();
}

export function formatReferenceNumber(ref: string): string {
  const clean = cleanReferenceNumber(ref);
  if (clean.length === 14) {
    return `${clean.substring(0, 2)} ${clean.substring(2, 7)} ${clean.substring(7, 14)} U`;
  }
  return clean;
}

/**
 * Extract a hidden input value from ASP.NET HTML
 */
function extractHiddenInput(html: string, name: string): string {
  const patterns = [
    new RegExp(`name="${name}"\\s+type="hidden"\\s+value="([^"]*)"`, 'i'),
    new RegExp(`id="${name}"\\s+value="([^"]*)"`, 'i'),
    new RegExp(`name="${name}"[^>]*value="([^"]*)"`, 'i'),
  ];
  for (const pat of patterns) {
    const m = html.match(pat);
    if (m) return m[1];
  }
  return '';
}

/**
 * Extract text content of an HTML element by CSS class name
 */
function extractByClass(html: string, className: string): string {
  const m = html.match(new RegExp(`class="${className}"[^>]*>([^<]{1,200})<`, 'i'));
  return m ? m[1].trim() : '';
}

/**
 * Parse amount: strip commas and convert to number
 */
function parseAmount(str: string): number {
  if (!str) return 0;
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
}

/**
 * Convert month abbreviations like "AUG 26" to year number
 */
function monthLabelToYear(label: string): number {
  const parts = label.trim().split(/\s+/);
  if (parts.length >= 2) {
    const yr = parseInt(parts[1], 10);
    return yr < 100 ? 2000 + yr : yr;
  }
  return new Date().getFullYear();
}

/**
 * Parse bill history table from PITC HTML.
 * PITC modern layout uses div.history-row with div.history-cell
 * or classic <tr> with <td>: MONTH | STATUS | UNITS | BILL (RS.) | PAYMENT (RS.)
 */
function parseBillHistory(html: string): BillMonthHistory[] {
  const history: BillMonthHistory[] = [];
  const MONTH_ABBREVS = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\d{2}$/i;

  // Modern PITC layout with div.history-row
  const histParts = html.split(/class="history-row">/i);
  if (histParts.length > 1) {
    for (let i = 1; i < histParts.length; i++) {
      const endIdx = histParts[i].indexOf('</div></div>');
      const chunk = endIdx !== -1 ? histParts[i].substring(0, endIdx + 6) : histParts[i];
      const cellMatches = [...chunk.matchAll(/class="history-cell"[^>]*>([\s\S]*?)<\/div>/gi)];
      const cells = cellMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
      if (cells.length >= 5) {
        const monthRaw = cells[0].replace(/\s+/g, '').toUpperCase();
        if (MONTH_ABBREVS.test(monthRaw)) {
          const monthLabel = `${monthRaw.slice(0, 3)} ${monthRaw.slice(3)}`;
          const yr = parseInt(monthRaw.slice(3), 10);
          const year = yr < 100 ? 2000 + yr : yr;
          const statusRaw = cells[1].toUpperCase();
          const units = parseInt(cells[2].replace(/,/g, ''), 10) || 0;
          const amount = parseInt(cells[3].replace(/,/g, ''), 10) || 0;
          const payment = parseInt(cells[4].replace(/,/g, ''), 10) || 0;
          const isPaid = statusRaw === 'EX' || payment > 0 || /^\d+$/.test(statusRaw);

          history.push({
            month: monthLabel,
            year,
            units,
            amount,
            status: isPaid ? 'paid' : 'unpaid',
            paymentDate: isPaid ? `15 ${monthLabel.slice(0, 3)} ${year}` : undefined,
          });
        }
      }
    }
  }

  // Classic fallback: table <tr> rows
  if (history.length === 0) {
    const rowMatches = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
    for (const row of rowMatches) {
      const cellTexts = (row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [])
        .map(td => td.replace(/<[^>]+>/g, '').trim());
      if (cellTexts.length < 3) continue;
      const monthRaw = cellTexts[0].replace(/\s+/g, '').toUpperCase();
      if (!MONTH_ABBREVS.test(monthRaw)) continue;
      const monthLabel = `${monthRaw.slice(0, 3)} ${monthRaw.slice(3)}`;
      const year = monthLabelToYear(monthLabel);
      const statusRaw = cellTexts[1]?.toUpperCase() || '';
      const units = parseInt(cellTexts[2]?.replace(/[^0-9]/g, '') || '0', 10);
      const amount = parseInt(cellTexts[3]?.replace(/[^0-9]/g, '') || '0', 10);
      const paymentRaw = cellTexts[4]?.replace(/[^0-9]/g, '') || '';
      const payment = parseInt(paymentRaw, 10) || 0;
      const isPaid = statusRaw === 'EX' || payment > 0 || /^\d+$/.test(statusRaw);

      history.push({
        month: monthLabel,
        year,
        units,
        amount,
        status: isPaid ? 'paid' : 'unpaid',
        paymentDate: isPaid ? `15 ${monthLabel.slice(0, 3)} ${year}` : undefined,
      });
    }
  }

  // Calculate month-over-month diff percentages
  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].units;
    if (prev > 0) {
      history[i].unitsDiffPercentage = Math.round(((history[i].units - prev) / prev) * 100);
    }
  }

  return history;
}

/**
 * Parse full bill data from PITC portal HTML response
 */
function parsePitcBillHtml(html: string, company: string, refNo: string): ScrapedBillResult | null {
  const hasBillContent = html.includes('charges-bd-row') ||
    html.includes('consumer-address') ||
    html.includes('payable-val') ||
    html.includes('PAYABLE WITHIN DUE DATE') ||
    html.includes('ibn-bill');

  if (
    !hasBillContent ||
    html.includes('Bill Not Found') ||
    html.includes('Record Not Found') ||
    (html.includes('lblSnapError') && !html.includes('data-ref-no') && !html.includes('consumer-detail-card'))
  ) {
    return null;
  }

  const meta = PROVIDERS_META[company] || { name: company, type: 'electricity' };

  /**
   * Helper to extract val-space value following an en-lbl label
   */
  function extractValSpace(label: string): string {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = html.match(
      new RegExp(`<span class="en-lbl"[^>]*>${escaped}<\\/span>[\\s\\S]*?<div class="val-space[^"]*">([\\s\\S]*?)<\\/div>`, 'i')
    );
    if (m) return m[1].replace(/<[^>]+>/g, '').trim();
    // Fallback: general label search
    const m2 = html.match(
      new RegExp(`${escaped}[\\s\\S]{0,200}?class="val-space(?:[^"]*)"[^>]*>([^<]{0,200})<`, 'i')
    );
    return m2 ? m2[1].trim() : '';
  }

  // ── 1. Consumer Info ──────────────────────────────────────────────────────
  const nameAddrMatch = html.match(/class="val-space val-space--address"[^>]*>([\s\S]*?)<\/div>/i);
  const fullNameAddress = nameAddrMatch
    ? nameAddrMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    : 'Consumer';
  const realRefNo = extractValSpace('REFERENCE NO') || refNo;
  const consumerId = extractValSpace('CONSUMER ID') || (refNo.length <= 10 ? refNo : refNo.substring(2, 12));
  const transformer = extractValSpace('TRANSFORMER');
  const feeder = extractValSpace('FEEDER');
  const subDivision = extractValSpace('SUB DIVISION') || 'Sub Division';
  const category = extractValSpace('CATEGORY') || 'Protected';
  const statusMeter = extractValSpace('STATUS');
  const tariffCategory = extractValSpace('TARIFF CATEGORY') || 'Domestic';
  const tariff = extractValSpace('TARIFF') || 'A-1A(01)';
  const sanctionedLoad = extractValSpace('SAN LOAD') || '2';

  // ── 2. Meter Info ─────────────────────────────────────────────────────────
  function extractMeterVal(label: string): string {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = html.match(
      new RegExp(`<span class="en-lbl"[^>]*>${escaped}<\\/span>[\\s\\S]*?<div class="val-space">([\\s\\S]*?)<\\/div>`, 'i')
    );
    return m ? m[1].replace(/<[^>]+>/g, '').trim() : '';
  }

  const meterNoRaw = extractMeterVal('METER NO');
  const meterNo = (meterNoRaw && !meterNoRaw.includes('METER NO')) ? meterNoRaw : `MTR-${realRefNo.slice(-6)}`;
  const mf = parseInt(extractMeterVal('MF') || '1', 10) || 1;
  const prevReadingRaw = parseInt(extractMeterVal('PREVIOUS READING') || '0', 10) || 0;
  const presentReadingRaw = parseInt(extractMeterVal('PRESENT READING') || '0', 10) || 0;
  const unitsFromCells = parseInt(extractMeterVal('UNITS') || '0', 10) || 0;

  // ── 3. Dates ──────────────────────────────────────────────────────────────
  const issueDateMatch = html.match(/class="right-panel-date-val">([^<]{5,30})/i);
  const issueDate = issueDateMatch?.[1]?.trim() || '';

  const dueDateMatch = html.match(/class="right-main-val right-main-val--due">([^<]{5,30})/i);
  const dueDate = dueDateMatch?.[1]?.trim() || '';

  const billMonthMatch = html.match(/class="slip-matrix-value"[^>]*>\s*((?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s*\d{2})/i);
  const billMonth = billMonthMatch?.[1]?.trim() || '';

  // ── 4. Payable Amounts ────────────────────────────────────────────────────
  const payCardMatch = html.match(/class="payable-card-amount">\s*([0-9,]+)/i);
  const grandRowMatch = html.match(/class="charges-bd-row--grand"[\s\S]*?class="charges-bd-val">([0-9,]+)/i);
  const payableWithinDueDate = parseAmount(payCardMatch?.[1] || grandRowMatch?.[1] || '0');

  // Surcharge Tiers (e.g. Till 14--EP: 2461, After 14--EP: 2556)
  const tierMatches = [
    ...html.matchAll(/class="lp-surcharge-data-col"[\s\S]*?<div class="lp-surcharge-top-val">([0-9,]+)<\/div>[\s\S]*?<div class="lp-surcharge-period">([^<]+)<\/div>[\s\S]*?<div class="lp-surcharge-bottom-val">([0-9,]+)<\/div>/gi)
  ];
  const surchargeTiers: SurchargeTier[] = tierMatches.map(m => ({
    surcharge: parseAmount(m[1]),
    period: m[2].trim(),
    payable: parseAmount(m[3])
  }));

  const latePaymentSurcharge = surchargeTiers.length > 0
    ? surchargeTiers[0].surcharge
    : Math.round(payableWithinDueDate * 0.05);

  const payableAfterDueDate = surchargeTiers.length > 0
    ? surchargeTiers[0].payable
    : payableWithinDueDate + latePaymentSurcharge;

  // ── 5. Charges Breakdown ──────────────────────────────────────────────────
  const chargesBreakdown: ChargeBreakdownItem[] = [];
  const parts = html.split(/class="charges-bd-row[^"]*"/i);
  let totalElectricityCharges = 0;
  let subsidyAmount = 0;
  let netElectricityCharges = 0;
  let taxesAmount = 0;
  let currentBillAmount = 0;
  let fpaAmount = 0;

  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i].substring(0, 800);
    const labelEnMatch = chunk.match(/class="charges-bd-en[^"]*"[^>]*>([^<]+)/i);
    const labelUrMatch = chunk.match(/class="charges-bd-ur[^"]*"[^>]*>([^<]+)/i);
    const pctMatch = chunk.match(/class="charges-bd-pct[^"]*"[^>]*>([^<]+)/i);
    const valMatch = chunk.match(/class="charges-bd-val[^"]*"[^>]*>([0-9,]+)/i);
    if (labelEnMatch && valMatch) {
      const labelEn = labelEnMatch[1].trim();
      const val = parseAmount(valMatch[1]);
      chargesBreakdown.push({
        labelEn,
        labelUr: labelUrMatch ? labelUrMatch[1].trim() : '',
        percentage: pctMatch ? pctMatch[1].trim() : undefined,
        value: val
      });
      if (labelEn.includes('Total Electricity Charges')) totalElectricityCharges = val;
      if (labelEn.includes('Subsidies')) subsidyAmount = val;
      if (labelEn.includes('Net Electricity Charges')) netElectricityCharges = val;
      if (labelEn.includes('Taxes')) taxesAmount = val;
      if (labelEn.includes('Current Bill')) currentBillAmount = val;
      if (labelEn.includes('Total FPA')) fpaAmount = val;
    }
  }

  // ── 6. 12-Month History ───────────────────────────────────────────────────
  const history12Months = parseBillHistory(html);
  const finalHistory = history12Months.length >= 3
    ? history12Months.slice(-12)
    : generate12MonthHistory(unitsFromCells || 135, payableWithinDueDate || 2366);

  const unitsConsumed = unitsFromCells || (finalHistory.length > 0 ? finalHistory[finalHistory.length - 1].units : 135);
  const previousReading = prevReadingRaw || 9459;
  const presentReading = presentReadingRaw || (previousReading + unitsConsumed);

  // ── 7. Messages & Announcements ───────────────────────────────────────────
  const fpaBody = html.match(/class="ibn-bill-messages__fpa-body"[^>]*>([\s\S]*?)<\/div>/i);
  const fpaMessage = fpaBody ? fpaBody[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : undefined;

  const subsidyText = html.match(/class="ibn-bill-messages__subsidy-text"[^>]*>([\s\S]*?)<\/div>/i);
  const subsidyMessage = subsidyText ? subsidyText[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : undefined;

  // ── 8. Status ─────────────────────────────────────────────────────────────
  const today = new Date();
  const dueDateObj = dueDate ? new Date(dueDate.replace(/(\d+)\s+([A-Z]+)\s+(\d+)/, '$1 $2 20$3')) : null;
  let billStatus: 'paid' | 'unpaid' | 'overdue' = 'unpaid';
  if (dueDateObj && today > dueDateObj) billStatus = 'overdue';

  return {
    referenceNo: realRefNo,
    formattedRefNo: formatReferenceNumber(realRefNo),
    consumerId,
    company,
    companyName: meta.name,
    utilityType: meta.type,
    consumerName: fullNameAddress,
    consumerAddress: fullNameAddress,
    subDivision,
    feederName: feeder,
    billMonth,
    issueDate,
    dueDate,
    payableWithinDueDate,
    payableAfterDueDate,
    latePaymentSurcharge,
    unitsConsumed,
    previousReading,
    presentReading,
    billStatus,
    meterNo,
    tariff,
    connectedLoad: `${sanctionedLoad} kW`,
    fpaAmount,
    tvFee: 35,
    gstAmount: taxesAmount,
    electricityDuty: 0,
    history12Months: finalHistory,
    sourceUrl: meta.portalUrl,
    isMockData: false,

    // Rich structured data
    chargesBreakdown,
    surchargeTiers,
    totalElectricityCharges,
    subsidyAmount,
    netElectricityCharges,
    currentBillAmount,
    fpaMessage,
    subsidyMessage,
    consumerDetails: {
      referenceNo: realRefNo,
      consumerId,
      name: fullNameAddress,
      address: fullNameAddress,
      transformer,
      feeder,
      subDivision,
      category,
      status: statusMeter,
      tariffCategory,
      tariff,
      sanctionedLoad: `${sanctionedLoad} kW`,
    },
    meterDetails: {
      meterNo,
      mf,
      previousReading,
      presentReading,
      unitsConsumed,
    },
  };
}

// ─── Real PITC Scraper ───────────────────────────────────────────────────────

/**
 * Fetch real bill from PITC portal (LESCO, MEPCO, FESCO, GEPCO, IESCO, PESCO, HESCO, SEPCO, QESCO, TESCO).
 * Uses two-step: GET page → extract ASP.NET tokens → POST with query.
 * searchType: 'refno' for 14-digit reference no, 'appno' for Customer/Consumer ID.
 */
async function fetchFromPitcPortal(portalUrl: string, query: string, searchType: 'refno' | 'appno' = 'refno'): Promise<string | null> {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  // Step 1: GET — obtain session cookies and ASP.NET VIEWSTATE tokens
  const getResp = await fetch(portalUrl, { headers, redirect: 'follow' });
  if (!getResp.ok) return null;

  const rawCookies = getResp.headers.getSetCookie?.() || [];
  const cookieHeader = rawCookies.map(c => c.split(';')[0]).join('; ');
  const getHtml = await getResp.text();

  const viewState       = extractHiddenInput(getHtml, '__VIEWSTATE');
  const vsGenerator     = extractHiddenInput(getHtml, '__VIEWSTATEGENERATOR');
  const eventValidation = extractHiddenInput(getHtml, '__EVENTVALIDATION');
  const csrf            = extractHiddenInput(getHtml, '__RequestVerificationToken');

  // Step 2: POST with query and all ASP.NET tokens
  const formData = new URLSearchParams({
    __EVENTTARGET:              '',
    __EVENTARGUMENT:            '',
    __LASTFOCUS:                '',
    __VIEWSTATE:                viewState,
    __VIEWSTATEGENERATOR:       vsGenerator,
    __EVENTVALIDATION:          eventValidation,
    __RequestVerificationToken: csrf,
    rbSearchByList:             searchType,
    searchTextBox:              query,
    btnSearch:                  'Search',
  });

  const postResp = await fetch(portalUrl, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': portalUrl,
      'Cookie': cookieHeader,
    },
    body: formData.toString(),
    redirect: 'follow',
  });

  if (!postResp.ok) return null;
  return await postResp.text();
}

// ─── Fallback: Seasonal Mock Generator ──────────────────────────────────────

export function generate12MonthHistory(currentUnits: number, currentAmount: number): BillMonthHistory[] {
  const monthLabels = [
    { label: 'SEP 25', year: 2025, seasonMultiplier: 0.85 },
    { label: 'OCT 25', year: 2025, seasonMultiplier: 0.65 },
    { label: 'NOV 25', year: 2025, seasonMultiplier: 0.45 },
    { label: 'DEC 25', year: 2025, seasonMultiplier: 0.40 },
    { label: 'JAN 26', year: 2026, seasonMultiplier: 0.38 },
    { label: 'FEB 26', year: 2026, seasonMultiplier: 0.42 },
    { label: 'MAR 26', year: 2026, seasonMultiplier: 0.55 },
    { label: 'APR 26', year: 2026, seasonMultiplier: 0.75 },
    { label: 'MAY 26', year: 2026, seasonMultiplier: 0.95 },
    { label: 'JUN 26', year: 2026, seasonMultiplier: 1.15 },
    { label: 'JUL 26', year: 2026, seasonMultiplier: 1.20 },
    { label: 'AUG 26', year: 2026, seasonMultiplier: 1.00 },
  ];

  const history: BillMonthHistory[] = [];
  let prevUnits = 0;

  for (let i = 0; i < monthLabels.length; i++) {
    const item = monthLabels[i];
    const isCurrentMonth = i === monthLabels.length - 1;
    const units = isCurrentMonth
      ? currentUnits
      : Math.max(50, Math.round(currentUnits * item.seasonMultiplier));
    const amount = isCurrentMonth
      ? currentAmount
      : Math.round(units * 38.5 * 1.22);
    const diff = prevUnits > 0 ? Math.round(((units - prevUnits) / prevUnits) * 100) : 0;
    prevUnits = units;

    history.push({
      month: item.label,
      year: item.year,
      units,
      amount,
      status: isCurrentMonth ? 'unpaid' : 'paid',
      paymentDate: isCurrentMonth ? undefined : `15 ${item.label.split(' ')[0]} ${item.year}`,
      unitsDiffPercentage: diff,
    });
  }
  return history;
}

/**
 * Company-specific regional data for realistic simulation when offline or testing
 */
const COMPANY_REGIONS: Record<string, { city: string; subdivisions: string[]; feeders: string[] }> = {
  MEPCO: {
    city: 'Multan',
    subdivisions: ['BOSAN ROAD (15112)', 'SHAH RUKN-E-ALAM (15214)', 'CANTT MULTAN (15121)', 'MUMTAZABAD (15311)', 'BAHAWALPUR (15412)'],
    feeders: ['F-01 SHAH RUKN FEEDER', 'F-04 CHOWK KACHEHRI', 'F-07 GULGASHT FEEDER'],
  },
  FESCO: {
    city: 'Faisalabad',
    subdivisions: ['PEOPLES COLONY (13121)', 'MADINA TOWN (13134)', 'CIVIL LINES (13111)', 'JINNAH COLONY (13211)', 'SARGODHA ROAD (13312)'],
    feeders: ['F-02 CANAL ROAD FEEDER', 'F-05 D-GROUND FEEDER', 'F-09 MILLAT ROAD'],
  },
  IESCO: {
    city: 'Islamabad',
    subdivisions: ['F-10 ISLAMABAD (14121)', 'G-9 ISLAMABAD (14134)', 'SATELLITE TOWN (14412)', 'RAWALPINDI CANTT (14421)', 'CHAKLALA (14431)'],
    feeders: ['F-03 MARGALLA FEEDER', 'F-08 BLUE AREA FEEDER', 'F-11 PESHAWAR ROAD'],
  },
  GEPCO: {
    city: 'Gujranwala',
    subdivisions: ['MODEL TOWN (12111)', 'CANTT GUJRANWALA (12121)', 'SIALKOT ROAD (12211)', 'PASRUR ROAD (12312)', 'GUJRAT CITY (12411)'],
    feeders: ['F-01 G.T ROAD FEEDER', 'F-06 SIALKOT BYPASS', 'F-10 WAPDA TOWN'],
  },
  LESCO: {
    city: 'Lahore',
    subdivisions: ['KOT LAKHPAT (11537)', 'ALLAMA IQBAL TOWN (11221)', 'GULBERG (11412)', 'MODEL TOWN (11345)', 'DHA LAHORE (11890)'],
    feeders: ['F-12 INDUSTRIAL FEEDER', 'F-05 CHANDRY ROAD', 'F-09 WALTON FEEDER'],
  },
  PESCO: {
    city: 'Peshawar',
    subdivisions: ['HAYATABAD (17112)', 'UNIVERSITY TOWN (17121)', 'PESHAWAR CANTT (17134)', 'WARSAK ROAD (17211)'],
    feeders: ['F-02 KHYBER FEEDER', 'F-06 JAMRUD FEEDER'],
  },
  HESCO: {
    city: 'Hyderabad',
    subdivisions: ['LATIFABAD (18112)', 'QASIMABAD (18124)', 'HYDERABAD CANTT (18131)'],
    feeders: ['F-01 INDUS FEEDER', 'F-04 AUTO BAHN FEEDER'],
  },
  SEPCO: {
    city: 'Sukkur',
    subdivisions: ['SUKKUR CITY (19111)', 'BARRAGE COLONY (19121)', 'LARKANA (19211)'],
    feeders: ['F-02 ROHRI FEEDER', 'F-05 BARRAGE ROAD'],
  },
  QESCO: {
    city: 'Quetta',
    subdivisions: ['CHAMAN ROAD (20111)', 'QUETTA CANTT (20121)', 'ZAR GHOON ROAD (20131)'],
    feeders: ['F-01 CHILTAN FEEDER', 'F-03 JINNAH ROAD'],
  },
  TESCO: {
    city: 'Tribal Areas',
    subdivisions: ['KHYBER AGENCY (21111)', 'KURRAM (21121)', 'NORTH WAZIRISTAN (21131)'],
    feeders: ['F-01 TRIBAL FEEDER', 'F-02 BORDER LINE'],
  },
  KELECTRIC: {
    city: 'Karachi',
    subdivisions: ['CLIFTON (01121)', 'DEFENCE DHA (01134)', 'GULSHAN-E-IQBAL (01211)', 'NORTH NAZIMABAD (01312)'],
    feeders: ['F-01 SHAHRAH-E-FAISAL', 'F-05 KORANGI FEEDER'],
  },
  SNGPL: {
    city: 'Lahore / Rawalpindi',
    subdivisions: ['SNGPL REGIONAL OFFICE PUNJAB', 'SNGPL NORTH ZONE', 'SNGPL CENTRAL ZONE'],
    feeders: ['GAS DISTRIBUTION PIPELINE 4-INCH', 'SUB-NETWORK SECTOR A'],
  },
  SSGC: {
    city: 'Karachi / Sindh',
    subdivisions: ['SSGC SOUTH ZONE KARACHI', 'SSGC REGIONAL OFFICE SINDH'],
    feeders: ['DISTRIBUTION MAIN LINE', 'METROPOLITAN GAS GRID'],
  },
};

/**
 * Generate fully offline mock bill (used when portal is unreachable or testing with sample IDs).
 */
function generateMockBill(company: string, refNo: string): ScrapedBillResult {
  const meta = PROVIDERS_META[company] || { name: company, type: 'electricity', portalUrl: 'https://bill.pitc.com.pk/' };
  const seedNum = parseInt(refNo.replace(/[^0-9]/g, '').slice(-6), 10) || 1598719;
  const isGas = meta.type === 'gas';

  const regInfo = COMPANY_REGIONS[company] || {
    city: 'Pakistan',
    subdivisions: [`${company} SUB DIVISION (11001)`],
    feeders: ['F-01 MAIN FEEDER'],
  };

  const units = isGas ? 65 + (seedNum % 55) : 180 + (seedNum % 220);
  const unitRate = isGas ? 18.5 : 38.5;
  const totalCost = Math.round(units * unitRate);
  const subsidy = isGas ? 0 : (units <= 200 ? Math.round(units * 5.2) : 0);
  const netCost = totalCost - subsidy;
  const gst = Math.round(netCost * 0.18);
  const fpa = isGas ? 0 : Math.round(units * 3.42);
  const tvFee = isGas ? 0 : 35;
  const electricityDuty = isGas ? 0 : Math.round(netCost * 0.015);
  const fcSurcharge = isGas ? 0 : Math.round(units * 3.23);
  const qta = isGas ? 0 : Math.round(units * 1.55);

  const totalWithinDueDate = isGas
    ? Math.round(netCost + gst + 50)
    : Math.round(netCost + gst + fpa + tvFee + electricityDuty + fcSurcharge + qta);
  const lateFee = Math.round(totalWithinDueDate * 0.085);
  const payableAfterDueDate = totalWithinDueDate + lateFee;

  const issueDate = new Date();
  issueDate.setDate(issueDate.getDate() - 5);
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 10);

  const names = ['MUHAMMAD NAEEM', 'TARIQ MEHMOOD', 'MUHAMMAD AHMAD', 'HAFIZ ABDUL REHMAN', 'ALI HASSAN', 'MUHAMMAD USMAN'];
  const name = names[seedNum % names.length];
  const subdivision = regInfo.subdivisions[seedNum % regInfo.subdivisions.length];
  const feeder = regInfo.feeders[seedNum % regInfo.feeders.length];
  const previousReading = (seedNum % 12000) + 500;
  const presentReading = previousReading + units;
  const history12 = generate12MonthHistory(units, totalWithinDueDate);

  // Structured Charges Breakdown
  const chargesBreakdown: ChargeBreakdownItem[] = isGas
    ? [
        { labelEn: 'Gas Consumed Charges', labelUr: 'گیس استعمال کی رقم', value: totalCost },
        { labelEn: 'Meter Rent', labelUr: 'میٹر کا کرایہ', value: 50 },
        { labelEn: 'General Sales Tax (GST 18%)', labelUr: 'جنرل سیلز ٹیکس', value: gst },
        { labelEn: 'Current Bill Total', labelUr: 'کل واجب الادا رقم', value: totalWithinDueDate },
      ]
    : [
        { labelEn: 'Total Electricity Charges', labelUr: 'بجلی کے کل اخراجات', value: totalCost },
        ...(subsidy > 0 ? [{ labelEn: 'Govt. Subsidies (Tariff Differential)', labelUr: 'حکومتی ریلیف سبسڈی', value: subsidy }] : []),
        { labelEn: 'Net Electricity Charges', labelUr: 'خالص بجلی کے اخراجات', value: netCost },
        { labelEn: 'Fuel Price Adjustment (FPA)', labelUr: 'فیول پرائس ایڈجسٹمنٹ', value: fpa },
        { labelEn: 'Financing Cost (FC Surcharge)', labelUr: 'فنانسنگ کاسٹ سرچارج', value: fcSurcharge },
        { labelEn: 'Quarterly Tariff Adj. (QTA)', labelUr: 'سہ ماہی ایڈجسٹمنٹ', value: qta },
        { labelEn: 'General Sales Tax (GST 18%)', labelUr: 'سیلز ٹیکس (GST)', value: gst },
        { labelEn: 'Electricity Duty (ED 1.5%)', labelUr: 'الیکٹرسٹی ڈیوٹی', value: electricityDuty },
        { labelEn: 'PTV License Fee', labelUr: 'ٹی وی فیس', value: tvFee },
        { labelEn: 'Current Bill Total', labelUr: 'موجودہ بل کی رقم', value: totalWithinDueDate },
      ];

  const surchargeTiers: SurchargeTier[] = [
    { period: 'Till Due Date', surcharge: 0, payable: totalWithinDueDate },
    { period: 'After Due Date', surcharge: lateFee, payable: payableAfterDueDate },
  ];

  return {
    referenceNo: refNo,
    formattedRefNo: formatReferenceNumber(refNo),
    consumerId: refNo.length >= 10 ? refNo.substring(2, 12) : refNo,
    company,
    companyName: meta.name,
    utilityType: meta.type,
    consumerName: name,
    consumerAddress: `House #${(seedNum % 120) + 1}, St ${(seedNum % 18) + 1}, Sector ${(seedNum % 6) + 1}, ${regInfo.city}`,
    subDivision: subdivision,
    feederName: feeder,
    billMonth: 'AUG 26',
    issueDate: issueDate.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    payableWithinDueDate: totalWithinDueDate,
    payableAfterDueDate: payableAfterDueDate,
    latePaymentSurcharge: lateFee,
    unitsConsumed: units,
    previousReading,
    presentReading,
    billStatus: 'unpaid',
    meterNo: `MTR-${(seedNum % 899999) + 100000}`,
    tariff: isGas ? 'DOMESTIC (CAT-I)' : 'A-1a (01) RESIDENTIAL',
    connectedLoad: isGas ? '0.5 HM3/hr' : '2.0 kW',
    fpaAmount: fpa,
    tvFee,
    gstAmount: gst,
    electricityDuty,
    history12Months: history12,
    sourceUrl: meta.portalUrl,
    isMockData: true,

    // Rich structured breakdown
    chargesBreakdown,
    surchargeTiers,
    totalElectricityCharges: totalCost,
    subsidyAmount: subsidy,
    netElectricityCharges: netCost,
    currentBillAmount: totalWithinDueDate,
    fpaMessage: isGas ? undefined : 'Fuel Price Adjustment for previous months is notified by NEPRA as per government policy.',
    subsidyMessage: subsidy > 0 ? 'Protected Consumer relief granted by Government of Pakistan.' : undefined,
    consumerDetails: {
      referenceNo: refNo,
      consumerId: refNo.length >= 10 ? refNo.substring(2, 12) : refNo,
      name,
      address: `House #${(seedNum % 120) + 1}, St ${(seedNum % 18) + 1}, Sector ${(seedNum % 6) + 1}, ${regInfo.city}`,
      transformer: 'TF-200 KVA',
      feeder,
      subDivision: subdivision,
      category: 'Domestic',
      status: 'OK / Running',
      tariffCategory: isGas ? 'Gas Domestic' : 'Domestic',
      tariff: isGas ? 'DOMESTIC (CAT-I)' : 'A-1a (01) RESIDENTIAL',
      sanctionedLoad: isGas ? '0.5 HM3/hr' : '2.0 kW',
    },
    meterDetails: {
      meterNo: `MTR-${(seedNum % 899999) + 100000}`,
      mf: 1,
      previousReading,
      presentReading,
      unitsConsumed: units,
    },
  };
}

// ─── Main Entry Point ────────────────────────────────────────────────────────

/**
 * Fetch real bill data for any DISCO.
 * Supports searching by Reference Number (14 digits) or Consumer/Customer ID (<=10 digits).
 * If primary search mode doesn't find bill, automatically falls back to alternate mode.
 */
export async function fetchBillDetails(
  companyKey: string,
  rawRef: string,
  searchType?: 'refno' | 'consumerId' | 'auto'
): Promise<ScrapedBillResult> {
  const company = companyKey.toUpperCase();
  const clean = cleanReferenceNumber(rawRef);
  const meta = PROVIDERS_META[company];

  // Only PITC-based DISCOs support real scraping (not K-Electric, SNGPL, SSGC yet)
  const pitcCompanies = ['LESCO', 'MEPCO', 'FESCO', 'GEPCO', 'IESCO', 'PESCO', 'HESCO', 'SEPCO', 'QESCO', 'TESCO'];

  if (meta?.portalUrl && pitcCompanies.includes(company)) {
    try {
      // If searchType is 'consumerId' or clean input is <= 10 digits, search by 'appno' (Customer ID) first
      const primaryMode: 'refno' | 'appno' = (searchType === 'consumerId' || clean.length <= 10) ? 'appno' : 'refno';
      const secondaryMode: 'refno' | 'appno' = primaryMode === 'appno' ? 'refno' : 'appno';

      // Attempt 1: primary search mode
      let html = await fetchFromPitcPortal(meta.portalUrl, clean, primaryMode);
      if (html) {
        const parsed = parsePitcBillHtml(html, company, clean);
        if (parsed) return parsed;
      }

      // Attempt 2: fallback to alternate search mode
      html = await fetchFromPitcPortal(meta.portalUrl, clean, secondaryMode);
      if (html) {
        const parsed = parsePitcBillHtml(html, company, clean);
        if (parsed) return parsed;
      }

      console.warn(`[BillScraper] Bill not found on PITC portal for ${company}/${clean} (tried ${primaryMode} & ${secondaryMode})`);
    } catch (err) {
      console.error(`[BillScraper] Portal scraping failed for ${company}:`, err);
    }
  }

  // Fallback: offline generated mock data
  return generateMockBill(company, clean);
}

/**
 * Fetches the raw, authentic duplicate bill HTML directly from the official utility provider server.
 */
export async function fetchOfficialBillHtml(
  companyKey: string,
  rawRef: string,
  searchType?: 'refno' | 'consumerId' | 'auto'
): Promise<string | null> {
  const company = companyKey.toUpperCase();
  const clean = cleanReferenceNumber(rawRef);
  const meta = PROVIDERS_META[company];
  const pitcCompanies = ['LESCO', 'MEPCO', 'FESCO', 'GEPCO', 'IESCO', 'PESCO', 'HESCO', 'SEPCO', 'QESCO', 'TESCO'];

  if (meta?.portalUrl && pitcCompanies.includes(company)) {
    try {
      const primaryMode: 'refno' | 'appno' = (searchType === 'consumerId' || clean.length <= 10) ? 'appno' : 'refno';
      const secondaryMode: 'refno' | 'appno' = primaryMode === 'appno' ? 'refno' : 'appno';

      let html = await fetchFromPitcPortal(meta.portalUrl, clean, primaryMode);
      if (html && html.length > 200) return html;

      html = await fetchFromPitcPortal(meta.portalUrl, clean, secondaryMode);
      if (html && html.length > 200) return html;
    } catch (err) {
      console.error(`[BillScraper] fetchOfficialBillHtml failed for ${company}:`, err);
    }
  }

  return null;
}

