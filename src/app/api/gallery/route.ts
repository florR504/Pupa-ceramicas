import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
	try {
		const client = await clientPromise
		const works = await client
			.db('Pupa_database')
			.collection('students_work')
			.find({})
			.sort({ created_at: -1 })
			.toArray()
		return NextResponse.json(works)
	} catch {
		return NextResponse.json({ error: 'Error al obtener galería' }, { status: 500 })
	}
}
