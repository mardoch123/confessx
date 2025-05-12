import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });
      
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Erreur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === 'PUT') {
    const { name, email, password } = req.body;
    
    try {
      const updateData = { name, email };
      
      if (password) {
        updateData.password = await hash(password, 10);
      }
      
      const user = await prisma.user.update({
        where: { id: session.user.id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      });
      
      return res.status(200).json({ message: "Profil mis à jour avec succès", user });
    } catch (error) {
      console.error("Erreur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}