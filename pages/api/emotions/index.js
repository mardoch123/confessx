import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  if (req.method === 'GET') {
    try {
      // Pour l'instant, nous allons simuler des émotions car elles ne sont pas dans votre schéma
      // Vous devrez ajouter un modèle Emotion à votre schéma Prisma
      const emotions = [
        { id: '1', name: 'Joie', createdAt: new Date() },
        { id: '2', name: 'Tristesse', createdAt: new Date() },
        { id: '3', name: 'Colère', createdAt: new Date() },
        { id: '4', name: 'Peur', createdAt: new Date() },
        { id: '5', name: 'Surprise', createdAt: new Date() },
      ];
      
      return res.status(200).json({ emotions });
    } catch (error) {
      console.error("Erreur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}