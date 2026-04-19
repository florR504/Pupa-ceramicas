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
					className="w-full h-full min-h-[340px] bg-gradient-to-br from-[#8ECFC9]/60 to-[#F2A8C0]/40"
				/>
			</div>

			{/* Contenido */}
			<div className="w-full md:w-1/2 bg-[#8ECFC9] flex items-center">
				<div className="px-12 md:px-20 py-16 flex flex-col gap-7">
					<span className="text-white/80 text-[11px] font-semibold tracking-[0.4em] uppercase">
						Mi historia
					</span>

					<h2 className="text-white text-4xl md:text-[2.5rem] font-bold leading-[1.2]">
						Hola! Soy Angie,
						<br />
						artista de cerámica independiente
					</h2>

					<p className="text-[#E0F5F3] text-base leading-relaxed max-w-lg">
					   Hago piezas únicas y coloridas para que alegren tus días.
					</p>

					<p className="text-[#E0F5F3] text-base leading-relaxed max-w-lg">
					 	A traves de la arcilla puedo crear piezas que veo como lienzos en blanco para plasmar lo que siento, y compartirlo con aquellos que se sientan en resonancia con ellas 🫶🏻.
					</p>

					<div className="w-12 h-0.5 bg-[#F2A8C0]" />

					{/* Stats */}
					<div className="flex gap-12 flex-wrap">
						{stats.map((s) => (
							<div key={s.label} className="flex flex-col gap-1">
								<span className="text-white text-3xl font-bold">{s.value}</span>
								<span className="text-[#E0F5F3] text-sm">{s.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
