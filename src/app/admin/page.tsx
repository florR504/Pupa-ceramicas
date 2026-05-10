'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setLoading(true)
		setError('')

		const res = await fetch('/api/admin/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password }),
		})

		if (res.ok) {
			router.push('/admin/dashboard')
		} else {
			const data = await res.json()
			setError(data.error ?? 'Error al iniciar sesión')
			setLoading(false)
		}
	}

	return (
		<main className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
			<div className="bg-white rounded-2xl shadow-sm border border-brand-pink/20 p-10 w-full max-w-sm">
				<div className="text-center mb-8">
					<h1 className="text-neutral-dark text-2xl font-bold">Panel de administración</h1>
					<p className="text-neutral-muted text-sm mt-2">Ingresá tu contraseña para continuar</p>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full border border-brand-pink-border rounded-lg px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-muted focus:outline-none focus:border-brand-pink transition-colors"
					/>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-brand-pink text-white rounded-lg py-3 text-sm font-semibold hover:bg-brand-pink/90 transition-colors disabled:opacity-50 cursor-pointer"
					>
						{loading ? 'Ingresando...' : 'Ingresar'}
					</button>
				</form>
			</div>
		</main>
	)
}
