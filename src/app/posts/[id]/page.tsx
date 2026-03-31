import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import UpperContainer from '@/components/UpperContainer'
import Link from 'next/link'

type Props = {
	params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
	const { id } = await params

	const post = await prisma.post.findUnique({
		where: { id },
		select: {
			title: true,
			content: true,
			createdAt: true,
			author: {
				select: { login: true },
			},
		},
	})

	if (!post) notFound()

	return (
		<main className="flex-1 bg-neutral-50">
			<UpperContainer title={post.title} />

			<div className="mx-auto max-w-3xl px-4 py-10 flex flex-col gap-6">
				<div className="flex items-center gap-2 text-sm text-neutral-400">
					<Link
						href={`/u/${post.author.login}`}
						className="font-semibold text-neutral-700 hover:text-neutral-900 transition-colors">
						{post.author.login}
					</Link>
					<span>·</span>
					<span>
						{new Date(post.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
				</div>

				<div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm text-neutral-800 text-base leading-relaxed whitespace-pre-wrap">
					{post.content}
				</div>

				<Link
					href={`/u/${post.author.login}`}
					className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">
					← Back to {post.author.login} profile
				</Link>
			</div>
		</main>
	)
}
