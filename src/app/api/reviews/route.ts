import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
	try {
		const client = await clientPromise
		const reviews = await client
			.db('Pupa_database')
			.collection('reviews')
			.find({ approved: true })
			.sort({ created_at: -1 })
			.toArray()

		return NextResponse.json(reviews)
	} catch {
		return NextResponse.json({ error: 'Error al obtener reseñas' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { reviewer_name, workshop, rating, comment } = body

		if (!reviewer_name || !workshop || !rating || !comment) {
			return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
		}

		if (rating < 1 || rating > 5) {
			return NextResponse.json({ error: 'La puntuación debe ser entre 1 y 5' }, { status: 400 })
		}

		const client = await clientPromise
		await client.db('Pupa_database').collection('reviews').insertOne({
			reviewer_name: String(reviewer_name).slice(0, 100),
			workshop: String(workshop).slice(0, 100),
			rating: Number(rating),
			comment: String(comment).slice(0, 1000),
			approved: false,
			created_at: new Date(),
		})

		return NextResponse.json({ ok: true }, { status: 201 })
	} catch {
		return NextResponse.json({ error: 'Error al guardar la reseña' }, { status: 500 })
	}
}
