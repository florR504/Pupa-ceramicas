'use client'

import { useState } from 'react'
import { contactWhatsAppUrl } from '@/lib/whatsapp'
import { STORE_WHATSAPP } from '@/config/store'

const topics = [
	'Quiero encargar una pieza personalizada',
	'Tengo una consulta sobre los talleres',
	'Quiero saber más sobre la colección',
]

export default function Contact() {
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')

	const whatsappUrl = contactWhatsAppUrl(name.trim() || 'alguien', message.trim())
	const canSend = name.trim().length > 0 && message.trim().length > 0

	return (
		<section id="contacto" className="bg-brand-pink-bg py-24 px-8 md:px-20">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

				{/* Left */}
				<div className="flex flex-col gap-7">
					<span className="text-brand-pink text-xs font-semibold tracking-[0.4em] uppercase">
						Contacto
					</span>
					<h2 className="text-neutral-dark text-4xl md:text-[2.5rem] font-bold leading-[1.2]">
						Hablemos de tu pieza
					</h2>
					<p className="text-neutral-muted text-base leading-relaxed max-w-m">
						¿Tenés en mente una pieza especial? Hacemos encargos personalizados.
						Contanos tu idea y la hacemos realidad — directamente por WhatsApp.
					</p>

					<ul className="flex flex-col gap-5 mt-2">
						<li className="flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-whatsapp/10 flex items-center justify-center flex-shrink-0">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
									<path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.523 5.84L.057 23.5l5.822-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.713.974.99-3.614-.235-.373A9.818 9.818 0 1112 21.818z" />
								</svg>
							</span>
							<a
								href={`https://wa.me/${STORE_WHATSAPP}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-neutral-dark text-sm hover:text-whatsapp transition-colors"
							>
								+{STORE_WHATSAPP}
							</a>
						</li>
						<li className="flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-brand-mint-bg flex items-center justify-center flex-shrink-0">
								<svg width="16" height="16" fill="none" stroke="#8ECFC9" strokeWidth="2" viewBox="0 0 24 24">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
							</span>
							<span className="text-neutral-dark text-sm">Caballito, entre Felipe Vallese y Av. Acoyte</span>
						</li>
						<li className="flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-neutral-surface flex items-center justify-center flex-shrink-0">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="url(#ig-gradient)">
									<defs>
										<linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
											<stop offset="0%" stopColor="#f09433" />
											<stop offset="25%" stopColor="#e6683c" />
											<stop offset="50%" stopColor="#dc2743" />
											<stop offset="75%" stopColor="#cc2366" />
											<stop offset="100%" stopColor="#bc1888" />
										</linearGradient>
									</defs>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</span>
							<a
								href="https://www.instagram.com/pupa.ceramicas"
								target="_blank"
								rel="noopener noreferrer"
								className="text-neutral-dark text-sm hover:text-whatsapp transition-colors"
							>
								@pupa.ceramicas
							</a>
						</li>
					</ul>
				</div>

				{/* Right — WhatsApp form */}
				<div className="flex flex-col gap-5">
					{/* Temas rápidos */}
					<div className="flex flex-col gap-2">
						<p className="text-neutral-muted text-xs font-semibold tracking-widest uppercase">
							¿Sobre qué querés escribir?
						</p>
						<div className="flex flex-wrap gap-2">
							{topics.map((t) => (
								<button
									key={t}
									onClick={() => setMessage(t)}
									className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
										message === t
											? 'border-brand-pink bg-brand-pink text-white'
											: 'border-brand-pink-border text-neutral-muted hover:border-brand-pink hover:text-brand-pink'
									}`}
								>
									{t}
								</button>
							))}
						</div>
					</div>

					{/* Nombre */}
					<div className="flex flex-col gap-2">
						<label htmlFor="contact-name" className="text-neutral-dark text-sm font-medium">
							Tu nombre
						</label>
						<input
							id="contact-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="¿Cómo te llamás?"
							className="border border-brand-pink-border bg-white rounded-lg px-4 py-3 text-base text-neutral-dark placeholder:text-neutral-lightest focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink transition-colors"
						/>
					</div>

					{/* Mensaje */}
					<div className="flex flex-col gap-2">
						<label htmlFor="contact-message" className="text-neutral-dark text-sm font-medium">
							Tu mensaje
						</label>
						<textarea
							id="contact-message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Contanos qué tenés en mente..."
							rows={5}
							className="border border-brand-pink-border bg-white rounded-lg px-4 py-3 text-base text-neutral-dark placeholder:text-neutral-lightest focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink transition-colors resize-none"
						/>
					</div>

					{/* Preview del mensaje */}
					{canSend && (
						<div className="bg-white rounded-lg px-4 py-3 border border-brand-pink-border text-xs text-neutral-muted leading-relaxed">
							<span className="text-neutral-lighter uppercase tracking-widest text-[10px] font-semibold">Vista previa</span>
							<p className="mt-1 text-neutral-mid">
								¡Hola! Soy <strong>{name}</strong> y me comunico desde la web.
								<br />
								{message}
							</p>
						</div>
					)}

					<a
						href={canSend ? whatsappUrl : undefined}
						target="_blank"
						rel="noopener noreferrer"
						aria-disabled={!canSend}
						className={`flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold  tracking-wide transition-colors ${
							canSend
								? 'bg-whatsapp text-white hover:bg-whatsapp-hover cursor-pointer'
								: 'bg-brand-pink-border text-neutral-light pointer-events-none'
						}`}
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
							<path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.523 5.84L.057 23.5l5.822-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.713.974.99-3.614-.235-.373A9.818 9.818 0 1112 21.818z" />
						</svg>
						{canSend ? 'Enviar por WhatsApp' : 'Completá tu nombre y mensaje'}
					</a>
				</div>
			</div>
		</section>
	)
}
