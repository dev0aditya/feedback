import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Provide a brief summary and sentiment (Positive, Neutral, Negative) for the following feedback:\n\n"${text}`,
      max_tokens: 100,
    });

    // Check if choices array exists and contains expected data
    if (!completion || !completion.choices || !completion.choices.length) {
      console.error("Unexpected response structure:", completion);
      return res
        .status(500)
        .json({ error: "Unexpected response structure from OpenAI" });
    }

    const output = completion.choices[0].text.trim();
    const [summary, sentiment] = output
      .split("\n")
      .map((line) => line.split(": ")[1]);

    // Respond with summary and sentiment
    res.status(200).json({ summary, sentiment });
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error generating summary and sentiment" });
  }
}
