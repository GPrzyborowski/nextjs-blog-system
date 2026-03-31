'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Post = {
	id: string
	title: string
	createdAt: string
	author: { login: string }
}

export default function AdminPostList({ posts }: { posts: Post[] }) {
	const router = useRouter()

	async function handleDelete(id: string) {
		const token = localStorage.getItem('token')
		if (!token) return

		const confirmed = confirm('Are you sure you want to delete this post?')
		if (!confirmed) return

		await fetch(`/api/posts/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		})

		router.refresh()
	}

	if (posts.length === 0) {
		return <p className="text-neutral-500 text-center py-10">No posts yet.</p>
	}

	return (
		<div className="flex flex-col gap-3">
			{posts.map(post => (
				<div
					key={post.id}
					className="bg-white border border-neutral-200 rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between gap-4">
					<div className="flex flex-col gap-1 min-w-0">
						<Link href={`/posts/${post.id}`} className="font-semibold text-neutral-900 hover:underline truncate">
							{post.title}
						</Link>
						<span className="text-sm text-neutral-400">
							{post.author.login} ·{' '}
							{new Date(post.createdAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</span>
					</div>

					<button
						onClick={() => handleDelete(post.id)}
						className="shrink-0 text-sm font-semibold text-red-400 hover:text-red-600 transition-colors">
						Delete
					</button>
				</div>
			))}
		</div>
	)
}
