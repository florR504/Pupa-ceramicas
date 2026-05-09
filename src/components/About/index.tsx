import Image from 'next/image'

const stats = [
	{ value: '5+', label: 'años de oficio' },
	{ value: '30+', label: 'piezas únicas' },
	{ value: '100%', label: 'hecho a mano' },
]

export default function About() {
	return (
		<section id="nosotros" className="flex flex-col md:flex-row w-full min-h-[600px]">
			{/* Imagen — reemplazar con foto del taller */}
			<div
				className="w-full md:w-1/2 min-h-[340px] md:min-h-full bg-cover bg-center"
				style={{ backgroundImage: "url('/about-studio.jpg')" }}
			>
				{/* Fallback si no hay imagen */}
				<Image
					src="/assets/images/logo_grande.jpeg"
					alt="About"
					width={1000}
					height={1000}
					className="w-full h-full min-h-[340px] bg-gradient-to-br from-brand-mint/60 to-brand-pink/40"
				/>
			</div>

			{/* Contenido */}
			<div className="w-full md:w-1/2 bg-brand-mint flex items-center">
				<div className="px-12 md:px-20 py-16 flex flex-col gap-7">
					<span className="text-white/80 text-[11px] font-semibold tracking-[0.4em] uppercase">
						Mi historia
					</span>

					<h2 className="text-white text-4xl md:text-[2.5rem] font-bold leading-[1.2]">
						Hola! Soy Angie,
						<br />
						artista ceramista independiente
					</h2>

					<p className="text-brand-mint-light text-base leading-relaxed max-w-lg">
						Soy la persona detrás de "Pupa Cerámicas". Amo hacer manualidades desde que tengo memoria y, aunque estudié otra carrera, hubo una parte de mí que siempre buscó volver a crear con las manos.
					</p>

					<p className="text-brand-mint-light text-base leading-relaxed max-w-lg">
						Éste emprendimiento surgió hace 4 años desde la necesidad personal de conectar conmigo misma y crear algo propio que disfrutase hacer todos los días.
					</p>
					<p className="text-brand-mint-light text-base leading-relaxed max-w-lg">
						Por eso, hoy, poder enfocarme en el diseño y creación artesanal de mis piezas me permite compartir mi arte con quienes se sienten identificados con mi historia y lo que hago.
						Gracias a tod@s los que apoyan mi arte y hacen posible que pueda seguir creando y creciendo en este proyecto tan personal ♡
					</p>

					<div className="w-12 h-0.5 bg-brand-pink" />

					{/* Stats */}
					<div className="flex gap-12 flex-wrap">
						{stats.map((s) => (
							<div key={s.label} className="flex flex-col gap-1">
								<span className="text-white text-3xl font-bold">{s.value}</span>
								<span className="text-brand-mint-light text-sm">{s.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
