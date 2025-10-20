// lib/cookieUtils.js
import { parse } from 'cookie';

// Client-side helper (reads document.cookie). Use only in browser code.
export function getCookieClient(name) {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return match ? decodeURIComponent(match[2]) : undefined;
}

// Server-side helper: parse cookie header from Request
export function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return parse(cookieHeader || '');
}

// Small helper to get role on server
export function getRoleFromServerRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  return cookies.role;
}
