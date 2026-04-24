interface ProductCardProps {
	category: string
	name: string
	description: string
	price: string
	image: string
	width: number
	onClick: () => void
}

export default function ProductCard({ category, name, description, price, image, width, onClick }: ProductCardProps) {
	return (
		<article className="flex-shrink-0 px-0 md:px-4" style={{ width: `${width}%` }}>
			<div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
				<div className="w-full h-72 bg-[#F0FAFA] overflow-hidden">
					<div
						className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
						style={{ backgroundImage: `url('${image}')` }}
					/>
				</div>
				<div className="p-6 flex flex-col gap-2">
					<span className="text-[#8ECFC9] text-[11px] font-semibold tracking-[0.2em] uppercase">
						{category}
					</span>
					<h3 className="text-[#444444] text-xl font-semibold">{name}</h3>
					<p className="text-[#888888] text-sm leading-relaxed">{description}</p>
					<div className="flex items-center justify-between mt-3">
						<span className="text-[#F2A8C0] text-2xl font-bold">{price}</span>
						<button
						onClick={onClick}
						className="text-sm text-[#444444] border border-[#E8D5E0] px-4 py-2 rounded-full hover:bg-[#F2A8C0] hover:text-white hover:border-[#F2A8C0] transition-colors"
					>
							Ver pieza
						</button>
					</div>
				</div>
			</div>
		</article>
	)
}
