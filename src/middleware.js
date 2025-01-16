import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Middleware triggered for:', req.url);

  const authHeader = req.headers.get('authorization');
  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASS;

  if (!authHeader) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const [authUser, authPass] = atob(authHeader.split(' ')[1]).split(':');
  if (authUser === username && authPass === password) {
    console.log('Access granted');
    return NextResponse.next();
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/:path*',
};