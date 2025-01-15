// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// Import type definitions for Supabase Edge Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("OK", { headers: corsHeaders });
  }

  try {
    const now = new Date();
    const currentContext = {
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      dayOfWeek: now.toLocaleDateString("en-US", { weekday: "long" }),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const { task } = await req.json();
    console.log("Received task:", task); // Log the task being processed

    if (!task) {
      console.log("No task provided");
      return new Response(JSON.stringify({ error: "No task provided" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      console.log("OpenAI API key not found");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not found" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a task analyzer that helps categorize and schedule tasks. 
            Current context:
            - Current date: ${currentContext.date}
            - Current time: ${currentContext.time}
            - Day of week: ${currentContext.dayOfWeek}
            - Timezone: ${currentContext.timezone}
            
            Analyze the task and return a JSON object with the following properties:
            - importance: "high", "medium", or "low"
            - urgency: "high", "medium", or "low"
            - priority: one of ["anytime", "timely", "important", "critical"]
            - category: one of ["work", "personal", "health", "learning", "social", "side project"]
            - estimatedMinutes: number of minutes you estimate this task will take
            - startDate: ISO date string if mentioned, null if not specified
            - dueDate: ISO date string if mentioned, null if not specified
            - schedule: one of ["morning", "afternoon", "evening", "work hours", null] based on time preferences
            - recurrence: string describing frequency if mentioned (e.g., "daily at 9am", "weekdays", null if not recurring)
            
            When analyzing dates and times:
            1. Use the current date/time context provided above as reference
            2. Convert relative dates (e.g., "tomorrow", "next week") to actual dates
            3. Consider the current day of week for weekly patterns
            4. Use the provided timezone for any time-based calculations
            
            Extract this information from natural language in the task title and description.
            Base your analysis on keywords, context, and time-related phrases.`,
            },
            {
              role: "user",
              content: task,
            },
          ],
          response_format: { type: "json_object" },
        }),
      }
    );

    const openaiData = await openaiResponse.json();

    const analysisResult = openaiData?.choices?.[0]?.message.content;
    console.log("OpenAI Response:", analysisResult); // Log OpenAI response

    if (!analysisResult) {
      console.log("Analysis result not found");
      return new Response(
        JSON.stringify({ error: "Analysis failed, please try again" }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(openaiData.choices[0].message.content, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error); // Log the error details
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/analyze-tasks' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
