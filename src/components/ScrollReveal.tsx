'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
	useEffect(() => {
		const sections = Array.from(document.querySelectorAll('section')).slice(1)
		const rightCards = Array.from(document.querySelectorAll('[data-reveal="right"]'))

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view')
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
		)

		// Doble rAF: garantiza que el browser haya pintado el estado inicial
		// antes de que el observer empiece a escuchar, disparando la transición
		let raf: number
		raf = requestAnimationFrame(() => {
			raf = requestAnimationFrame(() => {
				sections.forEach((s) => s.classList.add('reveal'))
				rightCards.forEach((el) => el.classList.add('reveal-right'))
				;[...sections, ...rightCards].forEach((el) => observer.observe(el))
			})
		})

		return () => {
			cancelAnimationFrame(raf)
			observer.disconnect()
		}
	}, [])

	return null
}
