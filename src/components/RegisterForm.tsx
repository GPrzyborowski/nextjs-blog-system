'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const form = e.currentTarget
        const login = (form.elements.namedItem('login') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value

        try {
            const res = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Something went wrong')
                return
            }

            router.push('/login')
        } catch {
            setError('Could not connect to the server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="login" className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">
                            Login
                        </label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            placeholder="Enter your login"
                            required
                            className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-neutral-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>

                    <p className="text-center text-sm text-neutral-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-neutral-900 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}