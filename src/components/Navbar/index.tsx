'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/cart'
import { STORE_WHATSAPP } from '@/config/store'

const links = ['Colección', 'Nosotros', 'Talleres', 'Contacto']

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const { totalItems, openCart } = useCart()

	const close = () => setOpen(false)

	return (
		<>
			<nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-20">
				<Image src="/assets/images/logo.png" alt="pupa cerámicas" width={100} height={100} />

				{/* Desktop links */}
				<ul className="hidden md:flex gap-12">
					{links.map((link) => (
						<li key={link}>
							<a
								href={`#${link.toLowerCase()}`}
								className="text-white/90 text-sm font-medium tracking-wide hover:text-white transition-colors"
							>
								{link}
							</a>
						</li>
					))}
				</ul>

				{/* Cart button */}
				<button
					onClick={openCart}
					className="relative text-white/90 hover:text-white transition-colors cursor-pointer"
					aria-label="Carrito"
				>
					<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
						<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
						<line x1="3" y1="6" x2="21" y2="6" />
						<path d="M16 10a4 4 0 01-8 0" />
					</svg>
					{totalItems > 0 && (
						<span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#F2A8C0] text-white text-[10px] font-bold flex items-center justify-center">
							{totalItems}
						</span>
					)}
				</button>

				{/* Mobile hamburger / close */}
				<button
					className="md:hidden text-white cursor-pointer"
					onClick={() => setOpen(o => !o)}
					aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
				>
					<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
						<path
							d="M4 6h16M4 12h16M4 18h16"
							className={`transition-all duration-300 origin-center ${open ? 'opacity-0' : 'opacity-100'}`}
						/>
						<path
							d="M6 18L18 6M6 6l12 12"
							className={`transition-all duration-300 origin-center ${open ? 'opacity-100' : 'opacity-0'}`}
						/>
					</svg>
				</button>
			</nav>

			{/* Mobile bottom sheet */}
			<div
				className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
			>
				{/* Overlay */}
				<div className="absolute inset-0 bg-[#444444]/60" onClick={close} />

				{/* Sheet */}
				<div
					className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
				>
					{/* Handle */}
					<div className="flex justify-center pt-3 pb-2">
						<div className="w-10 h-1 rounded-full bg-[#E8D5E0]" />
					</div>

					{/* Eyebrow */}
					<p className="text-center text-[10px] font-bold tracking-[0.3em] text-[#F2A8C0] uppercase pt-1 pb-3">
						Navegación
					</p>

					{/* Links */}
					<ul>
						{links.map((link, i) => (
							<li key={link} className={i < links.length - 1 ? 'border-b border-[#F2E8ED]' : ''}>
								<a
									href={`#${link.toLowerCase()}`}
									onClick={close}
									className="flex items-center justify-between px-7 py-4 text-[#444444] text-lg font-semibold"
								>
									{link}
									<svg width="18" height="18" fill="none" stroke="#F2A8C0" strokeWidth="2" viewBox="0 0 24 24">
										<path d="M9 18l6-6-6-6" />
									</svg>
								</a>
							</li>
						))}
					</ul>

					{/* WhatsApp CTA */}
					<a
						href={`https://wa.me/${STORE_WHATSAPP}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 mx-0 bg-[#25D366] text-white font-semibold text-sm py-5 mt-2"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
							<path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.523 5.84L.057 23.5l5.822-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.713.974.99-3.614-.235-.373A9.818 9.818 0 1112 21.818z" />
						</svg>
						Escribinos por WhatsApp
					</a>
				</div>
			</div>
		</>
	)
}
