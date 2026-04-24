'use client'

import { type ReactNode } from 'react'
import { CartProvider } from '@/context/cart'
import CartDrawer from '@/components/Cart/drawer'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<CartProvider>
			{children}
			<CartDrawer />
		</CartProvider>
	)
}
