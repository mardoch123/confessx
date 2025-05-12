import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Vérifier l'authentification et les droits d'admin
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès non autorisé" });
  }
  
  const { id } = req.query;
  
  // Vérifier si l'utilisateur existe
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    // Mettre à jour un utilisateur
    if (req.method === 'PUT') {
      const { name, email, password, role } = req.body;
      
      // Préparer les données à mettre à jour
      const updateData = {
        name,
        email,
        role
      };
      
      // Si un nouveau mot de passe est fourni, le hasher
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      
      // Mettre à jour l'utilisateur
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData
      });
      
      // Supprimer le mot de passe de la réponse
      const { password: _, ...userWithoutPassword } = updatedUser;
      
      return res.status(200).json({ user: userWithoutPassword });
    }
    
    // Supprimer un utilisateur
    if (req.method === 'DELETE') {
      // Vérifier que l'utilisateur n'est pas en train de se supprimer lui-même
      if (user.id === session.user.id) {
        return res.status(400).json({ message: "Vous ne pouvez pas supprimer votre propre compte" });
      }
      
      // Supprimer d'abord les relations (générations, etc.)
      await prisma.generation.deleteMany({
        where: { userId: id }
      });
      
      // Supprimer l'utilisateur
      await prisma.user.delete({
        where: { id }
      });
      
      return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    }
    
    // Récupérer un utilisateur
    if (req.method === 'GET') {
      // Supprimer le mot de passe de la réponse
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({ user: userWithoutPassword });
    }
    
    // Méthode non autorisée
    return res.status(405).json({ message: "Méthode non autorisée" });
    
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}