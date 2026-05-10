import { NextResponse } from 'next/server'
import { createSession, setSessionCookie } from '@/lib/auth'

export async function POST(request: Request) {
	const { password } = await request.json()

	if (password !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
	}

	const token = await createSession()
	await setSessionCookie(token)
	return NextResponse.json({ ok: true })
}
