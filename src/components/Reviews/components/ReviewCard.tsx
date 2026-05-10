import StarRating from './StarRating'

interface ReviewCardProps {
	reviewer_name: string
	workshop: string
	rating: number
	comment: string
}

export default function ReviewCard({ reviewer_name, workshop, rating, comment }: ReviewCardProps) {
	return (
		<article className="bg-white rounded-xl border border-brand-pink/15 p-5 flex flex-col gap-3">
			<StarRating value={rating} />
			<p className="text-neutral-dark text-sm leading-relaxed">"{comment}"</p>
			<div className="flex items-center gap-2">
				<p className="text-neutral-dark text-sm font-semibold">{reviewer_name}</p>
				<span className="text-neutral-muted text-xs">· {workshop}</span>
			</div>
		</article>
	)
}
