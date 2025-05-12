import { getServerSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  try {
    const generations = await prisma.generation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ generations });
  } catch (error) {
    console.error("Erreur lors de la récupération des générations:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}