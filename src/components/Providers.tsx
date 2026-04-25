'use client'

import { type ReactNode } from 'react'
import { CartProvider } from '@/context/cart'
import CartDrawer from '@/components/Cart/drawer'
import ScrollReveal from '@/components/ScrollReveal'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<CartProvider>
			{children}
			<CartDrawer />
			<ScrollReveal />
		</CartProvider>
	)
}
