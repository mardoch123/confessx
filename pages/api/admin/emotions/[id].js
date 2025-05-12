import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

// Données fictives pour les émotions (à stocker dans une base de données dans une version future)
// Nous définissons les émotions ici plutôt que d'essayer de les importer
const emotions = [
  { id: '1', name: 'Joie', emoji: '😊', createdAt: new Date() },
  { id: '2', name: 'Tristesse', emoji: '😢', createdAt: new Date() },
  { id: '3', name: 'Colère', emoji: '😡', createdAt: new Date() },
  { id: '4', name: 'Peur', emoji: '😨', createdAt: new Date() },
  { id: '5', name: 'Surprise', emoji: '😲', createdAt: new Date() },
  { id: '6', name: 'Dégoût', emoji: '🤢', createdAt: new Date() },
];

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès non autorisé" });
  }

  const { id } = req.query;

  // Gestion des requêtes DELETE
  if (req.method === 'DELETE') {
    try {
      // Trouver l'index de l'émotion à supprimer
      const index = emotions.findIndex(emotion => emotion.id === id);
      
      if (index === -1) {
        return res.status(404).json({ message: "Émotion non trouvée" });
      }
      
      // Supprimer l'émotion du tableau
      emotions.splice(index, 1);
      
      return res.status(200).json({ message: "Émotion supprimée avec succès" });
    } catch (error) {
      console.error("Erreur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}