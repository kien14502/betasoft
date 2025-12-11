// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type JwtPayload = Record<string, any> | null;

function decodeJwt(token: string): JwtPayload {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const AUTH_FREE_ROUTES = ['/login', '/register', '/forgot-pass', '/verify-email'];
const ADMIN_PREFIX = '/admin';
const HOME_BASE_REGEX = /home$/;

function normalizePath(pathname: string) {
  if (pathname.length <= 1) {
    return pathname;
  }
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const normalizedPath = normalizePath(pathname);
  const token = req.cookies.get('accessToken')?.value;
  const isAuthFree = AUTH_FREE_ROUTES.includes(normalizedPath);

  const redirectWithCookieCleanup = (path: string) => {
    const response = NextResponse.redirect(new URL(path, req.url));
    response.cookies.delete('accessToken');
    return response;
  };

  // --------- CASE 1: NO TOKEN -> USER MUST LOGIN ----------
  if (!token && !isAuthFree) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // --------- CASE 2: HAS TOKEN ----------
  if (token) {
    const payload = decodeJwt(token);

    // Drop invalid or expired tokens.
    if (!payload) {
      return redirectWithCookieCleanup('/login');
    }

    const expSeconds = Number(payload.exp);
    if (!Number.isNaN(expSeconds) && Date.now() / 1000 >= expSeconds) {
      return redirectWithCookieCleanup('/login');
    }

    // Logged-in users should not visit auth-free routes.
    if (isAuthFree) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // --------- ROLE CHECKS ----------
    const role = payload.role ?? 'member';
    const isAdmin = role === 'admin';

    // 1. /admin/** is restricted to admins.
    if (normalizedPath.startsWith(ADMIN_PREFIX) && !isAdmin) {
      return NextResponse.redirect(new URL('/401', req.url));
    }

    // 2. Non-admins hitting /{workspace}/home go to overview.
    if (HOME_BASE_REGEX.test(normalizedPath) && !isAdmin) {
      return NextResponse.redirect(new URL(`${normalizedPath}/overview`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
