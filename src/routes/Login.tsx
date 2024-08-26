import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {ModeToggle} from "@/components/mode-toggle.tsx";
export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setusername] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isLogin) {
            console.log('Login attempt with:', { email, password })
        } else {
            console.log('Register attempt with:', { username: username, email, password })
        }
    }

    const toggleForm = () => {
        setIsLogin(!isLogin)
        setEmail('')
        setPassword('')
        setusername('')
    }

    const LoginForm = () => (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="email-address">Email address</Label>
                    <Input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                    </Label>
                </div>

                <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Sign in
            </Button>
        </form>
    )

    const RegisterForm = () => (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="email-address">Email address</Label>
                    <Input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1"
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">
                Sign up
            </Button>
        </form>
    )

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left side - Image */}
                <div className="w-full md:w-1/2 relative">
                    <img
                        src="https://picsum.photos/1080/1025"
                        alt="Auth visual"
                    />
                </div>

                {/* Right side - Auth Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">

                    <div className="w-full max-w-md space-y-8">
                        <ModeToggle />
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {isLogin ? 'Welcome back' : 'Create an account'}
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {isLogin ? 'Please sign in to your account' : 'Please sign up for an account'}
                            </p>
                        </div>

                        {isLogin ? <LoginForm /> : <RegisterForm />}

                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            {isLogin ? "Not a member? " : "Already have an account? "}
                            <a href="#" className="font-medium text-primary hover:underline" onClick={toggleForm}>
                                {isLogin ? "Sign up now" : "Sign in"}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
)
}

import {Footer} from "@/components/footer.tsx";
