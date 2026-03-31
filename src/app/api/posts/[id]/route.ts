import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	try {
		const user = getUserFromRequest(req) as { userId: string; login: string }

		const post = await prisma.post.findUnique({ where: { id } })

		if (!post) {
			return new Response('Post not found', { status: 404 })
		}

		if (user.login !== 'admin' && post.authorId !== user.userId) {
			return new Response('Forbidden', { status: 403 })
		}

		await prisma.post.delete({ where: { id } })

		return new Response(null, { status: 204 })
	} catch {
		return new Response('Unauthorized', { status: 401 })
	}
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const body = await req.json()

	try {
		const user = getUserFromRequest(req) as { userId: string; login: string }

		const post = await prisma.post.findUnique({ where: { id } })

		if (!post) {
			return new Response('Post not found', { status: 404 })
		}

		if (post.authorId !== user.userId) {
			return new Response('Forbidden', { status: 403 })
		}

		const updated = await prisma.post.update({
			where: { id },
			data: {
				title: body.title,
				content: body.content,
			},
		})

		return Response.json(updated)
	} catch {
		return new Response('Unauthorized', { status: 401 })
	}
}
