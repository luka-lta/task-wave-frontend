// src/pages/AuthPage.tsx
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ModeToggle } from "@/components/mode-toggle.tsx"
import { useAuth } from "@/context/auth-context.tsx"
import { Footer } from "@/components/footer.tsx"
import { Alert, AlertDescription } from "@/components/ui/alert.tsx"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth();

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false)
                navigate('/dashboard')
            }, 3000)
            return () => clearTimeout(timer)
        }

        if (error) {
            const timer = setTimeout(() => {
                setError('')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showAlert, error, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json()
            if (response.ok) {
                login(data.token)
                setShowAlert(true)
            } else {
                setError(data.message || 'Login failed')
                console.error('Login failed:', data.message)
            }
        } catch (err) {
            setError('An unexpected error occurred.')
            console.error('Login error:', err)
        }
    }

    const toggleForm = () => {
        setIsLogin(!isLogin)
        setEmail('')
        setPassword('')
        setUsername('')
        setError('')
    }

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left side - Image */}
                <div className="w-full md:w-1/2 relative">
                    <img
                        src="https://picsum.photos/1080/1025"
                        alt="Auth visual"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right side - Auth Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
                    <div className="w-full max-w-md space-y-8">
                        <ModeToggle />

                        {showAlert && (
                            <Alert className="bg-green-100 border-green-400 text-green-700">
                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                <AlertDescription>
                                    Login successful! Redirecting...
                                </AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert className="bg-red-100 border-red-400 text-red-700">
                                <XCircleIcon className="h-4 w-4 mr-2" />
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {isLogin ? 'Welcome back' : 'Create an account'}
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {isLogin ? 'Please sign in to your account' : 'Please sign up for an account'}
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {!isLogin && (
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
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                )}
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
                                        autoComplete={isLogin ? "current-password" : "new-password"}
                                        required
                                        placeholder={isLogin ? "Enter your password" : "Create a password"}
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

                                {isLogin && (
                                    <div className="text-sm">
                                        <a href="/forgot-password" className="font-medium text-primary hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                {isLogin ? "Sign in" : "Sign up"}
                            </Button>
                        </form>

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
