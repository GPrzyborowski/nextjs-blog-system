'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Post = {
    id: string
    title: string
    content: string
    createdAt: Date
}

type Props = {
	posts: Post[]
	profileLogin: string
}

export default function ProfilePostList({ posts, profileLogin }: Props) {
	const router = useRouter()
	const [currentLogin, setCurrentLogin] = useState<string | null>(null)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]))
			setCurrentLogin(payload.login)
		}
	}, [])

	const isOwner = currentLogin === profileLogin

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
		<div className="flex flex-col gap-4">
			{posts.map(post => (
				<div
					key={post.id}
					className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all">
					<Link href={`/posts/${post.id}`}>
						<h2 className="text-xl font-bold text-neutral-900 mb-2">{post.title}</h2>
						<p className="text-neutral-600 text-sm line-clamp-3">{post.content}</p>
						<p className="text-neutral-400 text-xs mt-4">
							{new Date(post.createdAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					</Link>

					{isOwner && (
						<div className="flex gap-3 mt-4 pt-4 border-t border-neutral-100">
							<Link
								href={`/posts/${post.id}/edit`}
								className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">
								Edit
							</Link>
							<button
								onClick={() => handleDelete(post.id)}
								className="text-sm font-semibold text-red-400 hover:text-red-600 transition-colors">
								Delete
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	)
}
