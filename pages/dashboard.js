// pages/dashboard.jsx
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FiTrash2, FiShare2, FiCopy, FiRefreshCw } from "react-icons/fi";

export default function Dashboard() {
  const { data: session } = useSession();
  const [gens, setGens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch("/api/user-generations")
        .then((r) => r.json())
        .then((d) => setGens(d.generations))
        .finally(() => setLoading(false));
    }
  }, [session]);

  const deleteGen = async (id) => {
    if (!confirm("Tu veux vraiment virer ce sticker ? 😜")) return;
    await fetch(`/api/user-generations/${id}`, { method: "DELETE" });
    setGens((prev) => prev.filter((x) => x.id !== id));
  };

  const shareGen = async (gen) => {
    const text = `Prompt : ${gen.prompt}\nRéponse : ${gen.response}`;
    if (navigator.share) {
      navigator.share({ title: "Ma conf fun!", text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Texte copié, prêt à être collé n'importe où 🚀");
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-primary to-secondary">
        <p className="text-xl font-semibold text-light">Connecte-toi d'abord pour voir tes stickers !</p>
      </div>
    );
  }

  return (
    <div className="font-['Be_Vietnam_Pro'] min-h-screen bg-gradient-to-br from-light to-white font-sans">
      <Head>
        <title>Dashboard Ultra Modern</title>
        <meta name="description" content="Dashboard fun et clean" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Style pour empêcher le défilement horizontal */}
        <style jsx global>{`
        html, body, #__next {
          overflow-x: hidden !important;
          width: 100%;
          position: relative;
          margin: 0;
          padding: 0;
        }
        
        * {
          max-width: 100vw;
          box-sizing: border-box;
        }
      `}</style>
        
        {/* Configuration Tailwind personnalisée */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#C9AA71',
                    secondary: '#D4BC8B',
                    dark: '#1F2937',
                    light: '#F9F6F0',
                  },
                  fontFamily: {
                    sans: ['Be Vietnam Pro', 'sans-serif'],
                  },
                }
              }
            }
          `
        }} />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-3xl font-extrabold text-dark">🚀 Mes Confessions</h1>
          <button
            onClick={() => {
              setLoading(true);
              fetch("/api/user-generations")
                .then((r) => r.json())
                .then((d) => setGens(d.generations))
                .finally(() => setLoading(false));
            }}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            <FiRefreshCw /> <span>Rafraîchir</span>
          </button>
        </div>
      </header>

           
      <main className="max-w-5xl mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-500">Chargement… ⏳</p>
        ) : gens.length === 0 ? (
          <p className="text-center text-gray-600">Aucun sticker généré. Lance-toi ! 🎉</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gens.map((gen) => (
              <div
                key={gen.id}
                className="relative flex flex-col justify-between bg-white/50 backdrop-blur-lg p-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{ minHeight: '300px' }}
              >
                {/* Sticker corner */}
                <div className="absolute -top-3 -left-3 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full rotate-12 shadow-md">
                  😎 Sticker
                </div>
                <div className="overflow-hidden mb-4">
                  <h2 className="text-sm font-semibold text-dark mb-1 truncate">Prompt :</h2>
                  <p className="text-gray-700 text-sm break-words max-h-24 overflow-auto">{gen.prompt}</p>
                </div>
                <div className="overflow-hidden mb-4">
                  <h2 className="text-sm font-semibold text-dark mb-1">Réponse :</h2>
                  <p className="text-gray-800 text-sm break-words max-h-32 overflow-auto">{gen.response}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/30">
                  <button onClick={() => shareGen(gen)} className="flex items-center text-xs hover:text-primary">
                    <FiShare2 className="mr-1" /> Partager
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(gen.response)}
                    className="flex items-center text-xs hover:text-primary"
                  >
                    <FiCopy className="mr-1" /> Copier
                  </button>
                  <button onClick={() => deleteGen(gen.id)} className="flex items-center text-xs text-red-500 hover:opacity-80">
                    <FiTrash2 className="mr-1" /> Suppr
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/*
  Installation:
  1. Déposer ce fichier sous `pages/dashboard.jsx`.
  2. Installer les dépendances React Icons:
     npm install react-icons
  3. Assurer la configuration Tailwind CSS (cf. tailwind.config.js).
  4. Votre API doit gérer GET `/api/user-generations` et DELETE `/api/user-generations/[id]`.
  5. Lancer: npm run dev
*/
