import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File): Promise<string> {
	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)
	const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

	const result = await cloudinary.uploader.upload(base64, {
		folder: 'pupa',
		transformation: [{ quality: 'auto', fetch_format: 'auto' }],
	})

	return result.secure_url
}

export async function deleteImage(url: string): Promise<void> {
	const match = url.match(/\/pupa\/([^/.]+)/)
	if (!match) return
	await cloudinary.uploader.destroy(`pupa/${match[1]}`)
}
