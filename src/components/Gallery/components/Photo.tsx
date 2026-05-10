import Image from 'next/image'

interface PhotoProps {
	src: string
	alt: string
	workshop?: string
	className?: string
	onClick: () => void
}

export default function Photo({ src, alt, workshop, className, onClick }: PhotoProps) {
	return (
		<div
			className={`relative overflow-hidden rounded-2xl cursor-zoom-in group ${className}`}
			onClick={onClick}
		>
			<Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" />
			{workshop && (
				<span className="absolute top-3 left-3 bg-black/35 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
					{workshop}
				</span>
			)}
			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
		</div>
	)
}
