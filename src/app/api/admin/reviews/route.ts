import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const client = await clientPromise
	const reviews = await client
		.db('Pupa_database')
		.collection('reviews')
		.find({ approved: false })
		.sort({ created_at: -1 })
		.toArray()
	return NextResponse.json(reviews)
}

export async function PATCH(request: Request) {
	if (!await isAuthenticated()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

	const { id, action } = await request.json()
	if (!id || !['approve', 'reject'].includes(action)) {
		return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
	}

	const client = await clientPromise
	const collection = client.db('Pupa_database').collection('reviews')

	if (action === 'approve') {
		await collection.updateOne({ _id: new ObjectId(id) }, { $set: { approved: true } })
	} else {
		await collection.deleteOne({ _id: new ObjectId(id) })
	}

	return NextResponse.json({ ok: true })
}
