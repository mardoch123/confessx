import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    // Extraire l'émotion et le message du prompt
    const promptParts = prompt.split('Message:');
    const emotionPart = promptParts[0].replace('Émotion:', '').trim();
    const messagePart = promptParts.length > 1 ? promptParts[1].trim() : '';

    // Créer un prompt pour l'IA
    const aiPrompt = `
      Tu es un conseiller empathique et bienveillant. 
      La personne ressent: ${emotionPart}. 
      Elle a partagé ce message: "${messagePart}".
      
      Réponds avec un message de réconfort et de soutien adapté à son émotion et à son message.
      Sois chaleureux, empathique et encourageant. Limite ta réponse à 3-4 phrases maximum.
    `;

    // Appel direct à l'API Gemini REST
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: aiPrompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Réponse d'erreur Gemini:", errorData);
      return res.status(500).json({ error: errorData.error?.message || "Erreur API Gemini" });
    }

    const data = await response.json();
    const completion = data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";

    // Récupérer la session utilisateur
    const session = await getServerSession(req, res, authOptions);
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) {
        await prisma.generation.create({
          data: {
            userId: user.id,
            prompt,
            response: completion,
          },
        });
      }
    }

    return res.status(200).json({ completion });
  } catch (error) {
    console.error('Erreur dans l\'API generate-response:', error);
    return res.status(500).json({ error: error.message });
  }
}