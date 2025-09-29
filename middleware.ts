// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function decodeJwt(token: string) {
  const payload = token.split(".")[1]
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
  const json = Buffer.from(base64, "base64").toString("utf-8")
  return JSON.parse(json)
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value
  const { pathname } = req.nextUrl

  // Chặn tất cả route nếu chưa có token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const payload = decodeJwt(token)

    // 1. Check hết hạn
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    const role = payload.role

    // 2. Check cho /admin/**
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/401", req.url))
    }

    // 3. Các route khác (/, /profile, /member, ...) 
    // chỉ cần có token => đã login => ok
  } catch (err) {
    console.error("Invalid token:", err)
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

// Áp dụng cho tất cả route trừ static (login, 403, public assets)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|403).*)"],
}
