'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { type StudentWork } from '@/types/student-work'

interface LightboxProps {
	photo: StudentWork
	onClose: () => void
}

export default function Lightbox({ photo, onClose }: LightboxProps) {
	const close = useCallback(onClose, [onClose])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
		document.addEventListener('keydown', onKey)
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', onKey)
			document.body.style.overflow = ''
		}
	}, [close])

	return (
		<div
			className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
			onClick={close}
		>
			<button
				onClick={close}
				className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
			>
				<X size={20} />
			</button>

			<div
				className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<Image
					src={photo.image}
					alt="Trabajo alumno"
					width={1200}
					height={900}
					className="w-full h-full object-contain max-h-[85vh]"
				/>
				{photo.workshop && (
					<span className="absolute bottom-4 left-4 bg-black/50 text-white text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-sm">
						{photo.workshop}
					</span>
				)}
			</div>
		</div>
	)
}
