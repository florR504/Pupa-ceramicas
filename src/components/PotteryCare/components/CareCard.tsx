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
			className="group bg-white border border-[#F2A8C0] rounded-xl p-7 flex flex-col gap-4 h-full
				transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F2A8C0]/20 hover:border-[#F2A8C0] hover:bg-[#FFF5F8]"
		>
			<div className="w-10 h-10 rounded-full bg-[#F2A8C0]/15 flex items-center justify-center
				transition-colors duration-300 group-hover:bg-[#F2A8C0]/25">
				<Icon size={20} className="text-[#F2A8C0]" strokeWidth={1.75} />
			</div>
			<h3 className="text-[#444444] text-base font-semibold">{title}</h3>
			<p className="text-[#888888] text-sm leading-relaxed">{text}</p>
		</article>
	)
}
