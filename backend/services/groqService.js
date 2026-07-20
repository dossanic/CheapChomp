// Reference: https://console.groq.com/docs/text-chat
async function estimatePrice(ingredients, location = "Toronto, Ontario") {
  // Make a POST request to the Groq API for chat completions
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            // Prompt Groq to estimate grocery prices and return structured JSON
            content: `Estimate grocery prices in ${location}, Canada as of 2026 for these ingredients: ${ingredients.join(", ")}. Consider average prices from major grocery stores like Loblaws, No Frills, and Metro.
            For each ingredient, return ONLY ONE price estimate representing the average price for a standard grocery store purchase size. Do not return multiple entries for the same ingredient.
            For unit_type, only use simple categories: weight, volume, count, package, or spice.
            For base_unit, use standard units only: kg, g, lb, oz, L, ml, each, bunch, can, bottle, bag, box, jar, tbsp, tsp.
            Return the ingredient name exactly as provided in the input, do not add extra words or descriptions.
            Return JSON array only, no extra text, no markdown: [{"ingredient": "name", "min": 0.00, "max": 0.00, "unit_type": "string", "base_unit": "string"}]`,
          },
        ],
      }),
    },
  );

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(
      `Error fetching Groq API: ${response.status} ${response.statusText}`,
    );
  }
  const data = await response.json();

  // Extract the content from the response
  const content = data.choices[0].message.content;

  // Clean the content to remove any markdown or formatting and parse the JSON
  const cleanContent = content
    .replace(/```json\n?|\n?```/g, "")
    .replace(/\*\*.*?\*\*/g, "")
    .trim();

  // Use regex to extract the JSON array from the cleaned content
  const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
  return JSON.parse(jsonMatch[0]);
}

module.exports = { estimatePrice };
