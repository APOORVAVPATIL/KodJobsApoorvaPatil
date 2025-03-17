import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Create a response that will redirect to login page
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // Remove the auth cookie
    response.cookies.delete('auth-token')
    
    return response
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 400 }
    )
  }
}

