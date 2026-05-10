import { MongoClient } from 'mongodb'

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

let _clientPromise: Promise<MongoClient> | undefined

export default function getMongoClient(): Promise<MongoClient> {
	const uri = process.env.MONGODB_URI
	if (!uri) throw new Error('MONGODB_URI is not defined')

	if (process.env.NODE_ENV === 'development') {
		if (!global._mongoClientPromise) {
			global._mongoClientPromise = new MongoClient(uri).connect()
		}
		return global._mongoClientPromise
	}

	if (!_clientPromise) {
		_clientPromise = new MongoClient(uri).connect()
	}
	return _clientPromise
}
