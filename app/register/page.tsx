"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Register() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          name: formData.get('name'),
          email: formData.get('email'),
          dob: formData.get('dob'),
          password: formData.get('password'),
        }),
      })

      const result = await response.json()

      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || "Failed to create account")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <Image
        src="/xyz.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Quotes */}
        <div className="hidden md:flex w-[65%] items-center justify-center p-12">
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-5xl font-bold text-blue-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                "Choose a job you love,"
              </p>
              <p className="text-4xl font-bold text-blue-400">
                "and you will never have to work a day in your life."
              </p>
              <p className="text-2xl text-white/90 font-semibold">
                - Confucius
              </p>
            </div>
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

            <h1 className="text-2xl font-bold text-center mb-2">Create an Account</h1>
            <p className="text-gray-600 text-center mb-6">Fill in your details to get started</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

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
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  disabled={isLoading}
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
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 