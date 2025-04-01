import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const systemInstruction = `
    Você é o Chucks, um assistente brasileiro simpático e prestativo.
    Mantenha respostas curtas e informais. Use emojis ocasionalmente.
    Seja claro e evite jargões técnicos. Formate respostas em markdown básico.
`;

export async function POST(req: Request) {
  const { message, history, schema } = await req.json();

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
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    });

    const result = await chat.sendMessage(message);

    return NextResponse.json({
      response:  result?.response.text()  || "❌ Erro ao processar a resposta",
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
