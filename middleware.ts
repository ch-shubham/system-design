import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USERNAME = 'admin';
const PASSWORD = 'admin22';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');

    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');

      // Validate username and password
      if (user === USERNAME && pass === PASSWORD) {
        return NextResponse.next(); // Allow access
      }
    }
  }

  // If authentication fails, return 401 Unauthorized
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
    },
  });
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};
