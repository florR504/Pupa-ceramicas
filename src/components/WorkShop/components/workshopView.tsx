export default function WorkshopView() {
	return (
		<div className="relative w-full h-[420px] overflow-hidden rounded-2xl">
			{/* Video de fondo */}
			<video
				className="absolute inset-0 w-full h-full object-cover"
				src="/assets/videos/taller.mp4"
				autoPlay
				muted
				loop
				playsInline
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

			{/* Contenido */}
			<div className="relative z-10 flex flex-col items-center justify-end h-full pb-12 px-8 text-center">
				<span className="text-[#8ECFC9] text-xs font-semibold tracking-[0.4em] uppercase mb-3">
					♡ Conocé nuestro espacio ♡
				</span>
				<h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
					Nuestro hermoso taller
				</h2>
				<span className="text-white text-sm font-semibold tracking-[0.4em] uppercase mt-3">
					Estamos en Caballito, entre Felipe Vallese y Av. Acoyte 
				</span>
			</div>
		</div>
	)
}
