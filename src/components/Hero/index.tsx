'use client'

import { useEffect, useState } from 'react'
import Navbar from '../Navbar'

// Agregá tus fotos en public/assets/images/ y listá los nombres acá
const slides = [
	'/assets/images/onigiri.jpeg',
	'/assets/images/taza_al_reves.jpeg',
	'/assets/images/juego_taza_plato_gatito.jpeg',
	'/assets/images/sincara_sahumerio.jpeg',
	'/assets/images/totoro_sahumerio.jpeg',
	'/assets/images/gancitos.jpeg',
	'/assets/images/oniguiri.jpeg',
]

export default function Hero() {
	const [current, setCurrent] = useState(0)
	const [fading, setFading] = useState(false)


	useEffect(() => {
		const interval = setInterval(() => {
			setFading(true)
			setTimeout(() => {
				setCurrent((prev) => (prev + 1) % slides.length)
				setFading(false)
			}, 600)
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	return (
		<section className="relative w-full h-[720px] overflow-hidden">
			{/* Slideshow */}
			{slides.map((src, i) => (
				<div
					key={src}
					className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
					style={{
						backgroundImage: `url('${src}')`,
						opacity: i === current ? (fading ? 0 : 1) : 0,
					}}
				/>
			))}

			{/* Fallback gradient si no hay fotos aún */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#8ECFC9] via-[#F2A8C0]/60 to-[#FDFAF9] -z-10" />

			{/* Overlay oscuro */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />

			<Navbar />

			{/* Contenido */}
			<div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-20 max-w-3xl">
				<span className="text-[#F2A8C0] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
					Cerámica Artesanal • Hecho a Mano
				</span>

				<h1 className="text-white text-5xl md:text-[4.5rem] font-bold leading-[1.1] mb-6">
					Piezas que alegran
					<br />
					tu cotidiano
				</h1>

				<p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl">
					Cerámica artesanal hecha a mano con amor. Cada pieza es única, pensada para
					hacer más bonita tu vida de todos los días.
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<a
						href="#colección"
						className="bg-[#F2A8C0] text-white text-sm font-semibold tracking-wide px-10 py-4 rounded-sm hover:bg-[#e898b0] transition-colors"
					>
						Ver Colección
					</a>
					<a
						href="#nosotros"
						className="border border-white/70 text-white text-sm font-medium tracking-wide px-10 py-4 rounded-sm hover:bg-white/10 transition-colors"
					>
						Nuestra Historia
					</a>
				</div>

				{/* Indicadores */}
				<div className="flex gap-2 mt-10">
					{slides.map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrent(i)}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								i === current ? 'w-8 bg-[#F2A8C0]' : 'w-2 bg-white/40'
							}`}
							aria-label={`Foto ${i + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
