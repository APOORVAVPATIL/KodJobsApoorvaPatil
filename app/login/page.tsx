"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password,
        }),
      })

      const result = await response.json()

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user))
        router.push('/dashboard')
      } else {
        setError(result.error || "Invalid credentials")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [router, email, password])

  const quotes = [
    {
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi",
      color: "text-emerald-500"
    },
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      color: "text-purple-500"
    }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <Image
        src="/job1.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={75}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Quotes */}
        <div className="hidden md:flex w-[65%] items-center justify-center p-12">
          <div className="space-y-12">
            {quotes.map((quote, index) => (
              <div 
                key={index} 
                className="space-y-4 transform hover:scale-105 transition-transform duration-300"
                style={{ willChange: 'transform' }}
              >
                <p className={`text-5xl font-bold ${quote.color} drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]`}>
                  "{quote.text}"
                </p>
                <p className="text-2xl text-white/90 font-semibold drop-shadow-lg">
                  - {quote.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-[35%] flex items-center justify-center">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg mx-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xl font-bold">K</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center mb-6">Sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

