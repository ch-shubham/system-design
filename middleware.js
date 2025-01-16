import { NextResponse } from 'next/server';

const USERNAME = 'admin';
const PASSWORD = 'admin22';

export function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // Check if the Authorization header exists
  if (authHeader) {
    const [scheme, credentials] = authHeader.split(' ');

    if (scheme === 'Basic') {
      const decodedCredentials = atob(credentials);
      const [user, pass] = decodedCredentials.split(':');

      // Validate username and password
      if (user === USERNAME && pass === PASSWORD) {
        return NextResponse.next(); // Allow access
      }
    }
  }

  // If authentication fails, return a 401 response with a prompt
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
    },
  });
}

// Match all paths
export const config = {
  matcher: '/:path*',
};
