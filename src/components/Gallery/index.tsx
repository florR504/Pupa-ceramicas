'use client'

import { useEffect, useState } from 'react'
import { type StudentWork } from '@/types/student-work'
import Photo from './components/Photo'
import Lightbox from './components/Lightbox'

export default function Gallery() {
	const [works, setWorks] = useState<StudentWork[]>([])
	const [selected, setSelected] = useState<StudentWork | null>(null)

	useEffect(() => {
		fetch('/api/gallery')
			.then((r) => r.json())
			.then((data) => setWorks(Array.isArray(data) ? data : []))
			.catch(() => {})
	}, [])

	if (works.length === 0) return null

	const [p1, p2, p3, p4, p5, p6] = works

	return (
		<>
			<section id="galería" className="bg-brand-cream py-20 px-8 md:px-20">
				<div className="max-w-6xl mx-auto">

					{/* Header */}
					<div className="text-center mb-12">
						<span className="text-brand-pink text-xs font-semibold tracking-[0.4em] uppercase">Galería</span>
						<h2 className="text-neutral-dark text-4xl md:text-[2.75rem] font-bold leading-[1.2] mt-4">
							Trabajos de nuestros alumnos
						</h2>
						<p className="text-neutral-muted text-base mt-4 max-w-md mx-auto">
							Piezas únicas, hechas con las manos y mucho amor.
						</p>
					</div>

					{/* Desktop — bento grid */}
					<div className="hidden md:flex flex-col gap-3">
						{p1 && (
							<div className="flex gap-3 h-[360px]">
								<Photo src={p1.image} alt="Trabajo alumno" workshop={p1.workshop} className="flex-[2]" onClick={() => setSelected(p1)} />
								{(p2 || p3) && (
									<div className="flex-1 flex flex-col gap-3">
										{p2 && <Photo src={p2.image} alt="Trabajo alumno" workshop={p2.workshop} className="flex-1" onClick={() => setSelected(p2)} />}
										{p3 && <Photo src={p3.image} alt="Trabajo alumno" workshop={p3.workshop} className="flex-1" onClick={() => setSelected(p3)} />}
									</div>
								)}
							</div>
						)}
						{(p4 || p5 || p6) && (
							<div className="flex gap-3 h-[240px]">
								{p4 && <Photo src={p4.image} alt="Trabajo alumno" workshop={p4.workshop} className="flex-1" onClick={() => setSelected(p4)} />}
								{p5 && <Photo src={p5.image} alt="Trabajo alumno" workshop={p5.workshop} className="flex-1" onClick={() => setSelected(p5)} />}
								{p6 && <Photo src={p6.image} alt="Trabajo alumno" workshop={p6.workshop} className="flex-1" onClick={() => setSelected(p6)} />}
							</div>
						)}
					</div>

					{/* Mobile — featured + grid */}
					<div className="flex md:hidden flex-col gap-3">
						{p1 && <Photo src={p1.image} alt="Trabajo alumno" workshop={p1.workshop} className="h-[220px]" onClick={() => setSelected(p1)} />}
						{works.slice(1).length > 0 && (
							<div className="grid grid-cols-2 gap-3">
								{works.slice(1, 5).map((w) => (
									<Photo key={w._id} src={w.image} alt="Trabajo alumno" workshop={w.workshop} className="h-[160px]" onClick={() => setSelected(w)} />
								))}
							</div>
						)}
					</div>

				</div>
			</section>

			{selected && <Lightbox photo={selected} onClose={() => setSelected(null)} />}
		</>
	)
}
