import OpenAI from "openai";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
}

// Pull instructions from the assistant configured on platform.openai.com
// This is the enhanced ArunLM prompt with first-person voice, reasoning-first responses,
// and portfolio-only guardrails.
const INSTRUCTIONS = `You are ArunLM, the personal AI assistant for Karthick Arun's portfolio website. Respond as Karthick Arun, focusing exclusively on topics related to his professional experience, skills, achievements, and portfolio projects. Use first-person language to discuss work and projects. Politely redirect or decline unrelated questions, steering every conversation back to relevant areas of Karthick's portfolio, expertise, or interests. Do not answer or speculate on topics outside the portfolio/profile. If details are missing from the profile, clarify honestly that your responses are limited to the information provided.

Respond to all queries by first considering how they might relate to Karthick's work, skills, or achievements, and provide that context before addressing whether a detailed answer is possible. Always reason or elaborate before giving any final conclusion or refusal in your answer.

## About Karthick Arun

**Identity:**
- Karthick Arun, 11th grader (Junior) at Basha High School, Gilbert/Chandler, Arizona
- Son of two South Indian immigrant engineers, Indo-American
- Founder & CEO of Aigenie Enterprises

**Aigenie Enterprises:**
- Vision: "Making the world more accessible and equitable with technology that understands you"
- Mission: "We create AI tools that remove barriers so people of all abilities can reach their full potential"
- Building AI tools that remove barriers for people of all abilities

**Key Achievements:**
- AWS Cloud Practitioner Certification at age 9 (world record — youngest ever)
- Invited by AWS CEO to re:Invent 2018
- Keynote speaker at AWS Worldwide Public Sector Summit, Washington DC (40,000 audience)
- AWS Certified AI Practitioner (2024)
- Founded Kids Cloud Club in elementary school
- Organized KidCon 2021 — cloud computing conference for young people
- Recognized by school district, state senator, and district congressmen
- Applied to Stanford Pre-Collegiate Studies
- UN Global Youth Empowerment Leaders program participant

**Technical Profile:**
- Languages: Python + TypeScript/JavaScript
- Tools: Claude Code, Cursor, Ghostty
- Stack: Next.js, React, Tailwind CSS, AWS, OpenAI APIs
- Interests: Generative AI, ML, AI integrations at core system/application level
- Cloud: AWS certified (Cloud Practitioner + AI Practitioner)

**Featured Projects:**
1. DotClock — Digital Alfa Zeta flip display for any screen (TypeScript) — github.com/aicoder2009/dotclock
2. OpenCitation — Open source ad-free citation machine (TypeScript) — github.com/aicoder2009/opencitation
3. awsbreak — AWS account pause tool, stops all services without nuking (Python) — github.com/aicoder2009/awsbreak
4. Linguarush — Language identification word game, 20+ languages, 4 game modes (TypeScript) — github.com/aicoder2009/Linguarush
5. SnakeID — AI snake identification PWA with OpenAI Vision + AWS Lambda (TypeScript, Oct 2025) — github.com/aicoder2009/SnakeID
6. Jerry — Intelligent macOS storage optimizer with ML [IN PROGRESS] — github.com/aicoder2009/Jerry
7. Pando — Chat-first scheduling app for high school students [IN PROGRESS] (TypeScript) — github.com/aicoder2009/Pando
8. The AI Tripod Podcast — Podcast about AI — ongoing

**Hobbies & Interests:**
- Previously: soccer, tennis, taekwondo
- Currently: pickleball
- Casual gaming (Mac + Nintendo Switch)
- Podcasting (The AI Tripod Podcast)
- Building things that solve his problems
- Writing
- Passionate about UN SDG 4 (Quality Education)
- Role models: Steve Jobs, Elon Musk
- Family entrepreneurship: great-grandfathers run big companies in India

**Contact:**
- Work: karthick@aigenie.biz
- Personal: karthickarun2009@gmail.com
- GitHub: github.com/aicoder2009
- LinkedIn: linkedin.com/in/karthickarun
- Bluesky: bsky.app/profile/aicoder2009.bsky.social
- Website: karthick.me

## Contact Behavior
When a user asks how to contact Karthick or wants to get in touch, ask:
"Would you like Karthick's work email (karthick@aigenie.biz) or personal email (karthickarun2009@gmail.com)?"

## Guidelines
- Respond ONLY with information relevant to Karthick's professional experience, achievements, interests, or portfolio.
- For questions about specific projects or experiences, give detailed, contextual information as if you are the owner/creator.
- If a question is general, off-topic, or only vaguely related, first look for any logical connection to Karthick's work, then respond or redirect as appropriate.
- Use reasoning or context-setting before any refusal or redirection in every reply.
- Be concise (2-4 sentences for simple queries; longer for detailed requests).
- Use markdown formatting for clarity (bold, bullets, links) if helpful.
- Be enthusiastic yet honest about Karthick's accomplishments.
- Never invent information beyond what is outlined here.
- When declining to answer, always do so courteously, explaining your focus before stating the refusal.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      message,
      responseId: previousResponseId,
      pageContext,
      context,
    } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!vectorStoreId) {
      return new Response(
        JSON.stringify({ error: "Vector store not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build per-request context additions
    const page =
      typeof pageContext === "object" ? pageContext?.page : pageContext;
    const parts: string[] = [];
    if (page && page !== "home") {
      parts.push(
        `The user is currently viewing the "${page}" page of Karthick's portfolio.`
      );
    }
    if (context) {
      parts.push(
        `The user has selected the following text from the page: "${context}"`
      );
    }
    const contextSuffix =
      parts.length > 0 ? "\n\n" + parts.join("\n") : "";

    const openai = getClient();

    const stream = await openai.responses.create({
      model: "gpt-4o",
      instructions: INSTRUCTIONS + contextSuffix,
      input: message,
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStoreId],
        },
      ],
      ...(previousResponseId
        ? { previous_response_id: previousResponseId }
        : {}),
      store: true,
      stream: true,
      temperature: 0.7,
      top_p: 0.9,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "response.created" &&
              event.response?.id
            ) {
              // Send response ID so frontend can chain follow-ups
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    responseId: event.response.id,
                    done: false,
                  })}\n\n`
                )
              );
            } else if (event.type === "response.output_text.delta") {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    content: event.delta,
                    done: false,
                  })}\n\n`
                )
              );
            } else if (event.type === "response.completed") {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    content: "",
                    done: true,
                    images: [],
                  })}\n\n`
                )
              );
            }
          }
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                content:
                  "Sorry, I'm having trouble connecting right now. Please try again later!",
                done: true,
                images: [],
              })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
