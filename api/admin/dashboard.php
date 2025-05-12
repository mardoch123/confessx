<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Connexion à la base de données
$servername = "localhost";
$username = "votre_nom_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "votre_base_de_donnees";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Erreur de connexion à la base de données']));
}

// Vérifier l'authentification (à adapter selon votre système)
session_start();
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    echo json_encode(['message' => 'Accès non autorisé']);
    exit;
}

// Récupérer les statistiques
$totalUsers = 0;
$totalGenerations = 0;
$recentGenerations = [];

// Compter les utilisateurs
$sql = "SELECT COUNT(*) as count FROM users";
$result = $conn->query($sql);
if ($result && $row = $result->fetch_assoc()) {
    $totalUsers = $row['count'];
}

// Compter les générations
$sql = "SELECT COUNT(*) as count FROM generations";
$result = $conn->query($sql);
if ($result && $row = $result->fetch_assoc()) {
    $totalGenerations = $row['count'];
}

// Récupérer les générations récentes
$sql = "SELECT g.*, u.name, u.email FROM generations g 
        LEFT JOIN users u ON g.user_id = u.id 
        ORDER BY g.created_at DESC LIMIT 5";
$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $recentGenerations[] = [
            'id' => $row['id'],
            'prompt' => $row['prompt'],
            'createdAt' => $row['created_at'],
            'user' => [
                'name' => $row['name'],
                'email' => $row['email']
            ]
        ];
    }
}

$conn->close();

echo json_encode([
    'totalUsers' => $totalUsers,
    'totalGenerations' => $totalGenerations,
    'recentGenerations' => $recentGenerations
]);
?>