import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
        return new Response("Missing Gemini API key", { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), { 
        headers: { "Content-Type": "application/json" },
    });
}
