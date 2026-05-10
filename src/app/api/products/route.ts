import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
	try {
		const client = await clientPromise
		const products = await client
			.db('Pupa_database')
			.collection('products')
			.find({})
			.toArray()

		return NextResponse.json(products)
	} catch {
		return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
	}
}
