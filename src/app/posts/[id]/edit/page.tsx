import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import UpperContainer from '@/components/UpperContainer'
import EditPostForm from '@/components/EditPostForm'

type Props = {
	params: Promise<{ id: string }>
}

export default async function EditPost({ params }: Props) {
	const { id } = await params

	const post = await prisma.post.findUnique({
		where: { id },
		select: { id: true, title: true, content: true, authorId: true },
	})

	if (!post) notFound()

	return (
		<main className="flex-1 bg-neutral-50">
			<UpperContainer title="Edit Post" />
			<EditPostForm post={post} />
		</main>
	)
}
