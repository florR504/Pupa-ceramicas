'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactInfo = [
	{ label: 'hola@pupaceramicas.com' },
	{ label: '+34 612 345 678' },
	{ label: 'Carrer del Barro 12, Barcelona' },
]

export default function Contact() {
	const [sent, setSent] = useState(false)

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		// TODO: conectar con servicio de email (Resend, Formspree, etc.)
		setSent(true)
	}

	return (
		<section id="contacto" className="bg-[#FDF0F5] py-24 px-8 md:px-20">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
				{/* Left */}
				<div className="flex flex-col gap-7">
					<span className="text-[#F2A8C0] text-xs font-semibold tracking-[0.4em] uppercase">
						Contacto
					</span>
					<h2 className="text-[#444444] text-4xl md:text-[2.5rem] font-bold leading-[1.2]">
						Hablemos de
						<br />
						tu pieza
					</h2>
					<p className="text-[#888888] text-base leading-relaxed max-w-sm">
						¿Tienes en mente una pieza especial? Hacemos encargos personalizados.
						Cuéntanos tu idea y la haremos realidad.
					</p>

					<ul className="flex flex-col gap-4 mt-2">
						{contactInfo.map((c) => (
							<li key={c.label} className="flex items-center gap-3">
								<span className="w-2 h-2 rounded-full bg-[#8ECFC9] flex-shrink-0" />
								<span className="text-[#444444] text-sm">{c.label}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Right — Form */}
				{sent ? (
					<div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
						<span className="text-4xl">✨</span>
						<h3 className="text-[#444444] text-xl font-semibold">¡Mensaje enviado!</h3>
						<p className="text-[#888888] text-sm">
							Te respondemos en menos de 48 horas.
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<Label htmlFor="name" className="text-[#444444] text-sm font-medium">
								Tu nombre
							</Label>
							<Input
								id="name"
								placeholder="Nombre completo"
								required
								className="border-[#E8D5E0] focus-visible:ring-[#F2A8C0]"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="email" className="text-[#444444] text-sm font-medium">
								Correo electrónico
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="tu@email.com"
								required
								className="border-[#E8D5E0] focus-visible:ring-[#F2A8C0]"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="message" className="text-[#444444] text-sm font-medium">
								Tu mensaje
							</Label>
							<Textarea
								id="message"
								placeholder="Cuéntanos qué tienes en mente..."
								rows={5}
								required
								className="border-[#E8D5E0] focus-visible:ring-[#F2A8C0] resize-none"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-[#F2A8C0] text-white font-semibold text-sm tracking-wide py-4 rounded-sm hover:bg-[#e898b0] transition-colors"
						>
							Enviar mensaje
						</button>
					</form>
				)}
			</div>
		</section>
	)
}
