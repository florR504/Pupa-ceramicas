import WorkshopCard from './components/workshopCard'
import WorkshopView from './components/workshopView'
import { workshopWhatsAppUrl } from '@/lib/whatsapp'

const workshops = [
	{
		badge: 'No hace falta experiencia',
		badgeColor: 'text-brand-pink bg-brand-pink/10',
		name: 'Clase de prueba',
		description:
			'Perfecta para quienes tienen dudas de si la ceramica es lo suyo. Te ofrezco una clase de prueba para que puedas conocer el proceso y ver si te gusta antes de anotarte en el taller!',
		details: ['Duración: 3 horas', 'Plazas: máx. 5 personas', 'Materiales y horneado incluidos', '4 clases mensuales'],
		price: '19500$',
		priceLabel: 'por persona',
		cta: 'Quiero saber más',
		featured: false,
		whatsappUrl: workshopWhatsAppUrl('Clase de prueba', 'inquiry'),
	},
	{
		badge: 'No hace falta experiencia',
		badgeColor: 'text-white bg-white/20',
		name: 'Taller de ceramica',
		description:
			'Un taller para aprender a moldear tu propia pieza de ceramica. Te enseño los fundamentos  y te ayudo a crear tu pieza!',
		details: ['Duración: 3 horas', 'Plazas: máx. 5 personas', 'Materiales y horneado incluidos', 'Tecnicas: pellizco, chorizo, plancha, modelado', 'Pintura: engobes, acuarelas, pigmentos, esmaltes', '4 clases mensuales'],
		price: '81.500$',
		priceLabel: 'por persona',
		cta: 'Anotarme',
		featured: true,
		whatsappUrl: workshopWhatsAppUrl('Taller de ceramica', 'signup'),
	}
]

export default function Workshops() {
	return (
		<section id="talleres" className="bg-brand-mint-bg py-24 px-8 md:px-20">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<span className="text-brand-mint text-xs font-semibold tracking-[0.4em] uppercase">
						Talleres
					</span>
					<h2 className="text-neutral-dark text-4xl md:text-[2.75rem] font-bold leading-[1.2] mt-4 mb-5">
						Reserva tu lugar
						<br />
						y empecemos a crear juntos!
					</h2>
					<p className="text-neutral-muted text-base leading-relaxed max-w-lg mx-auto">
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
					{workshops.map((w, i) => (
						<WorkshopCard key={w.name} {...w} delay={i * 150} />
					))}
				</div>

				{/* Nota */}
				<div className="bg-white border border-brand-pink/30 rounded-xl px-8 py-5 text-center">
					<p className="text-neutral-mid text-sm leading-relaxed">
						✨ Todos los talleres incluyen el material. Te llevas tu pieza a casa una
						vez cocida (aprox. 4 semanas después). ¡Sin experiencia previa necesaria!
					</p>
				</div>
			</div>
		</section>
	)
}
