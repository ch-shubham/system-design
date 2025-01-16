import { NextResponse } from 'next/server';

export function middleware(req) {
    const authHeader = req.headers.get('authorization');
    
    const username = process.env.BASIC_AUTH_USER || 'admin';
    const password = process.env.BASIC_AUTH_PASS || 'admin22';

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
        return NextResponse.next(); // Access granted
    }

    return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}

export const config = {
    matcher: '/:path*', // Protect all routes
};