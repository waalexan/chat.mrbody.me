import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (token) {
        return NextResponse.json({ status: 200, token });
    } else {
        return NextResponse.json({ status: 404, token: null });
    }
}
