import { prisma } from '@/lib/prisma'

export async function GET() {
	const users = await prisma.user.findMany({
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

	return Response.json(users)
}
