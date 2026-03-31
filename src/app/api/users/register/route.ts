import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
	const body = await req.json()

	const existing = await prisma.user.findUnique({
		where: { login: body.login },
	})

	if (existing) {
		return Response.json({ error: 'Login already taken' }, { status: 409 })
	}

	const hashedPassword = await bcrypt.hash(body.password, 10)

	const user = await prisma.user.create({
		data: {
			login: body.login,
			password: hashedPassword,
		},
	})

	return Response.json(user, { status: 201 })
}
