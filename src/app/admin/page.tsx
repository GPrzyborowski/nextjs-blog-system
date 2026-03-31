import { prisma } from '@/lib/prisma'
import UpperContainer from '@/components/UpperContainer'
import AdminPostList from '@/components/AdminPostList'

export default async function AdminPage() {
	const posts = await prisma.post.findMany({
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			title: true,
			createdAt: true,
			author: { select: { login: true } },
		},
	})

	return (
		<main className="flex-1 bg-neutral-50">
			<UpperContainer title="Admin Panel" />
			<div className="mx-auto max-w-3xl px-4 py-10">
				<AdminPostList posts={posts} />
			</div>
		</main>
	)
}
