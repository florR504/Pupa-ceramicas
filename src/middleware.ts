import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)
const COOKIE = 'pupa_admin'

export async function middleware(request: NextRequest) {
	const token = request.cookies.get(COOKIE)?.value

	if (!token) return NextResponse.redirect(new URL('/admin', request.url))

	try {
		await jwtVerify(token, secret)
		return NextResponse.next()
	} catch {
		return NextResponse.redirect(new URL('/admin', request.url))
	}
}

export const config = {
	matcher: ['/admin/dashboard/:path*'],
}
