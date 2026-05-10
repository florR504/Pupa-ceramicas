'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Check, X, LogOut, Package, Star } from 'lucide-react'
import { type Product } from '@/types/product'

interface Review {
	_id: string
	reviewer_name: string
	workshop: string
	rating: number
	comment: string
	created_at: string
}

const EMPTY_FORM = { name: '', category: '', description: '', price: '', dimensions: '', material: '', stock: '', imageUrl: '' }

export default function AdminDashboard() {
	const router = useRouter()
	const [tab, setTab] = useState<'products' | 'reviews'>('products')

	// Products
	const [products, setProducts] = useState<Product[]>([])
	const [productsLoading, setProductsLoading] = useState(true)
	const [showForm, setShowForm] = useState(false)
	const [editing, setEditing] = useState<Product | null>(null)
	const [form, setForm] = useState(EMPTY_FORM)
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string>('')
	const [saving, setSaving] = useState(false)
	const [deletingId, setDeletingId] = useState<string | null>(null)
	const fileRef = useRef<HTMLInputElement>(null)

	// Reviews
	const [reviews, setReviews] = useState<Review[]>([])
	const [reviewsLoading, setReviewsLoading] = useState(true)
	const [processingId, setProcessingId] = useState<string | null>(null)

	useEffect(() => { loadProducts() }, [])
	useEffect(() => { if (tab === 'reviews') loadReviews() }, [tab])

	async function loadProducts() {
		setProductsLoading(true)
		const res = await fetch('/api/admin/products')
		if (res.status === 401) { router.push('/admin'); return }
		setProducts(await res.json())
		setProductsLoading(false)
	}

	async function loadReviews() {
		setReviewsLoading(true)
		const res = await fetch('/api/admin/reviews')
		if (res.ok) setReviews(await res.json())
		setReviewsLoading(false)
	}

	function openCreate() {
		setEditing(null)
		setForm(EMPTY_FORM)
		setImageFile(null)
		setImagePreview('')
		setShowForm(true)
	}

	function openEdit(product: Product) {
		setEditing(product)
		setForm({
			name: product.name,
			category: product.category,
			description: product.description,
			price: product.price,
			dimensions: product.dimensions ?? '',
			material: product.material ?? '',
			stock: product.stock ?? '',
			imageUrl: product.image,
		})
		setImageFile(null)
		setImagePreview(product.image)
		setShowForm(true)
	}

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return
		setImageFile(file)
		setImagePreview(URL.createObjectURL(file))
	}

	async function handleSave(e: React.FormEvent) {
		e.preventDefault()
		setSaving(true)

		const fd = new FormData()
		Object.entries(form).forEach(([k, v]) => fd.append(k, v))
		if (imageFile) fd.append('image', imageFile)
		if (editing?._id) fd.append('id', editing._id)

		const res = await fetch('/api/admin/products', {
			method: editing ? 'PUT' : 'POST',
			body: fd,
		})

		if (res.ok) {
			setShowForm(false)
			loadProducts()
		}
		setSaving(false)
	}

	async function handleDelete(id: string) {
		if (!confirm('¿Eliminar este producto?')) return
		setDeletingId(id)
		await fetch('/api/admin/products', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		})
		setDeletingId(null)
		loadProducts()
	}

	async function handleReview(id: string, action: 'approve' | 'reject') {
		setProcessingId(id)
		await fetch('/api/admin/reviews', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, action }),
		})
		setProcessingId(null)
		loadReviews()
	}

	async function handleLogout() {
		await fetch('/api/admin/logout', { method: 'POST' })
		router.push('/admin')
	}

	return (
		<main className="min-h-screen bg-neutral-surface">
			{/* Header */}
			<header className="bg-white border-b border-brand-pink/20 px-6 py-4 flex items-center justify-between">
				<h1 className="text-neutral-dark font-bold text-lg">Panel de administración</h1>
				<button onClick={handleLogout} className="flex items-center gap-2 text-neutral-muted hover:text-neutral-dark text-sm transition-colors cursor-pointer">
					<LogOut size={16} />
					Salir
				</button>
			</header>

			<div className="max-w-5xl mx-auto px-4 py-8">
				{/* Tabs */}
				<div className="flex gap-2 mb-8">
					<button
						onClick={() => setTab('products')}
						className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${tab === 'products' ? 'bg-brand-pink text-white' : 'bg-white text-neutral-muted hover:text-neutral-dark border border-brand-pink-border'}`}
					>
						<Package size={16} />
						Productos
					</button>
					<button
						onClick={() => setTab('reviews')}
						className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${tab === 'reviews' ? 'bg-brand-pink text-white' : 'bg-white text-neutral-muted hover:text-neutral-dark border border-brand-pink-border'}`}
					>
						<Star size={16} />
						Reseñas pendientes
						{reviews.length > 0 && <span className="bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{reviews.length}</span>}
					</button>
				</div>

				{/* Products tab */}
				{tab === 'products' && (
					<div>
						<div className="flex justify-between items-center mb-5">
							<p className="text-neutral-muted text-sm">{products.length} productos</p>
							<button onClick={openCreate} className="flex items-center gap-2 bg-brand-pink text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-pink/90 transition-colors cursor-pointer">
								<Plus size={16} />
								Nuevo producto
							</button>
						</div>

						{productsLoading ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{Array.from({ length: 4 }).map((_, i) => (
									<div key={i} className="bg-white rounded-xl h-28 animate-pulse" />
								))}
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{products.map((p) => (
									<div key={p._id} className="bg-white rounded-xl border border-brand-pink/10 p-4 flex gap-4 items-center">
										<img
											src={p.image}
											alt={p.name}
											className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<p className="text-neutral-dark font-medium text-sm truncate">{p.name}</p>
											<p className="text-neutral-muted text-xs">{p.category}</p>
											<p className="text-brand-pink text-sm font-semibold mt-1">{p.price}</p>
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-brand-pink-border flex items-center justify-center text-neutral-muted hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-colors cursor-pointer">
												<Pencil size={14} />
											</button>
											<button
												onClick={() => handleDelete(p._id!)}
												disabled={deletingId === p._id}
												className="w-8 h-8 rounded-lg border border-brand-pink-border flex items-center justify-center text-neutral-muted hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors cursor-pointer disabled:opacity-40"
											>
												<Trash2 size={14} />
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* Reviews tab */}
				{tab === 'reviews' && (
					<div>
						{reviewsLoading ? (
							<div className="flex flex-col gap-4">
								{Array.from({ length: 3 }).map((_, i) => (
									<div key={i} className="bg-white rounded-xl h-32 animate-pulse" />
								))}
							</div>
						) : reviews.length === 0 ? (
							<div className="bg-white rounded-xl border border-brand-pink/10 p-12 text-center">
								<Star size={32} className="text-brand-pink-border mx-auto mb-3" />
								<p className="text-neutral-muted text-sm">No hay reseñas pendientes de aprobación</p>
							</div>
						) : (
							<div className="flex flex-col gap-4">
								{reviews.map((r) => (
									<div key={r._id} className="bg-white rounded-xl border border-brand-pink/10 p-5">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1">
													<p className="text-neutral-dark font-medium text-sm">{r.reviewer_name}</p>
													<span className="text-neutral-muted text-xs">·</span>
													<p className="text-neutral-muted text-xs">{r.workshop}</p>
												</div>
												<div className="flex gap-0.5 mb-2">
													{Array.from({ length: 5 }).map((_, i) => (
														<Star key={i} size={12} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-surface fill-neutral-surface'} />
													))}
												</div>
												<p className="text-neutral-muted text-sm leading-relaxed">{r.comment}</p>
											</div>
											<div className="flex gap-2 flex-shrink-0">
												<button
													onClick={() => handleReview(r._id, 'approve')}
													disabled={processingId === r._id}
													className="w-9 h-9 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-colors cursor-pointer disabled:opacity-40"
												>
													<Check size={16} />
												</button>
												<button
													onClick={() => handleReview(r._id, 'reject')}
													disabled={processingId === r._id}
													className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors cursor-pointer disabled:opacity-40"
												>
													<X size={16} />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Product form modal */}
			{showForm && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
					<div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
						<div className="p-6 border-b border-brand-pink/10 flex items-center justify-between">
							<h2 className="text-neutral-dark font-bold">{editing ? 'Editar producto' : 'Nuevo producto'}</h2>
							<button onClick={() => setShowForm(false)} className="text-neutral-muted hover:text-neutral-dark cursor-pointer">
								<X size={20} />
							</button>
						</div>
						<form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
							{/* Image upload */}
							<div>
								<label className="text-neutral-dark text-sm font-medium block mb-2">Imagen</label>
								<div
									onClick={() => fileRef.current?.click()}
									className="w-full h-40 rounded-xl border-2 border-dashed border-brand-pink-border flex items-center justify-center cursor-pointer hover:border-brand-pink transition-colors overflow-hidden"
								>
									{imagePreview ? (
										<img src={imagePreview} alt="" className="w-full h-full object-cover" />
									) : (
										<div className="text-center">
											<Plus size={24} className="text-brand-pink-border mx-auto mb-1" />
											<p className="text-neutral-muted text-xs">Hacé click para subir una imagen</p>
										</div>
									)}
								</div>
								<input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
							</div>

							<Field label="Nombre *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
							<Field label="Categoría *" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required placeholder="Ej: Tazas, Sahumerios..." />
							<Field label="Descripción *" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required textarea />
							<Field label="Precio *" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required placeholder="Ej: $8500" />
							<div className="grid grid-cols-2 gap-4">
								<Field label="Dimensiones" value={form.dimensions} onChange={(v) => setForm({ ...form, dimensions: v })} placeholder="Ej: 10 x 8 cm" />
								<Field label="Material" value={form.material} onChange={(v) => setForm({ ...form, material: v })} placeholder="Ej: Cerámica" />
							</div>
							<Field label="Stock" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} placeholder="Ej: Disponible, Sin stock..." />

							<div className="flex gap-3 mt-2">
								<button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-brand-pink-border rounded-lg py-2.5 text-sm text-neutral-muted hover:text-neutral-dark transition-colors cursor-pointer">
									Cancelar
								</button>
								<button type="submit" disabled={saving} className="flex-1 bg-brand-pink text-white rounded-lg py-2.5 text-sm font-medium hover:bg-brand-pink/90 transition-colors disabled:opacity-50 cursor-pointer">
									{saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear producto'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</main>
	)
}

function Field({ label, value, onChange, required, placeholder, textarea }: {
	label: string
	value: string
	onChange: (v: string) => void
	required?: boolean
	placeholder?: string
	textarea?: boolean
}) {
	const cls = "w-full border border-brand-pink-border rounded-lg px-3 py-2.5 text-sm text-neutral-dark placeholder:text-neutral-muted focus:outline-none focus:border-brand-pink transition-colors"
	return (
		<div>
			<label className="text-neutral-dark text-sm font-medium block mb-1.5">{label}</label>
			{textarea ? (
				<textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} rows={3} className={cls} />
			) : (
				<input type="text" value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className={cls} />
			)}
		</div>
	)
}
