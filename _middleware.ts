import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204 });
    }

    return response;
}
