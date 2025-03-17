import type { JobType } from "./types"

const API_KEY = "f58fc483-312f-43f9-94e9-c102cd113e25"

export async function fetchJobs(): Promise<JobType[]> {
  // In a real application, you would fetch from an actual API endpoint
  // For this example, we'll simulate a fetch with mock data

  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data (in a real app, this would come from the API)
  return [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "2-3 years",
      salary: "$90,000 - $120,000",
      description: "We are looking for a Frontend Developer proficient in React, Next.js, and modern CSS frameworks.",
      postedAt: "2 days ago",
      requirements: [
        "Proficiency in React and Next.js",
        "Experience with Tailwind CSS",
        "Understanding of REST APIs",
        "Good problem-solving skills",
      ],
    },
    {
      id: "2",
      title: "Backend Engineer",
      company: "DataSystems",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$100,000 - $140,000",
      description: "Join our team as a Backend Engineer to build scalable and efficient server-side applications.",
      postedAt: "1 week ago",
      requirements: [
        "Strong experience with Node.js",
        "Knowledge of database systems",
        "Experience with cloud services",
        "Understanding of microservices architecture",
      ],
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: "CreativeMinds",
      location: "New York, NY",
      type: "Contract",
      experience: "2+ years",
      salary: "$70 - $90 per hour",
      description:
        "We're seeking a talented UX/UI Designer to create beautiful and functional user interfaces for our products.",
      postedAt: "3 days ago",
      requirements: [
        "Portfolio showcasing UI/UX projects",
        "Proficiency in Figma or Adobe XD",
        "Understanding of user-centered design principles",
        "Experience working with development teams",
      ],
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Austin, TX",
      type: "Full-time",
      experience: "4+ years",
      salary: "$110,000 - $150,000",
      description:
        "Looking for a DevOps Engineer to streamline our deployment processes and maintain cloud infrastructure.",
      postedAt: "5 days ago",
      requirements: [
        "Experience with AWS or Azure",
        "Knowledge of CI/CD pipelines",
        "Containerization experience (Docker, Kubernetes)",
        "Infrastructure as Code (Terraform, CloudFormation)",
      ],
    },
    {
      id: "5",
      title: "Mobile Developer",
      company: "AppWorks",
      location: "Chicago, IL",
      type: "Part-time",
      experience: "1-3 years",
      salary: "$50,000 - $70,000",
      description: "Join our mobile development team to create innovative iOS and Android applications.",
      postedAt: "1 day ago",
      requirements: [
        "Experience with React Native",
        "Knowledge of native iOS or Android development",
        "Understanding of mobile UI/UX principles",
        "Experience with mobile app deployment",
      ],
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "AnalyticsPro",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$120,000 - $160,000",
      description:
        "We're looking for a Data Scientist to help us extract insights from complex datasets and build predictive models.",
      postedAt: "2 weeks ago",
      requirements: [
        "Strong background in statistics and mathematics",
        "Experience with Python and data science libraries",
        "Knowledge of machine learning algorithms",
        "Data visualization skills",
      ],
    },
  ]
}

// In a real application, you would implement these functions to interact with your API
export async function registerUser(userData: any) {
  // Implementation would use the API_KEY for authentication
  console.log("Registering user with API key:", API_KEY)
  return { success: true }
}

export async function loginUser(credentials: any) {
  // Implementation would use the API_KEY for authentication
  console.log("Logging in user with API key:", API_KEY)
  return { success: true, token: "sample-auth-token" }
}

