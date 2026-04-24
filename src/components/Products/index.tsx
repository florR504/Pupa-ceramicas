'use client'

import { useEffect, useRef, useState } from 'react'
import ProductCard from './components/card'
import ProductModal from './components/modal'
import { type Product } from '@/types/product'

const products: Product[] = [
	{
		category: 'VAJILLA',
		name: 'Cuenco Olivo',
		description: 'Arcilla natural con esmalte verde olivo. Apto para horno y lavavajillas.',
		price: '€48',
		image: '/assets/images/pollito.jpeg',
		dimensions: '14 cm Ø · 8 cm alto',
		material: 'Arcilla natural esmaltada',
		stock: 'Disponible (1 ud.)',
	},
	{
		category: 'DECORACIÓN',
		name: 'Jarrón Luna',
		description:
			'Forma lunar inspirada en la tradición mediterránea. Acabado mate con texturas naturales.',
		price: '€95',
		image: '/assets/images/sincara_sahumerio.jpeg',
		dimensions: '12 cm Ø · 22 cm alto',
		material: 'Arcilla blanca mate',
		stock: 'Encargo (20 días)',
	},
	{
		category: 'TALLER',
		name: 'Set Café Ritual',
		description:
			'Taza y platillo artesanales, ideales para el momento del café. Edición limitada.',
		price: '€62',
		image: '/assets/images/totoro_sahumerio.jpeg',
		dimensions: 'Taza 8 cm Ø · Platillo 14 cm',
		material: 'Arcilla natural esmaltada',
		stock: 'Disponible (2 ud.)',
	},
	{
		category: 'TEST',
		name: 'Cuenco Olivo',
		description: 'Arcilla natural con esmalte verde olivo. Apto para horno y lavavajillas.',
		price: '€48',
		image: '/assets/images/pollito.jpeg',
		dimensions: '14 cm Ø · 8 cm alto',
		material: 'Arcilla natural esmaltada',
		stock: 'Disponible (1 ud.)',
	},
	{
		category: 'CUENCOS',
		name: 'Jarrón Luna',
		description:
			'Forma lunar inspirada en la tradición mediterránea. Acabado mate con texturas naturales.',
		price: '€95',
		image: '/assets/images/sincara_sahumerio.jpeg',
		dimensions: '12 cm Ø · 22 cm alto',
		material: 'Arcilla blanca mate',
		stock: 'Encargo (20 días)',
	},
	{
		category: 'SAHUMERIOS',
		name: 'Set Café Ritual',
		description:
			'Taza y platillo artesanales, ideales para el momento del café. Edición limitada.',
		price: '€62',
		image: '/assets/images/totoro_sahumerio.jpeg',
		dimensions: 'Taza 8 cm Ø · Platillo 14 cm',
		material: 'Arcilla natural esmaltada',
		stock: 'Disponible (2 ud.)',
	},
]

function getVisibleCount() {
	if (typeof window === 'undefined') return 3
	if (window.innerWidth >= 1024) return 3
	if (window.innerWidth >= 768) return 2
	return 1
}

export default function Products() {
	const [current, setCurrent] = useState(0)
	const [visibleCount, setVisibleCount] = useState(3)
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const startX = useRef<number | null>(null)

	const maxIndex = products.length - visibleCount

	useEffect(() => {
		const update = () => {
			const count = getVisibleCount()
			setVisibleCount(count)
			setCurrent((c) => Math.min(c, products.length - count))
		}
		update()
		window.addEventListener('resize', update)
		return () => window.removeEventListener('resize', update)
	}, [])

	const prev = () => setCurrent((c) => Math.max(0, c - 1))
	const next = () => setCurrent((c) => Math.min(maxIndex, c + 1))

	const onTouchStart = (e: React.TouchEvent) => {
		startX.current = e.touches[0].clientX
	}
	const onTouchEnd = (e: React.TouchEvent) => {
		if (startX.current === null) return
		const delta = startX.current - e.changedTouches[0].clientX
		if (delta > 40) next()
		else if (delta < -40) prev()
		startX.current = null
	}

	const cardWidth = 100 / visibleCount

	return (
		<>
		{selectedProduct && (
			<ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
		)}
		<section id="colección" className="bg-[#FDFAF9] py-24 px-8 md:px-20">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
						<span className="text-[#F2A8C0] text-xs font-semibold tracking-[0.4em] uppercase">
							Colección
						</span>
						<h2 className="text-[#444444] text-4xl md:text-[2.75rem] font-bold leading-[1.2] mt-4 mb-5">
							Piezas que cuentan una historia
						</h2>
						<p className="text-[#888888] text-base leading-relaxed max-w-md mx-auto">
							Cada obra nace del diálogo entre el barro y las manos. Sin moldes. Sin prisa.
						</p>
				</div>

				<div className="bg-white border border-[#F2A8C0]/30 rounded-xl px-8 py-5 text-center mb-10">
					<p className="text-[#666666] text-sm leading-relaxed">
						✨ Todas las piezas son unicas, hechas a mano y con un proceso artesanal, por lo cual no hay dos iguales.
						Por eso en caso de que no haya stock disponible, el tiempo de elaboracion es de aproximadamente <b>20 dias habiles</b>
					</p>
				</div>

				{/* Slider */}
				<div
					className="relative overflow-hidden"
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					<div
						className="flex transition-transform duration-500 ease-in-out"
						style={{ transform: `translateX(-${current * cardWidth}%)` }}
					>
						{products.map((product, i) => (
							<ProductCard
								key={i}
								{...product}
								width={cardWidth}
								onClick={() => setSelectedProduct(product)}
							/>
						))}
					</div>
				</div>

				{/* Controles */}
				<div className="flex items-center justify-center gap-6 mt-10">
					<button
						onClick={prev}
						disabled={current === 0}
						className="w-10 h-10 rounded-full border border-[#E8D5E0] flex items-center justify-center text-[#888888] hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors disabled:opacity-30 disabled:pointer-events-none"
						aria-label="Anterior"
					>
						<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M15 18l-6-6 6-6" />
						</svg>
					</button>

					<div className="flex gap-2">
						{Array.from({ length: maxIndex + 1 }).map((_, i) => (
							<button
								key={i}
								onClick={() => setCurrent(i)}
								className={`h-1.5 rounded-full transition-all duration-300 ${
									i === current ? 'w-8 bg-[#F2A8C0]' : 'w-2 bg-[#E8D5E0]'
								}`}
								aria-label={`Posición ${i + 1}`}
							/>
						))}
					</div>

					<button
						onClick={next}
						disabled={current >= maxIndex}
						className="w-10 h-10 rounded-full border border-[#E8D5E0] flex items-center justify-center text-[#888888] hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors disabled:opacity-30 disabled:pointer-events-none"
						aria-label="Siguiente"
					>
						<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M9 18l6-6-6-6" />
						</svg>
					</button>
				</div>
			</div>
		</section>
		</>
	)
}
