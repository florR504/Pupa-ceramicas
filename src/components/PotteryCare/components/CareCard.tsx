interface CareCardProps {
	text: string
	delay?: number
}

export default function CareCard({ text, delay = 0 }: CareCardProps) {
	return (
		<article
			data-reveal="right"
			style={{ transitionDelay: `${delay}ms` }}
			className="bg-white border border-[#F2A8C0] rounded-xl p-7 flex flex-col gap-4 h-full"
		>
			<span className="w-2.5 h-2.5 rounded-full bg-[#F2A8C0] flex-shrink-0" />
			<p className="text-[#444444] text-sm leading-relaxed">{text}</p>
		</article>
	)
}
