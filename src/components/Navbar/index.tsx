'use client'

import { useState } from 'react'
import Image from 'next/image'

const links = ['Colección', 'Nosotros', 'Talleres', 'Contacto']

export default function Navbar() {
	const [open, setOpen] = useState(false)

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
