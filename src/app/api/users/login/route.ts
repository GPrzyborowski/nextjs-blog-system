import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
	const body = await req.json()

	const user = await prisma.user.findUnique({
		where: { login: body.login },
	})

	if (!user) {
		return new Response('Invalid credentials', { status: 401 })
	}

	const isValid = await bcrypt.compare(body.password, user.password)

	if (!isValid) {
		return new Response('Invalid credentials', { status: 401 })
	}

	const token = jwt.sign(
		{
			userId: user.id,
			login: user.login,
		},
		process.env.JWT_SECRET!,
		{ expiresIn: '1h' }
	)

	return Response.json({ token })
}