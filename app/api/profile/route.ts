import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Here you would typically fetch the profile data from your database
    // This is just mock data for demonstration
    const profile = {
      name: "Deepa Sharma",
      email: "deepa@example.com",
      phone: "+91 9876543210",
      location: "New York, USA",
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
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
      resume: "/path/to/resume.pdf"
    }

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profile = await request.json()
    // Here you would typically update the profile in your database
    
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
} 