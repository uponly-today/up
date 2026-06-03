import { getMimoClient, MIMO_MODEL, SYSTEM_PROMPT } from "@/lib/mimo";
import { baseToolSchemas, runBaseTool } from "@/lib/base-tools";
import type OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatMessage = { role: "user" | "assistant"; content: string };

const encoder = new TextEncoder();

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const incoming = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
    .slice(-12);

  if (incoming.length === 0) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }

  let client: OpenAI;
  try {
    client = getMimoClient();
  } catch {
    return Response.json(
      {
        error:
          "The uponly brain isn't configured yet. Set MIMO_API_KEY (and MIMO_BASE_URL) in your environment.",
      },
      { status: 503 }
    );
  }

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...incoming.map((m) => ({ role: m.role, content: m.content })),
  ];

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));

      try {
        // Tool loop: let the model call Base tools until it produces a final answer.
        const MAX_ROUNDS = 5;
        for (let round = 0; round < MAX_ROUNDS; round++) {
          const completion = await client.chat.completions.create({
            model: MIMO_MODEL,
            messages,
            tools: baseToolSchemas,
            stream: true,
          });

          let content = "";
          const toolCalls: Record<
            number,
            { id: string; name: string; args: string }
          > = {};

          for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta;
            if (!delta) continue;

            if (delta.content) {
              content += delta.content;
              send(delta.content);
            }

            for (const tc of delta.tool_calls ?? []) {
              const idx = tc.index ?? 0;
              const slot = (toolCalls[idx] ??= { id: "", name: "", args: "" });
              if (tc.id) slot.id = tc.id;
              if (tc.function?.name) slot.name = tc.function.name;
              if (tc.function?.arguments) slot.args += tc.function.arguments;
            }
          }

          const calls = Object.values(toolCalls).filter((c) => c.name);

          // No tools requested -> the streamed content is the final answer.
          if (calls.length === 0) {
            controller.close();
            return;
          }

          // Record the assistant turn that requested the tools.
          messages.push({
            role: "assistant",
            content: content || null,
            tool_calls: calls.map((c) => ({
              id: c.id,
              type: "function",
              function: { name: c.name, arguments: c.args || "{}" },
            })),
          });

          // Execute each tool and feed results back to the model.
          for (const c of calls) {
            let result: unknown;
            try {
              const parsed = c.args ? JSON.parse(c.args) : {};
              result = await runBaseTool(c.name, parsed);
            } catch (err) {
              result = {
                error: err instanceof Error ? err.message : "tool failed",
              };
            }
            messages.push({
              role: "tool",
              tool_call_id: c.id,
              content: JSON.stringify(result),
            });
          }
        }

        send("\n\n_(Stopped after several lookups — try narrowing your question.)_");
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        send(`\n\n⚠️ The brain hit an error: ${msg}`);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
