import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

// Paramètres par défaut (à stocker dans une base de données dans une version future)
let siteSettings = {
  siteName: 'ConfessX',
  siteDescription: 'Exprimez vos émotions et recevez du réconfort par IA',
  contactEmail: 'contact@confessx.com',
  maxGenerationsPerDay: 10,
  enableRegistration: true,
  maintenanceMode: false
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès non autorisé" });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ settings: siteSettings });
  }

  if (req.method === 'PUT') {
    try {
      // Mettre à jour les paramètres (en mémoire pour l'instant)
      siteSettings = { ...siteSettings, ...req.body };
      return res.status(200).json({ 
        message: "Paramètres enregistrés avec succès", 
        settings: siteSettings 
      });
    } catch (error) {
      console.error("Erreur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}