import { NextResponse } from 'next/server'
import getMongoClient from '@/lib/mongodb'

export async function GET() {
	try {
		const client = await getMongoClient()
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
