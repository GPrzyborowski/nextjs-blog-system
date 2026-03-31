'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [login, setLogin] = useState<string | null>(null)

	const router = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]))
			setLogin(payload.login)
		}
	}, [])

	function handleLogout() {
		localStorage.removeItem('token')
		setLogin(null)
		setIsOpen(false)
		router.push('/')
	}

	return (
		<>
			<nav className="w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
				<div className="flex h-20 w-full items-center justify-between px-8">
					<Link href="/" className="text-2xl font-bold tracking-tight text-neutral-900">
						Blog App
					</Link>

					<div className="hidden xl:flex items-center gap-10 text-base font-medium text-neutral-700">
						<Link href="/" className="transition-colors hover:text-neutral-950">
							Home
						</Link>
						{login ? (
							<>
								{login === 'admin' && (
									<Link href="/admin" className="transition-colors hover:text-neutral-950">
										Admin Panel
									</Link>
								)}
								<Link href="/posts/new" className="transition-colors hover:text-neutral-950">
									New Post
								</Link>
								<Link href={`/u/${login}`} className="transition-colors hover:text-neutral-950">
									Profile
								</Link>
								<button onClick={handleLogout} className="transition-colors hover:text-neutral-950">
									Logout
								</button>
							</>
						) : (
							<>
								<Link href="/login" className="transition-colors hover:text-neutral-950">
									Login
								</Link>
								<Link href="/register" className="transition-colors hover:text-neutral-950">
									Register
								</Link>
							</>
						)}
					</div>

					<button
						type="button"
						aria-label="Open menu"
						className="xl:hidden rounded-md p-2 transition hover:bg-neutral-100"
						onClick={() => setIsOpen(true)}>
						<img src="/bars.svg" alt="Open menu" className="h-8 w-8" />
					</button>
				</div>
			</nav>

			{isOpen && (
				<div className="fixed inset-0 z-50 xl:hidden bg-white flex flex-col">
					<div className="flex h-20 w-full items-center justify-end px-8">
						<button
							type="button"
							aria-label="Close menu"
							className="rounded-md p-2 transition hover:bg-neutral-100"
							onClick={() => setIsOpen(false)}>
							<img src="/x.svg" alt="Close menu" className="h-8 w-8" />
						</button>
					</div>

					<div className="flex flex-1 flex-col items-center justify-center space-y-10">
						<Link href="/" onClick={() => setIsOpen(false)} className="text-2xl my-10">
							Home
						</Link>
						{login ? (
							<>
								{login === 'admin' && (
									<Link href="/admin" className="transition-colors hover:text-neutral-950">
										Admin Panel
									</Link>
								)}
								<Link href="/posts/new" className="transition-colors hover:text-neutral-950">
									New Post
								</Link>
								<Link href={`/u/${login}`} className="transition-colors hover:text-neutral-950">
									Profile
								</Link>
								<button onClick={handleLogout} className="transition-colors hover:text-neutral-950">
									Logout
								</button>
							</>
						) : (
							<>
								<Link href="/login" onClick={() => setIsOpen(false)} className="text-2xl my-10">
									Login
								</Link>
								<Link href="/register" onClick={() => setIsOpen(false)} className="text-2xl my-10">
									Register
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</>
	)
}
