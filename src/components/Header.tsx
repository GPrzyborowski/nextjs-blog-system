type HeaderProps = {
	content: string
}

export default function Header({ content }: HeaderProps) {
	return (
		<header className="text-center">
			<h1 className="text-neutral-900 font-bold text-3xl sm:text-3xl lg:text-4xl tracking-tight">
				{content}
			</h1>
		</header>
	)
}