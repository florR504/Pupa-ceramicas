'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/cart'

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
				<div className="flex items-center justify-between px-6 py-5 border-b border-[#F2E8ED]">
					<div className="flex items-center gap-3">
						<h2 className="text-[#444444] text-lg font-bold">Carrito</h2>
						{totalItems > 0 && (
							<span className="text-xs font-semibold text-[#F2A8C0] bg-[#FEF0F5] px-2 py-0.5 rounded-full">
								{totalItems} {totalItems === 1 ? 'pieza' : 'piezas'}
							</span>
						)}
					</div>
					<button
						onClick={closeCart}
						className="w-8 h-8 rounded-full flex items-center justify-center text-[#888888] hover:bg-[#F5F0F3] transition-colors"
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
							<div className="w-16 h-16 rounded-full bg-[#FEF0F5] flex items-center justify-center">
								<svg width="28" height="28" fill="none" stroke="#F2A8C0" strokeWidth="1.5" viewBox="0 0 24 24">
									<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
									<line x1="3" y1="6" x2="21" y2="6" />
									<path d="M16 10a4 4 0 01-8 0" />
								</svg>
							</div>
							<p className="text-[#888888] text-sm">Tu carrito está vacío.</p>
							<button
								onClick={closeCart}
								className="text-sm text-[#F2A8C0] font-semibold hover:underline"
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
										className="w-20 h-20 rounded-lg flex-shrink-0 bg-[#F0FAFA] bg-cover bg-center"
										style={{ backgroundImage: `url('${product.image}')` }}
									/>

									{/* Detalle */}
									<div className="flex flex-col flex-1 gap-1 min-w-0">
										<span className="text-[10px] font-semibold tracking-widest text-[#8ECFC9] uppercase">
											{product.category}
										</span>
										<p className="text-[#444444] text-sm font-semibold leading-tight truncate">
											{product.name}
										</p>
										<p className="text-[#F2A8C0] text-base font-bold">{product.price}</p>

										{/* Controles cantidad */}
										<div className="flex items-center gap-2 mt-1">
											<button
												onClick={() => updateQuantity(product.name, quantity - 1)}
												className="w-6 h-6 rounded-full border border-[#E8D5E0] flex items-center justify-center text-[#888888] hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors text-sm"
												aria-label="Reducir cantidad"
											>
												−
											</button>
											<span className="text-sm text-[#444444] w-4 text-center">{quantity}</span>
											<button
												onClick={() => updateQuantity(product.name, quantity + 1)}
												className="w-6 h-6 rounded-full border border-[#E8D5E0] flex items-center justify-center text-[#888888] hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors text-sm"
												aria-label="Aumentar cantidad"
											>
												+
											</button>
											<button
												onClick={() => removeItem(product.name)}
												className="ml-auto text-[#CCCCCC] hover:text-[#F2A8C0] transition-colors"
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
					<div className="px-6 py-5 border-t border-[#F2E8ED] flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<span className="text-[#888888] text-sm">Subtotal</span>
							<span className="text-[#444444] text-xl font-bold">€{subtotal}</span>
						</div>
						<p className="text-[#AAAAAA] text-xs leading-relaxed">
							Los gastos de envío se calculan al finalizar la compra. Recuerda que cada pieza es única y hecha a mano.
						</p>
						<button className="w-full py-4 rounded-full bg-[#F2A8C0] text-white font-semibold hover:bg-[#e896b0] transition-colors">
							Finalizar compra
						</button>
					</div>
				)}
			</div>
		</>
	)
}
