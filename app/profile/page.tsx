"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Deepa Sharma",
    email: "deepa@example.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    title: "Senior Software Engineer",
    about: "Experienced software engineer with a passion for building scalable applications",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        duration: "2020 - Present",
        description: "Leading development of cloud-native applications"
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "BS in Computer Science",
        year: "2019"
      }
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
  })

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      })

      if (response.ok) {
        alert('Profile updated successfully!')
        setIsEditing(false)
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
      alert('Failed to update profile')
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/jobseek.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          quality={100}
        />
      </div>

      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold">KodJobs</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push('/login')}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto bg-orange-100/95 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/cgimg2.jpg" alt="Profile" />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  {isEditing ? (
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mb-2"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                  )}
                  {isEditing ? (
                    <Input
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-600">{profile.title}</p>
                  )}
                </div>
              </div>
              <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            {/* Contact Information */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <div className="space-y-2">
                {isEditing ? (
                  <>
                    <Input
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="Email"
                      className="mb-2"
                    />
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="Phone"
                    />
                  </>
                ) : (
                  <>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                  </>
                )}
              </div>
            </section>

            {/* About */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              {isEditing ? (
                <Textarea
                  value={profile.about}
                  onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">{profile.about}</p>
              )}
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Experience</h2>
              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={exp.position}
                        onChange={(e) => {
                          const newExp = [...profile.experience]
                          newExp[index] = { ...exp, position: e.target.value }
                          setProfile({ ...profile, experience: newExp })
                        }}
                        placeholder="Position"
                      />
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...profile.experience]
                          newExp[index] = { ...exp, company: e.target.value }
                          setProfile({ ...profile, experience: newExp })
                        }}
                        placeholder="Company"
                      />
                      <Input
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...profile.experience]
                          newExp[index] = { ...exp, duration: e.target.value }
                          setProfile({ ...profile, experience: newExp })
                        }}
                        placeholder="Duration"
                      />
                      <Textarea
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...profile.experience]
                          newExp[index] = { ...exp, description: e.target.value }
                          setProfile({ ...profile, experience: newExp })
                        }}
                        placeholder="Description"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-gray-500">{exp.duration}</p>
                      <p className="mt-2">{exp.description}</p>
                    </>
                  )}
                </div>
              ))}
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </Card>
      </main>
    </div>
  )
} 