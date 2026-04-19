import WorkshopCard from './components/workshopCard'
import WorkshopView from './components/workshopView'

const workshops = [
	{
		badge: 'No hace falta experiencia',
		badgeColor: 'text-[#F2A8C0] bg-[#F2A8C0]/10',
		name: 'Clase de prueba',
		description:
			'Perfecta para quienes tienen dudas de si la ceramica es lo suyo. Te ofrezco una clase de prueba para que puedas conocer el proceso y ver si te gusta antes de anotarte en el taller!',
		details: ['Duración: 3 horas', 'Plazas: máx. 6 personas', 'Materiales incluidos'],
		price: 'Gratis!',
		priceLabel: 'por persona',
		cta: 'Anotarme',
		featured: false,
	},
	{
		badge: 'No hace falta experiencia',
		badgeColor: 'text-white bg-white/20',
		name: 'Taller de ceramica',
		description:
			'Un taller para aprender a moldear tu propia pieza de ceramica. Te enseño los fundamentos  y te ayudo a crear tu pieza!',
		details: ['Duración: 3 horas', 'Plazas: máx. 6 personas', 'Materiales incluidos', 'Tecnicas: pellizco, chorizo, plancha, modelado', 'Pintura: engobes, acuarelas, pigmentos, esmaltes'],
		price: '81.500$',
		priceLabel: 'por persona',
		cta: 'Anotarme',
		featured: true,
	}
]

export default function Workshops() {
	return (
		<section id="talleres" className="bg-[#F0FAFA] py-24 px-8 md:px-20">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<span className="text-[#8ECFC9] text-xs font-semibold tracking-[0.4em] uppercase">
						Talleres
					</span>
					<h2 className="text-[#444444] text-4xl md:text-[2.75rem] font-bold leading-[1.2] mt-4 mb-5">
						Reserva tu lugar
						<br />
						y empecemos a crear juntos!
					</h2>
					<p className="text-[#888888] text-base leading-relaxed max-w-lg mx-auto">
						Clases pequeñas, ambiente relajado, atencion personalizada y mucho barro. No hace falta experiencia
						— solo ganas de crear.
					</p>
				</div>

				{/* Video taller */}
				<div className="mb-10">
					<WorkshopView />
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
					{workshops.map((w) => (
						<WorkshopCard key={w.name} {...w} />
					))}
				</div>

				{/* Nota */}
				<div className="bg-white border border-[#F2A8C0]/30 rounded-xl px-8 py-5 text-center">
					<p className="text-[#666666] text-sm leading-relaxed">
						✨ Todos los talleres incluyen el material. Te llevas tu pieza a casa una
						vez cocida (aprox. 4 semanas después). ¡Sin experiencia previa necesaria!
					</p>
				</div>
			</div>
		</section>
	)
}
