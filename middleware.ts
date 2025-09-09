import { type NextRequest, NextResponse } from 'next/server';

const requests = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const RATE_LIMIT_COUNT = 5; // Max 5 requests per window

export function middleware(request: NextRequest) {
  // Only apply rate limiting to POST requests to /api/checkout
  if (request.method !== 'POST') {
    return NextResponse.next();
  }

  const ip = request.ip ?? '127.0.0.1';

  const now = Date.now();
  const userRequests = requests.get(ip) || [];

  // Filter out requests that are outside the time window
  const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_COUNT) {
    return new NextResponse('Too many requests. Please try again later.', { status: 429 });
  }

  // Add the current request timestamp and update the map
  recentRequests.push(now);
  requests.set(ip, recentRequests);

  return NextResponse.next();
}

export const config = {
  matcher: '/api/checkout',
};
