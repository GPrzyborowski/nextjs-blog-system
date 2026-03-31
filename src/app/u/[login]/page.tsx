import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import UpperContainer from '@/components/UpperContainer'
import Link from 'next/link'
import ProfilePostList from '@/components/ProfilePostList'

type Props = {
	params: Promise<{ login: string }>
}

export default async function UserProfile({ params }: Props) {
	const { login } = await params
	const user = await prisma.user.findUnique({
		where: { login },
		select: {
			login: true,
			bio: true,
			createdAt: true,
			posts: {
				orderBy: { createdAt: 'desc' },
				select: {
					id: true,
					title: true,
					content: true,
					createdAt: true,
				},
			},
		},
	})

	if (!user) notFound()

	return (
		<main className="flex-1 bg-neutral-50">
			<UpperContainer title={`${user.login}`} />

			<div className="mx-auto max-w-3xl px-4 py-10 flex flex-col gap-10">
				<div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-2 shadow-sm">
					{user.bio && <p className="text-neutral-700 text-base">{user.bio}</p>}
					<div className="flex gap-6 text-sm text-neutral-500 mt-1">
						<span>
							<span className="font-semibold text-neutral-900">{user.posts.length}</span> posts
						</span>
						<span>
							Joined{' '}
							<span className="font-semibold text-neutral-900">
								{new Date(user.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</span>
					</div>
				</div>
				<ProfilePostList posts={user.posts} profileLogin={user.login} />
			</div>
		</main>
	)
}
