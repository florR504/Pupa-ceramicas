'use client'

import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
import ReviewCard from './components/ReviewCard'
import StarRating from './components/StarRating'

interface Review {
	_id: string
	reviewer_name: string
	workshop: string
	rating: number
	comment: string
}

const WORKSHOPS = ['Clase de prueba', 'Taller de ceramica', 'Taller KIDS']
const EMPTY_FORM = { reviewer_name: '', workshop: '', rating: 0, comment: '' }

export default function Reviews() {
	const [reviews, setReviews] = useState<Review[]>([])
	const [form, setForm] = useState(EMPTY_FORM)
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')
	const [current, setCurrent] = useState(0)
	const touchStartX = useRef<number | null>(null)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		fetch('/api/reviews')
			.then((r) => r.json())
			.then((data) => setReviews(Array.isArray(data) ? data : []))
			.catch(() => {})
	}, [])

	useEffect(() => {
		if (reviews.length <= 1) return
		intervalRef.current = setInterval(() => {
			setCurrent((c) => (c + 1) % reviews.length)
		}, 3500)
		return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
	}, [reviews.length])

	function goTo(i: number) {
		setCurrent(i)
		if (intervalRef.current) clearInterval(intervalRef.current)
		intervalRef.current = setInterval(() => {
			setCurrent((c) => (c + 1) % reviews.length)
		}, 3500)
	}

	function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX }
	function onTouchEnd(e: React.TouchEvent) {
		if (touchStartX.current === null) return
		const delta = touchStartX.current - e.changedTouches[0].clientX
		if (delta > 40) goTo((current + 1) % reviews.length)
		else if (delta < -40) goTo((current - 1 + reviews.length) % reviews.length)
		touchStartX.current = null
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (form.rating === 0) { setError('Por favor seleccioná una puntuación'); return }
		setSubmitting(true)
		setError('')
		const res = await fetch('/api/reviews', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		})
		if (res.ok) {
			setSubmitted(true)
			setForm(EMPTY_FORM)
		} else {
			const data = await res.json()
			setError(data.error ?? 'Error al enviar la reseña')
		}
		setSubmitting(false)
	}

	const inputCls = "w-full border border-brand-pink-border bg-white rounded-lg px-3 py-2.5 text-sm text-neutral-dark placeholder:text-neutral-muted focus:outline-none focus:border-brand-pink transition-colors"

	return (
		<section id="reseñas" className="flex flex-col md:flex-row">

			{/* Columna izquierda — reseñas */}
			<div className="bg-brand-cream w-full md:w-1/2 px-8 md:px-16 py-20 flex flex-col justify-center gap-10">
				<div className="flex flex-col gap-4">
					<span className="text-brand-pink text-xs font-semibold tracking-[0.4em] uppercase">Reseñas</span>
					<h2 className="text-neutral-dark text-3xl md:text-4xl font-bold leading-[1.2]">
						Lo que dicen<br />nuestros alumnos
					</h2>
				</div>

				{reviews.length === 0 ? (
					<p className="text-neutral-muted text-sm">Todavía no hay reseñas. ¡Sé el primero!</p>
				) : (
					<>
						{/* Mobile — slider */}
						<div className="md:hidden relative overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
							<div
								className="flex items-stretch transition-transform duration-500 ease-in-out"
								style={{ transform: `translateX(-${current * 100}%)` }}
							>
								{reviews.map((r) => (
									<div key={r._id} className="w-full flex-shrink-0 h-full">
										<ReviewCard {...r} />
									</div>
								))}
							</div>
							{reviews.length > 1 && (
								<div className="flex justify-center gap-1.5 mt-5">
									{reviews.map((_, i) => (
										<button
											key={i}
											onClick={() => goTo(i)}
											className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-brand-pink' : 'w-1.5 h-1.5 bg-brand-pink-border'}`}
										/>
									))}
								</div>
							)}
						</div>

						{/* Desktop — fade slider */}
						<div className="hidden md:grid">
							{reviews.map((r, i) => (
								<div
									key={r._id}
									style={{ gridArea: '1/1' }}
									className={`transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
								>
									<ReviewCard {...r} />
								</div>
							))}
						</div>
						{reviews.length > 1 && (
							<div className="hidden md:flex gap-1.5">
								{reviews.map((_, i) => (
									<button
										key={i}
										onClick={() => goTo(i)}
										className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-brand-pink' : 'w-1.5 h-1.5 bg-brand-pink-border'}`}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>

			{/* Columna derecha — formulario */}
			<div className="bg-brand-pink-surface w-full md:w-1/2 px-8 md:px-16 py-20 flex flex-col justify-center">
				{submitted ? (
					<div className="text-center max-w-sm mx-auto flex flex-col items-center gap-4">
						<div className="w-12 h-12 rounded-full bg-brand-pink/15 flex items-center justify-center">
							<Star size={22} className="text-brand-pink fill-brand-pink" />
						</div>
						<h3 className="text-neutral-dark font-bold text-xl">¡Gracias por tu reseña!</h3>
						<p className="text-neutral-muted text-sm leading-relaxed">
							Tu reseña fue enviada y será publicada una vez que la revisemos. ¡Nos alegra mucho que hayas pasado por el taller!
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-6 max-w-sm md:max-w-none">
						<div className="flex flex-col gap-1">
							<h3 className="text-neutral-dark font-bold text-xl">
								{reviews.length === 0 ? '¡Sé el primero en dejar una reseña!' : '¿Pasaste por el taller?'}
							</h3>
							<p className="text-neutral-muted text-sm">Contanos tu experiencia, nos ayuda mucho.</p>
						</div>

						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="flex flex-col gap-1.5">
									<label className="text-neutral-dark text-sm font-medium">Tu nombre</label>
									<input type="text" required value={form.reviewer_name} onChange={(e) => setForm({ ...form, reviewer_name: e.target.value })} placeholder="Ej: María" className={inputCls} />
								</div>
								<div className="flex flex-col gap-1.5">
									<label className="text-neutral-dark text-sm font-medium">Taller al que fuiste</label>
									<select required value={form.workshop} onChange={(e) => setForm({ ...form, workshop: e.target.value })} className={`${inputCls} appearance-none cursor-pointer`}>
										<option value="" disabled>Seleccioná uno</option>
										{WORKSHOPS.map((w) => <option key={w} value={w}>{w}</option>)}
									</select>
								</div>
							</div>

							<div className="flex flex-col gap-1.5">
								<label className="text-neutral-dark text-sm font-medium">Puntuación</label>
								<StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
							</div>

							<div className="flex flex-col gap-1.5">
								<label className="text-neutral-dark text-sm font-medium">Tu comentario</label>
								<textarea required value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Contanos cómo fue tu experiencia..." rows={4} className={`${inputCls} resize-none`} />
							</div>

							{error && <p className="text-red-500 text-sm">{error}</p>}

							<button type="submit" disabled={submitting} className="w-full bg-brand-pink text-white rounded-lg py-3 text-sm font-semibold hover:bg-brand-pink/90 transition-colors disabled:opacity-50 cursor-pointer">
								{submitting ? 'Enviando...' : 'Enviar reseña'}
							</button>
						</form>
					</div>
				)}
			</div>

		</section>
	)
}
