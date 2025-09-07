import { mistral, type MistralLanguageModelOptions } from "@ai-sdk/mistral";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Use Mistral's latest large model
const model = mistral("mistral-large-latest");

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid request. 'message' is required." },
        { status: 400 }
      );
    }

    const response = await generateText({
      model,
      prompt: message,
      providerOptions: {
        mistral: {
          safePrompt: true, // optional safety prompt injection
        } satisfies MistralLanguageModelOptions,
      },
    });

    return NextResponse.json({
      success: true,
      input: message,
      output: response.text, // AI-generated text
    });
  } catch (error: any) {
    console.error("Error in Mistral POST:", error);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 }
    );
  }
}
