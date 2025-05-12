import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

// Données fictives pour les émotions (à stocker dans une base de données dans une version future)
let emotions = [
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

  // Gestion des requêtes GET
  if (req.method === 'GET') {
    return res.status(200).json({ emotions });
  }

  // Gestion des requêtes POST
  if (req.method === 'POST') {
    try {
      const { name, emoji } = req.body;
      
      if (!name || !emoji) {
        return res.status(400).json({ message: "Nom et emoji sont requis" });
      }
      
      const newEmotion = {
        id: Date.now().toString(), // Génère un ID unique basé sur le timestamp
        name,
        emoji,
        createdAt: new Date()
      };
      
      emotions.push(newEmotion);
      
      return res.status(201).json({ emotion: newEmotion });
    } catch (error) {
      console.error("Erreur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}