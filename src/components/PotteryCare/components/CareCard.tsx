import { LucideIcon } from 'lucide-react'

interface CareCardProps {
	icon: LucideIcon
	title: string
	text: string
	delay?: number
}

export default function CareCard({ icon: Icon, title, text, delay = 0 }: CareCardProps) {
	return (
		<article
			data-reveal="right"
			style={{ transitionDelay: `${delay}ms` }}
			className="group bg-white border border-brand-pink rounded-xl p-7 flex flex-col gap-4 h-full
				transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-pink/20 hover:border-brand-pink hover:bg-brand-pink-subtle"
		>
			<div className="w-10 h-10 rounded-full bg-brand-pink/15 flex items-center justify-center
				transition-colors duration-300 group-hover:bg-brand-pink/25">
				<Icon size={20} className="text-brand-pink" strokeWidth={1.75} />
			</div>
			<h3 className="text-neutral-dark text-base font-semibold">{title}</h3>
			<p className="text-neutral-muted text-sm leading-relaxed">{text}</p>
		</article>
	)
}
