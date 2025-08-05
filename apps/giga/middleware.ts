import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  // const dev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
  const dev = true; // For testing purposes, set to true

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
    dev ? "'unsafe-eval'" : ''
  };
    script-src-elem 'self' 'nonce-${nonce}' ${dev ? "'unsafe-inline'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    connect-src 'self' http: https: ws: wss:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
    .replace(/\n/g, ' ')
    .trim();

  const response = NextResponse.next();

  // Set security headers
  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}
