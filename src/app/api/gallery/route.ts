import { NextResponse } from 'next/server'
import getMongoClient from '@/lib/mongodb'

export async function GET() {
	try {
		const client = await getMongoClient()
		const works = await client
			.db('Pupa_database')
			.collection('students_work')
			.find({})
			.sort({ created_at: -1 })
			.toArray()
		return NextResponse.json(works)
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
