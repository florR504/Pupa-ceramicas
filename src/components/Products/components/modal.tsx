'use client'

import { useEffect, useState } from 'react'
import { type Product } from '@/types/product'
import { useCart } from '@/context/cart'

export type { Product }

interface ProductModalProps {
	product: Product
	onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
	const { addItem, openCart } = useCart()
	const [added, setAdded] = useState(false)

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', handleKey)
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', handleKey)
			document.body.style.overflow = ''
		}
	}, [onClose])

	const handleAddToCart = () => {
		addItem(product)
		setAdded(true)
		setTimeout(() => {
			setAdded(false)
			onClose()
			openCart()
		}, 800)
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
			onClick={onClose}
		>
			<div className="absolute inset-0 bg-black/55" />

			<div
				className="relative z-10 w-full max-w-[900px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[640px]"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors md:bg-[#F5F0F3] md:text-[#888888] md:hover:bg-[#ecdde6]"
					aria-label="Cerrar"
				>
					<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>

				{/* Imagen */}
				<div
					className="w-full md:w-[420px] h-72 md:h-auto flex-shrink-0 bg-[#F0FAFA] bg-cover bg-center"
					style={{ backgroundImage: `url('${product.image}')` }}
				/>

				{/* Contenido */}
				<div className="flex flex-col flex-1 overflow-y-auto">
					<div className="flex flex-col flex-1 p-8 md:p-10 gap-4">
						<div className="flex gap-2 flex-wrap">
							<span className="text-[10px] font-bold tracking-[0.2em] text-[#8ECFC9] bg-[#F0FAFA] px-3 py-1 rounded-full uppercase">
								{product.category}
							</span>
							<span className="text-[10px] font-bold tracking-[0.2em] text-[#F2A8C0] bg-[#FEF0F5] px-3 py-1 rounded-full uppercase">
								Edición limitada
							</span>
						</div>

						<h2 className="text-[#444444] text-3xl font-bold leading-tight">{product.name}</h2>

						<p className="text-[#888888] text-sm leading-relaxed">{product.description}</p>

						<div className="h-px bg-[#F2E8ED]" />

						{(product.dimensions || product.material || product.stock) && (
							<div className="flex gap-6">
								{product.dimensions && (
									<div className="flex flex-col gap-1">
										<span className="text-[9px] font-bold tracking-widest text-[#BBBBBB] uppercase">Dimensiones</span>
										<span className="text-[#666666] text-xs">{product.dimensions}</span>
									</div>
								)}
								{product.material && (
									<div className="flex flex-col gap-1">
										<span className="text-[9px] font-bold tracking-widest text-[#BBBBBB] uppercase">Material</span>
										<span className="text-[#666666] text-xs">{product.material}</span>
									</div>
								)}
								{product.stock && (
									<div className="flex flex-col gap-1">
										<span className="text-[9px] font-bold tracking-widest text-[#BBBBBB] uppercase">Stock</span>
										<span className="text-[#6DBF6A] text-xs">{product.stock}</span>
									</div>
								)}
							</div>
						)}

						{/* Spacer desktop */}
						<div className="hidden md:flex flex-1" />

						{/* Precio + acciones desktop */}
						<div className="hidden md:flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-[11px] text-[#BBBBBB] tracking-widest">Precio</span>
								<span className="text-[#F2A8C0] text-3xl font-bold">{product.price}</span>
							</div>
							<div className="flex gap-3">
								<button
									onClick={handleAddToCart}
									disabled={added}
									className="px-7 py-3 rounded-full bg-[#F2A8C0] text-white text-sm font-semibold hover:bg-[#e896b0] transition-colors disabled:bg-[#8ECFC9]"
								>
									{added ? '¡Agregado! ✓' : 'Agregar al carrito'}
								</button>
								<button
									onClick={onClose}
									className="px-5 py-3 rounded-full border border-[#E8D5E0] text-[#888888] text-sm hover:bg-[#fdf5f8] transition-colors"
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>

					{/* Barra sticky mobile */}
					<div className="md:hidden sticky bottom-0 flex items-center justify-between px-6 py-4 bg-white border-t border-[#F2E8ED]">
						<div className="flex flex-col gap-0.5">
							<span className="text-[11px] text-[#BBBBBB] tracking-widest">Precio</span>
							<span className="text-[#F2A8C0] text-2xl font-bold">{product.price}</span>
						</div>
						<button
							onClick={handleAddToCart}
							disabled={added}
							className="px-6 py-3 rounded-full bg-[#F2A8C0] text-white text-sm font-semibold hover:bg-[#e896b0] transition-colors disabled:bg-[#8ECFC9]"
						>
							{added ? '¡Agregado! ✓' : 'Agregar al carrito'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
