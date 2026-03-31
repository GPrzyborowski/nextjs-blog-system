import UpperContainer from '@/components/UpperContainer'
import NewPostForm from '@/components/NewPostForm'

export default function NewPost() {
	return (
		<main className="flex-1 bg-neutral-50">
			<UpperContainer title="New Post" />
			<NewPostForm />
		</main>
	)
}
