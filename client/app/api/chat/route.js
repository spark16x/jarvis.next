import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAuthUser } from '@/app/lib/auth';
import pool from '@/app/lib/db';
import oauth2Client from '@/app/lib/google_client';
import tools from '@/app/lib/function';
import systemInstruction from '@/app/lib/systemInstruction';

export const dynamic = 'force-dynamic';

const apiKey = process.env.NVIDIA_API_KEY || 'placeholder_nvidia_key';
const openai = new OpenAI({
  apiKey,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Emulate responses.create using chat.completions.create
openai.responses = {
  create: async function({ model, tools: apiTools, input, instructions }) {
    const messages = input.map(item => {
      if (item.role) {
        return { role: item.role, content: item.content };
      }
      if (item.type === 'function_call_output') {
        return { role: 'tool', tool_call_id: item.call_id, content: item.output };
      }
      if (item.type === 'function_call') {
        return {
          role: 'assistant',
          tool_calls: [{
            id: item.call_id,
            type: 'function',
            function: { name: item.name, arguments: item.arguments }
          }]
        };
      }
      return item;
    });

    if (instructions) {
      messages.unshift({ role: 'system', content: instructions });
    }

    const formattedTools = apiTools?.map(t => {
      return {
        type: 'function',
        function: {
          name: t.name,
          description: t.description,
          parameters: t.parameters
        }
      };
    });

    // Map z-ai/glm-5.2 to meta/llama-3.1-70b-instruct or meta/llama-3.3-70b-instruct for standard tool calling
    const completionModel = model === "z-ai/glm-5.2" ? "meta/llama-3.1-70b-instruct" : (model || "meta/llama-3.1-70b-instruct");

    const completion = await openai.chat.completions.create({
      model: completionModel,
      messages,
      tools: formattedTools,
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 16384,
      seed: 42,
    });

    const choice = completion.choices[0];
    const output = [];
    let output_text = choice.message.content || '';

    if (choice.message.tool_calls) {
      for (const tc of choice.message.tool_calls) {
        output.push({
          type: 'function_call',
          call_id: tc.id,
          name: tc.function.name,
          arguments: tc.function.arguments
        });
      }
    }

    return {
      output,
      output_text
    };
  }
};

const openAiTools = [
  {
    type: "function",
    name: "getdate",
    description: "Returns current date information",
    parameters: { type: "object", properties: {} }
  },
  {
    type: "function",
    name: "duckduckgoSearch",
    description: "Search the web using DuckDuckGo",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" }
      },
      required: ["query"]
    }
  },
  {
    type: "function",
    name: "wikipediaSearch",
    description: "Search for information on Wikipedia",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" }
      },
      required: ["query"]
    }
  },
  {
    type: "function",
    name: "listEmails",
    description: "Retrieve the latest 5 user emails from Gmail",
    parameters: { type: "object", properties: {} }
  },
  {
    type: "function",
    name: "getUpcomingEvents",
    description: "Fetch user's upcoming events from Google Calendar",
    parameters: { type: "object", properties: {} }
  },
  {
    type: "function",
    name: "getWeather",
    description: "Get current weather of a city",
    parameters: {
      type: "object",
      properties: {
        city: { type: "string", description: "City name" }
      },
      required: ["city"]
    }
  },
  {
    type: "function",
    name: "searchSong",
    description: "Search for songs using Saavn API",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Song search query" }
      },
      required: ["query"]
    }
  },
  {
    type: "function",
    name: "searchInstagramUser",
    description: "Search public Instagram profile by username",
    parameters: {
      type: "object",
      properties: {
        username: { type: "string", description: "Instagram username" }
      },
      required: ["username"]
    }
  },
  {
    type: "function",
    name: "searchTwitterUser",
    description: "Search for a Twitter profile",
    parameters: {
      type: "object",
      properties: {
        username: { type: "string", description: "Twitter username" }
      },
      required: ["username"]
    }
  },
  {
    type: "function",
    name: "searchTikTokUser",
    description: "Find a TikTok user's profile",
    parameters: {
      type: "object",
      properties: {
        username: { type: "string", description: "TikTok username" }
      },
      required: ["username"]
    }
  },
  {
    type: "function",
    name: "searchYouTubeChannel",
    description: "Search for a YouTube channel",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "YouTube channel search query" }
      },
      required: ["query"]
    }
  },
  {
    type: "function",
    name: "searchLinkedInProfile",
    description: "Find LinkedIn profiles using Google search",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Person name" }
      },
      required: ["name"]
    }
  },
  {
    type: "function",
    name: "searchgoogle",
    description: "Search Google for general queries",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" }
      },
      required: ["query"]
    }
  },
  {
    type: "function",
    name: "dounlodesongsportify",
    description: "to download songs of spotify using id of spotify song",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Spotify song ID" }
      },
      required: ["id"]
    }
  },
  {
    type: "function",
    name: "searchsongsportify",
    description: "to search songs on spotify",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" }
      },
      required: ["query"]
    }
  }
];

export async function POST(request) {
  try {
    const authUser = await getAuthUser();
    const { messages } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ response: "Please enter a valid message." });
    }

    let userRow = null;
    if (authUser) {
      const dbRes = await pool.query('SELECT * FROM auth.users WHERE id=$1', [authUser.id]);
      userRow = dbRes.rows[0];
    }

    // Map history to the responses input format
    const input = messages.map(msg => {
      let role = msg.role;
      if (role === 'model') role = 'assistant';
      return { role, content: msg.parts?.[0]?.text || '' };
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 2. Prompt the model with tools defined using responses API
          let response = await openai.responses.create({
            model: "z-ai/glm-5.2",
            tools: openAiTools,
            input,
            instructions: systemInstruction
          });

          // Preserve model output for the next turn
          input.push(...response.output);

          let loopCount = 0;
          const maxLoops = 5;

          while (loopCount < maxLoops) {
            const toolCalls = response.output.filter(item => item.type === "function_call");
            if (toolCalls.length === 0) {
              break;
            }

            loopCount++;

            for (const item of toolCalls) {
              const toolName = item.name;
              let params = {};
              try {
                params = typeof item.arguments === 'string' ? JSON.parse(item.arguments) : (item.arguments || {});
              } catch (parseErr) {
                console.error("Failed to parse tool arguments:", item.arguments);
              }

              // Send update to UI about function call starting
              controller.enqueue(encoder.encode(`\n\n⚙️ *Executing tool \`${toolName}\`...*\n\n`));

              let fun_res;
              const fun = tools[toolName];
              if (!fun) {
                console.warn(`Attempted to execute unavailable tool: ${toolName}`);
                fun_res = `Tool ${toolName} is currently unavailable.`;
              } else if (toolName === 'listEmails' || toolName === 'getUpcomingEvents') {
                if (userRow && userRow.google_token) {
                  try {
                    oauth2Client.setCredentials(JSON.parse(userRow.google_token));
                    fun_res = await fun(oauth2Client);
                  } catch (err) {
                    console.error("Google API execution failed:", err.message);
                    fun_res = "Please verify your Google authentication credentials.";
                  }
                } else {
                  fun_res = "Please link your Google account to access this feature.";
                }
              } else {
                try {
                  fun_res = await fun(params);
                } catch (err) {
                  console.error(`Tool execution error in ${toolName}:`, err.message);
                  fun_res = `Execution error: ${err.message}`;
                }
              }

              // Provide function call results to the model
              input.push({
                type: "function_call_output",
                call_id: item.call_id,
                output: typeof fun_res === 'string' ? fun_res : JSON.stringify(fun_res),
              });
            }

            // Ask the model for a response again, now that it has the tool execution outputs
            response = await openai.responses.create({
              model: "z-ai/glm-5.2",
              tools: openAiTools,
              input,
              instructions: systemInstruction
            });

            // Preserve new model outputs for the next loop iteration (and future conversation history)
            input.push(...response.output);
          }

          // Parse final text response to extract actual answer if model returned it as JSON
          let finalResponse = response.output_text;
          try {
            let cleanedText = finalResponse.trim();
            if (cleanedText.startsWith('```')) {
              cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
            }
            const parsed = JSON.parse(cleanedText);
            if (parsed && parsed.output) {
              finalResponse = parsed.output;
            }
          } catch (e) {
            // Not valid JSON, keep as is
          }

          controller.enqueue(encoder.encode(finalResponse));
          controller.close();
        } catch (streamErr) {
          console.error("Stream generation error:", streamErr);
          controller.enqueue(encoder.encode(`\n\n❌ Error: ${streamErr.message}`));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      }
    });

  } catch (err) {
    console.error("NVIDIA Chat API route handler error:", err);
    return new NextResponse("Server encountered an error while processing NVIDIA chat request.", { status: 500 });
  }
}
