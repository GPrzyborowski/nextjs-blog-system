import type { Metadata } from 'next'
import { Geist_Mono, Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Blog App',
	description: 'My blog app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pl" className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col font-sans bg-neutral-50 text-neutral-900">{children}</body>
		</html>
	)
}
