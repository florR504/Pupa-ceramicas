'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
	value: number
	onChange?: (v: number) => void
}

export default function StarRating({ value, onChange }: StarRatingProps) {
	const [hovered, setHovered] = useState(0)
	const active = hovered || value
	return (
		<div className="flex gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<button
					key={i}
					type="button"
					onClick={() => onChange?.(i + 1)}
					onMouseEnter={() => onChange && setHovered(i + 1)}
					onMouseLeave={() => onChange && setHovered(0)}
					className={onChange ? 'cursor-pointer' : 'cursor-default'}
				>
					<Star
						size={onChange ? 22 : 13}
						className={i < active ? 'text-amber-400 fill-amber-400' : 'text-neutral-300 fill-neutral-200'}
					/>
				</button>
			))}
		</div>
	)
}
