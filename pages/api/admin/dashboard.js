import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Vérifier l'authentification et les droits d'admin
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès non autorisé" });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    // Récupérer le nombre total d'utilisateurs
    const totalUsers = await prisma.user.count();
    
    // Récupérer le nombre total de générations
    const totalGenerations = await prisma.generation.count();
    
    // Récupérer les générations récentes
    const recentGenerations = await prisma.generation.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return res.status(200).json({
      totalUsers,
      totalGenerations,
      recentGenerations
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}