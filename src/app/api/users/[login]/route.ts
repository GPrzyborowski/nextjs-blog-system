import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { login: string } }) {
	const user = await prisma.user.findUnique({
		where: { login: params.login },
		select: {
			id: true,
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

	if (!user) {
		return Response.json({ error: 'User not found' }, { status: 404 })
	}

	return Response.json(user)
}
