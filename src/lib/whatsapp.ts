import { type CartItem } from '@/context/cart'
import { type Product } from '@/types/product'
import { STORE_WHATSAPP } from '@/config/store'

function buildUrl(message: string): string {
	return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`
}

export function cartWhatsAppUrl(items: CartItem[]): string {
	const lines = items.map(({ product, quantity }) => {
		const lineTotal = parsePrice(product.price) * quantity
		return `• ${product.name} (${product.category}) x${quantity} — €${lineTotal}`
	})

	const total = items.reduce(
		(sum, { product, quantity }) => sum + parsePrice(product.price) * quantity,
		0
	)

	const message = [
		'¡Hola! Me gustaría hacer el siguiente pedido desde la web:',
		'',
		'🛒 *Pedido:*',
		...lines,
		'',
		`*Total estimado: €${total}*`,
		'',
		'¿Podría confirmarme disponibilidad y próximos pasos? ¡Gracias! 🌿',
	].join('\n')

	return buildUrl(message)
}

export function productWhatsAppUrl(product: Product): string {
	const details: string[] = []
	if (product.dimensions) details.push(`📐 Dimensiones: ${product.dimensions}`)
	if (product.material) details.push(`🏺 Material: ${product.material}`)
	if (product.stock) details.push(`📦 Stock: ${product.stock}`)

	const message = [
		`¡Hola! Me interesa la pieza *"${product.name}"* (${product.category}) que vi en la web.`,
		'',
		`💰 Precio: ${product.price}`,
		...details,
		'',
		'¿Podría contarme más detalles? ¡Gracias! 🌿',
	].join('\n')

	return buildUrl(message)
}

export function contactWhatsAppUrl(senderName: string, message: string): string {
	const text = [
		`¡Hola! Soy *${senderName}* y me comunico desde la web.`,
		'',
		message,
	].join('\n')

	return buildUrl(text)
}

export function workshopWhatsAppUrl(name: string, type: 'inquiry' | 'signup' | 'kids'): string {
	const message =
		type === 'inquiry'
			? `¡Hola! Vi la *clase de prueba gratuita* en la web y me gustaría saber más información. ¿Cuándo son las próximas fechas disponibles? ¡Gracias! 🌿`
			: type === 'kids'
			? `¡Hola! Vi el *${name}* en la web y me gustaría anotar a mi hijo/a. ¿Cuándo son las próximas fechas, cuál es el rango de edad y cómo reservo el lugar? ¡Gracias! 🌿`
			: `¡Hola! Me gustaría *anotarme al ${name}* que vi en la web. ¿Cuándo son las próximas fechas y cómo reservo mi lugar? ¡Gracias! 🌿`

	return buildUrl(message)
}

function parsePrice(price: string): number {
	return parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}
