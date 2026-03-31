import UpperContainer from '@/components/UpperContainer'
import LoginForm from '@/components/LoginForm'

export default function Login() {
    return (
        <main className="flex-1 bg-neutral-50">
            <UpperContainer title="Log in to your account" />
            <LoginForm />
        </main>
    )
}