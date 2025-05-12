import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { email } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Pour des raisons de sécurité, ne pas révéler si l'email existe ou non
      return res.status(200).json({ message: 'Si votre email est enregistré, vous recevrez un lien de réinitialisation.' });
    }

    // Générer un token unique
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Expire dans 1 heure

    // Enregistrer le token dans la base de données
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Dans un environnement de production, vous enverriez un email ici
    // Pour l'instant, nous retournons simplement un message de succès
    
    return res.status(200).json({ message: 'Si votre email est enregistré, vous recevrez un lien de réinitialisation.' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la réinitialisation du mot de passe.' });
  }
}