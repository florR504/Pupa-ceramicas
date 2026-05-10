import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)
const COOKIE = 'pupa_admin'

export async function createSession(): Promise<string> {
	return new SignJWT({ role: 'admin' })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('7d')
		.sign(secret)
}

export async function verifySession(token: string): Promise<boolean> {
	try {
		await jwtVerify(token, secret)
		return true
	} catch {
		return false
	}
}

export async function getSessionToken(): Promise<string | undefined> {
	const store = await cookies()
	return store.get(COOKIE)?.value
}

export async function isAuthenticated(): Promise<boolean> {
	const token = await getSessionToken()
	if (!token) return false
	return verifySession(token)
}

export async function setSessionCookie(token: string): Promise<void> {
	const store = await cookies()
	store.set(COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
	})
}

export async function clearSessionCookie(): Promise<void> {
	const store = await cookies()
	store.set(COOKIE, '', { maxAge: 0, path: '/' })
}
