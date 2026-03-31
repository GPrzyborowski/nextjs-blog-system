import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET() {
	const posts = await prisma.post.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			author: true,
		}
	})

	return Response.json(posts)
}

export async function POST(req: Request) {
	const body = await req.json()

	try {
		const user = getUserFromRequest(req) as {
			userId: string
			login: string
		}

		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: user.userId,
			},
		})

		return Response.json(post)
	} catch {
		return new Response('Unauthorized', { status: 401 })
	}
}
