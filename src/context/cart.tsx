'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Product } from '@/types/product'

export interface CartItem {
	product: Product
	quantity: number
}

interface CartContextValue {
	items: CartItem[]
	addItem: (product: Product) => void
	removeItem: (name: string) => void
	updateQuantity: (name: string, quantity: number) => void
	totalItems: number
	isOpen: boolean
	openCart: () => void
	closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be used within CartProvider')
	return ctx
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])
	const [isOpen, setIsOpen] = useState(false)

	const addItem = (product: Product) => {
		setItems((prev) => {
			const existing = prev.find((i) => i.product.name === product.name)
			if (existing) {
				return prev.map((i) =>
					i.product.name === product.name ? { ...i, quantity: i.quantity + 1 } : i
				)
			}
			return [...prev, { product, quantity: 1 }]
		})
	}

	const removeItem = (name: string) => {
		setItems((prev) => prev.filter((i) => i.product.name !== name))
	}

	const updateQuantity = (name: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(name)
			return
		}
		setItems((prev) =>
			prev.map((i) => (i.product.name === name ? { ...i, quantity } : i))
		)
	}

	const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

	return (
		<CartContext.Provider
			value={{ items, addItem, removeItem, updateQuantity, totalItems, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}
		>
			{children}
		</CartContext.Provider>
	)
}
