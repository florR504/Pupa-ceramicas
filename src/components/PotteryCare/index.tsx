import { Droplets, Utensils, Thermometer } from 'lucide-react'
import CareCard from './components/CareCard'

const careTips = [
	{
		icon: Droplets,
		title: 'Limpieza suave',
		text: 'Limpiar las piezas con un paño húmedo.',
	},
	{
		icon: Utensils,
		title: 'Vajilla',
		text: 'En caso de vajilla, usar agua tibia/caliente con jabón.',
	},
	{
		icon: Thermometer,
		title: 'Cambios de temperatura',
		text: 'Evitar cambios muy bruscos de temperatura para evitar un shock térmico, ya que podría ocasionar que las piezas craquelen y pierdan cierta hermeticidad.',
	},
]

export default function PotteryCare() {
	return (
		<section className="bg-white py-24 px-8 md:px-20">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<span className="text-brand-pink text-xs font-semibold tracking-[0.4em] uppercase">
						Cuidados
					</span>
					<h2 className="text-neutral-dark text-4xl font-bold mt-4">
						Cuidados de las piezas
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-7">
					{careTips.map((tip, i) => (
						<CareCard key={i} {...tip} delay={i * 150} />
					))}
				</div>
			</div>
		</section>
	)
}
