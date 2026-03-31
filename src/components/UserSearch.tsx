'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Result = {
	login: string
	_count: { posts: number }
}

export default function UserSearch() {
	const router = useRouter()
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<Result[]>([])
	const [loading, setLoading] = useState(false)

	async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.target.value
		setQuery(val)

		if (val.trim().length === 0) {
			setResults([])
			return
		}

		setLoading(true)
		const res = await fetch(`/api/users/search?q=${val}`)
		const data = await res.json()
		setResults(data)
		setLoading(false)
	}

	return (
		<div className="relative w-full max-w-xl mx-auto">
			<input
				type="text"
				value={query}
				onChange={handleSearch}
				placeholder="Search for a blogger..."
				className="w-full rounded-xl border border-neutral-300 bg-white px-5 py-4 text-base text-neutral-900 placeholder-neutral-400 outline-none shadow-sm transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
			/>

			{loading && <p className="absolute mt-2 w-full text-center text-sm text-neutral-400">Searching...</p>}

			{!loading && results.length > 0 && (
				<ul className="absolute z-10 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-md overflow-hidden">
					{results.map(user => (
						<li key={user.login}>
							<button
								onClick={() => router.push(`/u/${user.login}`)}
								className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 transition cursor-pointer">
								<span className="font-medium text-neutral-900">{user.login}</span>
								<span className="text-sm text-neutral-400">{user._count.posts} posts</span>
							</button>
						</li>
					))}
				</ul>
			)}

			{!loading && query.length > 0 && results.length === 0 && (
				<p className="absolute mt-2 w-full text-center text-sm text-neutral-400">No users found</p>
			)}
		</div>
	)
}
