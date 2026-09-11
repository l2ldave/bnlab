// Middleware para proteger rotas autenticadas
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Páginas públicas
  const publicPages = ['/login', '/forgot-password', '/privacy', '/terms'];

  // Páginas protegidas
  const protectedPages = [
    '/dashboard',
    '/settings',
    '/mailbox',
    '/contacts',
    '/spam',
    '/email-client',
    '/support',
  ];

  const token = request.cookies.get('bnlab_auth')?.value;

  // Se está numa página protegida e não tem token, redireciona para login
  if (protectedPages.some((page) => pathname.startsWith(page)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se está numa página pública e tem token, redireciona para dashboard
  if (publicPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
