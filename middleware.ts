// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwt(token: string) {
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
const HOME_BASE_REGEX = /^\/[^/]+\/home$/;
// const NOT_FOUND_ROUTE = '/not-found';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;
  const isAuthFree = AUTH_FREE_ROUTES.includes(pathname);

  // --------- CASE 1: NO TOKEN → USER MUST LOGIN ----------
  if (!token && !isAuthFree) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // --------- CASE 2: HAS TOKEN ----------
  if (token) {
    const payload = decodeJwt(token);

    // token hỏng -> remove + login
    // if (!payload) {
    //   const resp = NextResponse.redirect(new URL('/login', req.url));
    //   resp.cookies.delete('accessToken');
    //   return resp;
    // }

    // hết hạn -> remove + login
    // if (payload.exp && Date.now() / 1000 > payload.exp) {
    //   const resp = NextResponse.redirect(new URL('/login', req.url));
    //   resp.cookies.delete('accessToken');
    //   return resp;
    // }

    // user đã login → chặn vào /login, /register, ...
    if (isAuthFree) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // --------- ROLE CHECKS ----------
    const role = payload.role;

    // 1. /admin/** → chỉ admin
    if (pathname.startsWith(ADMIN_PREFIX) && role !== 'admin') {
      return NextResponse.redirect(new URL('/401', req.url));
    }

    // 2. /{workspace}/home → nếu không phải admin thì redirect đến overview
    if (HOME_BASE_REGEX.test(pathname) && role !== 'admin') {
      return NextResponse.redirect(new URL(pathname + '/overview', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
