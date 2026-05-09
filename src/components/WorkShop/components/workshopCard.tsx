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
	whatsappUrl: string
	delay?: number
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
	whatsappUrl,
	delay = 0,
}: WorkshopCardProps) {
	return (
		<article
			data-reveal="right"
			style={{ transitionDelay: `${delay}ms` }}
			className={`rounded-xl flex flex-col overflow-hidden ${
				featured ? 'bg-brand-mint shadow-lg' : 'bg-white border border-brand-pink-border'
			}`}
		>
			<div className="flex flex-col gap-4 p-7 flex-1">
				<span className={`self-start text-[11px] font-semibold px-4 py-1.5 rounded-full ${badgeColor}`}>
					{badge}
				</span>

				<h3 className={`text-xl font-bold ${featured ? 'text-white' : 'text-neutral-dark'}`}>
					{name}
				</h3>

				<p className={`text-sm leading-relaxed ${featured ? 'text-brand-mint-light' : 'text-neutral-muted'}`}>
					{description}
				</p>

				<hr className={featured ? 'border-white/20' : 'border-brand-pink-border-subtle'} />

				<ul className="flex flex-col gap-2.5">
					{details.map((d) => (
						<li key={d} className="flex items-center gap-2.5">
							<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${featured ? 'bg-white' : 'bg-brand-mint'}`} />
							<span className={`text-sm ${featured ? 'text-brand-mint-light' : 'text-neutral-mid'}`}>{d}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Footer */}
			<div className={`flex items-center justify-between px-7 py-5 ${featured ? 'border-t border-white/20' : 'border-t border-brand-pink-border-subtle'}`}>
				<div>
					<p className={`text-[11px] ${featured ? 'text-brand-mint-muted' : 'text-neutral-light'}`}>
						{priceLabel}
					</p>
					<p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-brand-pink'}`}>
						{price}
					</p>
				</div>
				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-colors ${
						featured
							? 'bg-white text-brand-mint hover:bg-white/90'
							: 'bg-brand-pink text-white hover:bg-brand-pink-hover'
					}`}
				>
					{cta}
				</a>
			</div>
		</article>
	)
}
