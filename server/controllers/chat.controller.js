import { openai } from "../utils/openai.js";

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && typeof m === "object")
    .map((m) => ({
      role: m.role,
      content: typeof m.content === "string" ? m.content : "",
    }))
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant" || m.role === "system") &&
        m.content.trim().length > 0
    );
}

export const chat = async (req, res) => {
  try {
    const { messages, model } = req.body || {};

    const normalized = normalizeMessages(messages);
    if (normalized.length === 0) {
      return res.status(400).json({ message: "messages are required" });
    }

    const system = {
      role: "system",
      content:
        "You are SkinCast Assistant, a helpful skincare and haircare chatbot. Keep answers concise, practical, and safe. If the user has a serious reaction (swelling, trouble breathing, severe rash), advise medical help. If asked for medical diagnosis, respond cautiously.",
    };

    const completion = await openai.chat.completions.create({
      model: model || "meta-llama/llama-3-8b-instruct",
      messages: [system, ...normalized],
      temperature: 0.6,
    });

    const text = completion?.choices?.[0]?.message?.content ?? "";

    return res.json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error("Error in chat:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Chat request failed",
    });
  }
};

