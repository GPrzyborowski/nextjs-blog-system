import Header from './Header'
import Navbar from './Navbar'

type UpperContainerProps = {
    title: string
}

export default function UpperContainer({ title }: UpperContainerProps) {
    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full px-8 pt-12 sm:pt-16">
                <Header content={title} />
            </div>
        </div>
    )
}