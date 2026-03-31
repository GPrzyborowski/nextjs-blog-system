import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const query = searchParams.get('q') ?? ''

	const users = await prisma.user.findMany({
		where: {
			login: { contains: query, mode: 'insensitive' },
		},
		select: {
			login: true,
			_count: { select: { posts: true } },
		},
		take: 5,
	})

	return Response.json(users)
}
