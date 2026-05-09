'use client'

import { useEffect, useState } from 'react'
import { type Product } from '@/types/product'
import { useCart } from '@/context/cart'
import { productWhatsAppUrl } from '@/lib/whatsapp'

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
					className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors md:bg-brand-pink-surface md:text-neutral-muted md:hover:bg-brand-pink-surface-hover cursor-pointer"
					aria-label="Cerrar"
				>
					<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>

				{/* Imagen */}
				<div
					className="w-full md:w-[420px] h-72 md:h-auto flex-shrink-0 bg-brand-mint-bg bg-cover bg-center"
					style={{ backgroundImage: `url('${product.image}')` }}
				/>

				{/* Contenido */}
				<div className="flex flex-col flex-1 overflow-y-auto">
					<div className="flex flex-col flex-1 p-8 md:p-10 gap-4">
						<div className="flex gap-2 flex-wrap">
							<span className="text-[10px] font-bold tracking-[0.2em] text-brand-mint bg-brand-mint-bg px-3 py-1 rounded-full uppercase">
								{product.category}
							</span>
							<span className="text-[10px] font-bold tracking-[0.2em] text-brand-pink bg-brand-pink-bg px-3 py-1 rounded-full uppercase">
								Edición limitada
							</span>
						</div>

						<h2 className="text-neutral-dark text-3xl font-bold leading-tight">{product.name}</h2>

						<p className="text-neutral-muted text-sm leading-relaxed">{product.description}</p>

						<div className="h-px bg-brand-pink-border-light" />

						{(product.dimensions || product.material || product.stock) && (
							<div className="flex gap-6">
								{product.dimensions && (
									<div className="flex flex-col gap-1">
										<span className="text-[9px] font-bold tracking-widest text-neutral-lighter uppercase">Dimensiones</span>
										<span className="text-neutral-mid text-xs">{product.dimensions}</span>
									</div>
								)}
								{product.material && (
									<div className="flex flex-col gap-1">
										<span className="text-[9px] font-bold tracking-widest text-neutral-lighter uppercase">Material</span>
										<span className="text-neutral-mid text-xs">{product.material}</span>
									</div>
								)}
								{product.stock && (
									<div className="flex flex-col gap-1">
										<span className="text-[9px] font-bold tracking-widest text-neutral-lighter uppercase">Stock</span>
										<span className="text-whatsapp-hover text-xs">{product.stock}</span>
									</div>
								)}
							</div>
						)}

						{/* Spacer desktop */}
						<div className="hidden md:flex flex-1" />

						{/* Precio + acciones desktop */}
						<div className="hidden md:flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-[11px] text-neutral-lighter tracking-widest">Precio</span>
								<span className="text-brand-pink text-3xl font-bold">{product.price}</span>
							</div>
							<div className="flex gap-3">
								<button
									onClick={handleAddToCart}
									disabled={added}
									className="px-7 py-3 rounded-full bg-brand-pink text-white text-sm font-semibold hover:bg-brand-pink-hover transition-colors disabled:bg-brand-mint cursor-pointer"
								>
									{added ? '¡Agregado! ✓' : 'Agregar al carrito'}
								</button>
								<a
									href={productWhatsAppUrl(product)}
									target="_blank"
									rel="noopener noreferrer"
									className="px-5 py-3 rounded-full border border-brand-pink-border text-neutral-muted text-sm hover:bg-brand-pink-subtle transition-colors flex items-center gap-1.5 cursor-pointer"
								>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-whatsapp">
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
										<path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.523 5.84L.057 23.5l5.822-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.713.974.99-3.614-.235-.373A9.818 9.818 0 1112 21.818z" />
									</svg>
									Consultar
								</a>
							</div>
						</div>
					</div>

					{/* Barra sticky mobile */}
					<div className="md:hidden sticky bottom-0 flex items-center justify-between px-6 py-4 bg-white border-t border-brand-pink-border-light gap-3">
						<div className="flex flex-col gap-0.5 flex-shrink-0">
							<span className="text-[11px] text-neutral-lighter tracking-widest">Precio</span>
							<span className="text-brand-pink text-2xl font-bold">{product.price}</span>
						</div>
						<div className="flex gap-2">
							<a
								href={productWhatsAppUrl(product)}
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 rounded-full border border-brand-pink-border flex items-center justify-center"
								aria-label="Consultar por WhatsApp"
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
									<path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.523 5.84L.057 23.5l5.822-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.713.974.99-3.614-.235-.373A9.818 9.818 0 1112 21.818z" />
								</svg>
							</a>
							<button
								onClick={handleAddToCart}
								disabled={added}
								className="px-5 py-3 rounded-full bg-brand-pink text-white text-sm font-semibold hover:bg-brand-pink-hover transition-colors disabled:bg-brand-mint cursor-pointer"
							>
								{added ? '¡Agregado! ✓' : 'Agregar al carrito'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
