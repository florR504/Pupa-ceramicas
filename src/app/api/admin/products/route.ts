import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { uploadImage } from '@/lib/cloudinary'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const client = await clientPromise
	const products = await client.db('Pupa_database').collection('products').find({}).toArray()
	return NextResponse.json(products)
}

export async function POST(request: Request) {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const formData = await request.formData()
	const file = formData.get('image') as File | null

	let imageUrl = formData.get('imageUrl') as string | null

	if (file && file.size > 0) {
		imageUrl = await uploadImage(file)
	}

	if (!imageUrl) return NextResponse.json({ error: 'Se requiere una imagen' }, { status: 400 })

	const product = {
		name: String(formData.get('name') ?? ''),
		category: String(formData.get('category') ?? ''),
		description: String(formData.get('description') ?? ''),
		price: String(formData.get('price') ?? ''),
		image: imageUrl,
		dimensions: String(formData.get('dimensions') ?? '') || undefined,
		material: String(formData.get('material') ?? '') || undefined,
		stock: String(formData.get('stock') ?? '') || undefined,
	}

	if (!product.name || !product.category || !product.description || !product.price) {
		return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
	}

	const client = await clientPromise
	const result = await client.db('Pupa_database').collection('products').insertOne(product)
	return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 })
}

export async function PUT(request: Request) {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const formData = await request.formData()
	const id = formData.get('id') as string
	if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

	const file = formData.get('image') as File | null
	let imageUrl = formData.get('imageUrl') as string | null

	if (file && file.size > 0) {
		imageUrl = await uploadImage(file)
	}

	const updates: Record<string, string | undefined> = {
		name: String(formData.get('name') ?? ''),
		category: String(formData.get('category') ?? ''),
		description: String(formData.get('description') ?? ''),
		price: String(formData.get('price') ?? ''),
		dimensions: String(formData.get('dimensions') ?? '') || undefined,
		material: String(formData.get('material') ?? '') || undefined,
		stock: String(formData.get('stock') ?? '') || undefined,
	}
	if (imageUrl) updates.image = imageUrl

	const client = await clientPromise
	await client.db('Pupa_database').collection('products').updateOne(
		{ _id: new ObjectId(id) },
		{ $set: updates }
	)
	return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request) {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const { id } = await request.json()
	if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

	const client = await clientPromise
	await client.db('Pupa_database').collection('products').deleteOne({ _id: new ObjectId(id) })
	return NextResponse.json({ ok: true })
}
