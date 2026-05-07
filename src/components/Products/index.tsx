'use client'

import { useEffect, useRef, useState } from 'react'
import ProductCard from './components/card'
import ProductModal from './components/modal'
import { type Product } from '@/types/product'
import productsData from '@/data/products.json'

const products: Product[] = productsData

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
						className="w-10 h-10 rounded-full border border-[#E8D5E0] flex items-center justify-center text-[#888888] hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
						aria-label="Anterior"
					>
						<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M15 18l-6-6 6-6" />
						</svg>
					</button>

					{/* Desktop: todos los dots */}
					<div className="hidden md:flex gap-2">
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

					{/* Mobile: ventana dinámica de 5 dots */}
					<div className="flex md:hidden items-center gap-1.5">
						{Array.from({ length: maxIndex + 1 }).map((_, i) => {
							const dist = Math.abs(i - current)
							if (dist > 2) return null
							return (
								<button
									key={i}
									onClick={() => setCurrent(i)}
									aria-label={`Posición ${i + 1}`}
									className={`rounded-full transition-all duration-300 ${
										i === current
											? 'w-6 h-1.5 bg-[#F2A8C0]'
											: dist === 1
											? 'w-1.5 h-1.5 bg-[#E8D5E0]'
											: 'w-1 h-1 bg-[#EDE0E6]'
									}`}
								/>
							)
						})}
					</div>

					<button
						onClick={next}
						disabled={current >= maxIndex}
						className="w-10 h-10 rounded-full border border-[#E8D5E0] flex items-center justify-center text-[#888888] hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
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
