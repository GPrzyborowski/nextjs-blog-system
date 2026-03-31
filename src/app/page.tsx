import UpperContainer from '@/components/UpperContainer'
import UserSearch from '@/components/UserSearch'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
	const topBloggers = await prisma.user.findMany({
		select: {
			login: true,
			createdAt: true,
			_count: { select: { posts: true } },
		},
		orderBy: {
			posts: { _count: 'desc' },
		},
		take: 5,
	})

	return (
		<main className="flex-1 bg-neutral-50">
			<UpperContainer title="Blog app" />

			<div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-12">
				<div className="flex flex-col gap-4">
					<h2 className="text-lg font-semibold text-neutral-700 text-center">Find a blogger</h2>
					<UserSearch />
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="text-lg font-semibold text-neutral-700">Most active bloggers</h2>
					<div className="flex flex-col gap-3">
						{topBloggers.map((user, index) => (
							<Link
								key={user.login}
								href={`/u/${user.login}`}
								className="bg-white border border-neutral-200 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all">
								<span className="text-2xl font-bold text-neutral-200 w-8 shrink-0">{index + 1}</span>
								<div className="flex flex-col flex-1">
									<span className="font-semibold text-neutral-900">{user.login}</span>
									<span className="text-sm text-neutral-400">
										Joined{' '}
										{new Date(user.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
										})}
									</span>
								</div>
								<span className="text-sm font-semibold text-neutral-500">
									{user._count.posts} {user._count.posts === 1 ? 'post' : 'posts'}
								</span>
							</Link>
						))}

						{topBloggers.length === 0 && (
							<p className="text-center text-neutral-400 py-8">No bloggers yet. Be the first!</p>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
