import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { systemInstruction } from '@/config/training'

export async function POST(req: Request) {
  const { message, history } = await req.json();

  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
      systemInstruction,
    });

    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.isBot ? 'model' : 'user',
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 0,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    

    const result = await chat.sendMessageStream(message);
    const stream = result.stream;

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}