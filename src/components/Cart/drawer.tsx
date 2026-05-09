'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/cart'
import { cartWhatsAppUrl } from '@/lib/whatsapp'

function parsePrice(price: string): number {
	return parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

export default function CartDrawer() {
	const { items, removeItem, updateQuantity, totalItems, isOpen, closeCart } = useCart()

	useEffect(() => {
		if (!isOpen) return
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeCart()
		}
		document.addEventListener('keydown', handleKey)
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', handleKey)
			document.body.style.overflow = ''
		}
	}, [isOpen, closeCart])

	const subtotal = items.reduce(
		(sum, i) => sum + parsePrice(i.product.price) * i.quantity,
		0
	)

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
				onClick={closeCart}
			/>

			{/* Drawer */}
			<div
				className={`fixed top-0 right-0 z-50 h-full w-full max-w-[400px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-5 border-b border-brand-pink-border-light">
					<div className="flex items-center gap-3">
						<h2 className="text-neutral-dark text-lg font-bold">Carrito</h2>
						{totalItems > 0 && (
							<span className="text-xs font-semibold text-brand-pink bg-brand-pink-bg px-2 py-0.5 rounded-full">
								{totalItems} {totalItems === 1 ? 'pieza' : 'piezas'}
							</span>
						)}
					</div>
					<button
						onClick={closeCart}
						className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-muted hover:bg-brand-pink-surface transition-colors"
						aria-label="Cerrar carrito"
					>
						<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Items */}
				<div className="flex-1 overflow-y-auto px-6 py-4">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full gap-4 text-center">
							<div className="w-16 h-16 rounded-full bg-brand-pink-bg flex items-center justify-center">
								<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-brand-pink">
									<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
									<line x1="3" y1="6" x2="21" y2="6" />
									<path d="M16 10a4 4 0 01-8 0" />
								</svg>
							</div>
							<p className="text-neutral-muted text-sm">Tu carrito está vacío.</p>
							<button
								onClick={closeCart}
								className="text-sm text-brand-pink font-semibold hover:underline"
							>
								Ver la colección →
							</button>
						</div>
					) : (
						<ul className="flex flex-col gap-5">
							{items.map(({ product, quantity }) => (
								<li key={product.name} className="flex gap-4">
									{/* Imagen */}
									<div
										className="w-20 h-20 rounded-lg flex-shrink-0 bg-brand-mint-bg bg-cover bg-center"
										style={{ backgroundImage: `url('${product.image}')` }}
									/>

									{/* Detalle */}
									<div className="flex flex-col flex-1 gap-1 min-w-0">
										<span className="text-[10px] font-semibold tracking-widest text-brand-mint uppercase">
											{product.category}
										</span>
										<p className="text-neutral-dark text-sm font-semibold leading-tight truncate">
											{product.name}
										</p>
										<p className="text-brand-pink text-base font-bold">{product.price}</p>

										{/* Controles cantidad */}
										<div className="flex items-center gap-2 mt-1">
											<button
												onClick={() => updateQuantity(product.name, quantity - 1)}
												className="w-6 h-6 rounded-full border border-brand-pink-border flex items-center justify-center text-neutral-muted hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-colors text-sm"
												aria-label="Reducir cantidad"
											>
												−
											</button>
											<span className="text-sm text-neutral-dark w-4 text-center">{quantity}</span>
											<button
												onClick={() => updateQuantity(product.name, quantity + 1)}
												className="w-6 h-6 rounded-full border border-brand-pink-border flex items-center justify-center text-neutral-muted hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-colors text-sm"
												aria-label="Aumentar cantidad"
											>
												+
											</button>
											<button
												onClick={() => removeItem(product.name)}
												className="ml-auto text-neutral-lightest hover:text-brand-pink transition-colors"
												aria-label="Eliminar pieza"
											>
												<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
													<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
												</svg>
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Footer */}
				{items.length > 0 && (
					<div className="px-6 py-5 border-t border-brand-pink-border-light flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<span className="text-neutral-muted text-sm">Subtotal</span>
							<span className="text-neutral-dark text-xl font-bold">€{subtotal}</span>
						</div>
						<p className="text-neutral-light text-xs leading-relaxed">
							Los gastos de envío se calculan al finalizar la compra. Recuerda que cada pieza es única y hecha a mano.
						</p>
						<a
							href={cartWhatsAppUrl(items)}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full py-4 rounded-full bg-brand-pink text-white font-semibold hover:bg-brand-pink-hover transition-colors flex items-center justify-center gap-2"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
								<path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.523 5.84L.057 23.5l5.822-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.713.974.99-3.614-.235-.373A9.818 9.818 0 1112 21.818z" />
							</svg>
							Enviar pedido por WhatsApp
						</a>
					</div>
				)}
			</div>
		</>
	)
}
