'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Post = {
	id: string
	title: string
	content: string
}

export default function EditPostForm({ post }: { post: Post }) {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError(null)
		setLoading(true)

		const form = e.currentTarget
		const title = (form.elements.namedItem('title') as HTMLInputElement).value
		const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value

		const token = localStorage.getItem('token')
		if (!token) {
			router.push('/login')
			return
		}

		try {
			const res = await fetch(`/api/posts/${post.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title, content }),
			})

			if (!res.ok) {
				setError('Something went wrong')
				return
			}

			router.push(`/posts/${post.id}`)
		} catch {
			setError('Could not connect to the server')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex justify-center px-4 py-12">
			<div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 sm:p-10">
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="title" className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							defaultValue={post.title}
							required
							className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="content" className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">
							Content
						</label>
						<textarea
							id="content"
							name="content"
							defaultValue={post.content}
							required
							rows={10}
							className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10 resize-none"
						/>
					</div>

					{error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="mt-2 w-full rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-neutral-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
						{loading ? 'Saving...' : 'Save changes'}
					</button>
				</form>
			</div>
		</div>
	)
}
