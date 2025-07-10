import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAuthRoute = nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard')

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl))
    }
    return NextResponse.next()
  }

  // 临时注释掉路由保护，方便开发调试
  // if (isProtectedRoute && !isLoggedIn) {
  //   return NextResponse.redirect(new URL('/auth/signin', nextUrl))
  // }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
} 