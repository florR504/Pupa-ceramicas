interface WorkshopCardProps {
	badge: string
	badgeColor: string
	name: string
	description: string
	details: string[]
	price: string
	priceLabel: string
	cta: string
	featured: boolean
}

export default function WorkshopCard({
	badge,
	badgeColor,
	name,
	description,
	details,
	price,
	priceLabel,
	cta,
	featured,
}: WorkshopCardProps) {
	return (
		<article
			className={`rounded-xl flex flex-col overflow-hidden ${
				featured ? 'bg-[#8ECFC9] shadow-lg' : 'bg-white border border-[#E8D5E0]'
			}`}
		>
			<div className="flex flex-col gap-4 p-7 flex-1">
				<span className={`self-start text-[11px] font-semibold px-4 py-1.5 rounded-full ${badgeColor}`}>
					{badge}
				</span>

				<h3 className={`text-xl font-bold ${featured ? 'text-white' : 'text-[#444444]'}`}>
					{name}
				</h3>

				<p className={`text-sm leading-relaxed ${featured ? 'text-[#E0F5F3]' : 'text-[#888888]'}`}>
					{description}
				</p>

				<hr className={featured ? 'border-white/20' : 'border-[#F0E8EC]'} />

				<ul className="flex flex-col gap-2.5">
					{details.map((d) => (
						<li key={d} className="flex items-center gap-2.5">
							<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${featured ? 'bg-white' : 'bg-[#8ECFC9]'}`} />
							<span className={`text-sm ${featured ? 'text-[#E8F8F7]' : 'text-[#666666]'}`}>{d}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Footer */}
			<div className={`flex items-center justify-between px-7 py-5 ${featured ? 'border-t border-white/20' : 'border-t border-[#F0E8EC]'}`}>
				<div>
					<p className={`text-[11px] ${featured ? 'text-[#C8EEEC]' : 'text-[#AAAAAA]'}`}>
						{priceLabel}
					</p>
					<p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-[#F2A8C0]'}`}>
						{price}
					</p>
				</div>
				<button
					className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-colors ${
						featured
							? 'bg-white text-[#8ECFC9] hover:bg-white/90'
							: 'bg-[#F2A8C0] text-white hover:bg-[#e898b0]'
					}`}
				>
					{cta}
				</button>
			</div>
		</article>
	)
}
