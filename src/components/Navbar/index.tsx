'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/cart'

const links = ['Colección', 'Nosotros', 'Talleres', 'Contacto']

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const { totalItems, openCart } = useCart()

	return (
		<nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8  md:px-20">
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
				className="relative text-white/90 hover:text-white transition-colors"
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

			{/* Mobile hamburger */}
			<button
				className="md:hidden text-white"
				onClick={() => setOpen(!open)}
				aria-label="Menú"
			>
				<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
					{open ? (
						<path d="M6 18L18 6M6 6l12 12" />
					) : (
						<path d="M4 6h16M4 12h16M4 18h16" />
					)}
				</svg>
			</button>

			{/* Mobile menu */}
			{open && (
				<ul className="absolute top-20 left-0 right-0 bg-[#444444]/95 flex flex-col items-center gap-6 py-8 md:hidden">
					{links.map((link) => (
						<li key={link}>
							<a
								href={`#${link.toLowerCase()}`}
								className="text-white text-base font-medium"
								onClick={() => setOpen(false)}
							>
								{link}
							</a>
						</li>
					))}
				</ul>
			)}
		</nav>
	)
}
