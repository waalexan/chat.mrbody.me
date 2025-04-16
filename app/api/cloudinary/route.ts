import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export async function POST(req: NextRequest) {
  const { paramsToSign } = await req.json();

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );
    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao assinar os parâmetros' }, { status: 500 });
  }
}
