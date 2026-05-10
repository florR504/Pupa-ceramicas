import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { uploadImage, deleteImage } from '@/lib/cloudinary'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const formData = await request.formData()
	const file = formData.get('image') as File | null
	if (!file || file.size === 0) return NextResponse.json({ error: 'Se requiere una imagen' }, { status: 400 })

	const imageUrl = await uploadImage(file)
	const workshop = String(formData.get('workshop') ?? '') || undefined

	const client = await clientPromise()
	const result = await client.db('Pupa_database').collection('students_work').insertOne({
		image: imageUrl,
		workshop,
		created_at: new Date(),
	})

	return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 })
}

export async function DELETE(request: Request) {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const { id, imageUrl } = await request.json()
	if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

	if (imageUrl) await deleteImage(imageUrl)

	const client = await clientPromise()
	await client.db('Pupa_database').collection('students_work').deleteOne({ _id: new ObjectId(id) })
	return NextResponse.json({ ok: true })
}
