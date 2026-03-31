import UpperContainer from '@/components/UpperContainer'
import RegisterForm from '@/components/RegisterForm'

export default function Register() {
    return (
        <main className="flex-1 bg-neutral-50">
            <UpperContainer title="Register a new account" />
            <RegisterForm />
        </main>
    )
}