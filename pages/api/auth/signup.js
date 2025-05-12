import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

// Utilisation d'une instance unique de PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const { name, email, password } = req.body;
    console.log('Données reçues:', { name, email, password: '***' });

    // Validation des données
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Validation du format d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format d\'email invalide' });
    }

    // Validation de la force du mot de passe
    if (password.length < 8) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
    }

    // Hachage du mot de passe
    const hashedPassword = await hash(password, 12);

    // Création de l'utilisateur avec les champs minimaux requis
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user',
      },
    });

    console.log('Utilisateur créé avec succès:', { id: user.id, email: user.email });

    // Ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Erreur détaillée lors de l\'inscription :', error);
    
    // Réponse d'erreur plus détaillée
    return res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message
    });
  } finally {
    // Fermeture de la connexion Prisma
    await prisma.$disconnect();
  }
}