"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Briefcase, Clock, Building } from "lucide-react"
import { fetchJobs } from "@/lib/api"
import type { JobType } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [jobs, setJobs] = useState<JobType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])

  useEffect(() => {
    // No authentication check needed
  }, [router])

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true)
        const data = await fetchJobs()
        console.log('Fetched jobs count:', data.length)
        setJobs(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.")
        console.error('Error fetching jobs:', err)
      } finally {
        setLoading(false)
      }
    }

    getJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add this console log to check filtered jobs
  console.log('Filtered jobs count:', filteredJobs.length)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout')
      if (response.ok) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold">KodJobs</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4 relative">
        <div className="fixed inset-0 -z-10">
          <Image
            src="/dashboard-image.jpg"
            alt="Dashboard Background"
            fill
            className="object-cover opacity-20"
            priority
            quality={100}
          />
        </div>

        <div className="mb-8 relative z-10">
          <h2 className="text-3xl font-bold mb-2">Job Dashboard</h2>
          <p className="text-muted-foreground">Find your perfect job match from our curated listings</p>
        </div>

        <div className="relative mb-8 z-10">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            className="pl-10 py-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(20)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-muted"></CardHeader>
                <CardContent className="h-40 mt-4 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 mb-8">
            {filteredJobs.map((job) => (
              <Card 
                key={job.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow bg-amber-100"
              >
                <CardHeader className="pb-2 bg-amber-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={job.type === "Full-time" ? "default" : "outline"}
                      className={job.type === "Full-time" ? "bg-blue-500" : ""}
                    >
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 bg-amber-100">
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.experience}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Posted {job.postedAt}
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{job.description}</p>
                </CardContent>
                <CardFooter className="pt-0 bg-amber-100">
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white" 
                    onClick={() => {
                      setAppliedJobs([...appliedJobs, job.id])
                      alert('Applied successfully!')
                    }}
                  >
                    {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KodJobs. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

