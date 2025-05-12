import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/fix-overflow.css';
import { useSession, signOut } from 'next-auth/react';

import CTAButton from '../components/CTAButton';
import FeatureCard from '../components/FeatureCard';
import Testimonial from '../components/Testimonial';
import FaqItem from '../components/FaqItem';
import EmailCapture from '../components/EmailCapture';
import EmotionModal from '../components/EmotionModal';

export default function Home() {
  const formRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [newModalOpen, setNewModalOpen] = useState(false);
  useState(false);
const [generatedResponse, setGeneratedResponse] = useState("");
const handleResponseGenerated = (response) => {
  setGeneratedResponse(response);
  setNewModalOpen(true);
};

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState({ emoji: '', text: '' });

  const openEmotionModal = (emoji, text) => {
    setSelectedEmotion({ emoji, text });
    setModalOpen(true);
  };

  useEffect(() => {
    // Script pour charger Tally
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
  
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    // Exposer la fonction handleResponseGenerated pour le modal
    window.handleResponseGenerated = (response) => {
      setGeneratedResponse(response);
      setNewModalOpen(true);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener('scroll', handleScroll);
      delete window.handleResponseGenerated;
    };
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen font-['Be_Vietnam_Pro',sans-serif] bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <Head>
        <title>ConfessX | Écris, partage, guéris</title>
        <meta name="description" content="Un espace bienveillant pour écrire anonymement sur tes peines" />
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

     {/* Nouveau Modal */}
     {newModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Réponse Générée !</h2>
            <div className="mb-6 p-4 bg-light rounded-lg">
              <p className="text-gray-700">{generatedResponse}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setNewModalOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedResponse);
                  alert('Copié !');
                }}
                className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition"
              >
                Copier
              </button>
              <button
                onClick={() => {
                  // Sauvegarder dans la base de données
                  fetch('/api/save-generation', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      prompt: "Message de réconfort",
                      response: generatedResponse
                    }),
                  })
                  .then(response => response.json())
                  .then(data => {
                    alert('Enregistré avec succès !');
                  })
                  .catch(error => {
                    console.error('Erreur:', error);
                    alert('Erreur lors de l\'enregistrement');
                  });
                }}
                className="px-4 py-2 bg-dark text-white rounded hover:bg-dark/90 transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold flex items-center"
          >
            <img src="/images/logo.png" alt="ConfessX Logo" className="h-10 mr-2" />
          </motion.div>

          {/* Menu pour mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${scrollY > 50 ? 'text-dark' : 'text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Menu pour desktop */}
          <motion.nav 
            className="hidden md:flex space-x-8 items-center"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#" className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>Accueil</a>
            <a href="#write-form" className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>Écrire</a>
            <a href="#faq" className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>FAQ</a>
          <a href="#contact" className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>Contact</a>
          
          {session ? (
            <div className="flex items-center space-x-4">
              <span
                className={`font-medium cursor-pointer ${scrollY > 50 ? 'text-dark' : 'text-white'}`}
                onClick={() => window.location.href = '/dashboard'}
                title="Voir mon dashboard"
              >
                Bonjour, {session.user.name}
              </span>
              <button 
                onClick={() => signOut()}
                className={`px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all`}
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/signin" className={`px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all`}>
                Se connecter
              </Link>
              <Link href="/auth/signup" className={`ml-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all`}>
                S'inscrire
              </Link>
            </>
          )}
          </motion.nav>
        </div>

        {/* Menu mobile déroulant */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <a href="#" className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Accueil</a>
                <a href="#write-form" className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Écrire</a>
                <a href="#faq" className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                <a href="#contact" className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</a>
                
                {session ? (
                  <div className="flex items-center space-x-4">
                    <span
                      className={`font-medium cursor-pointer ${scrollY > 50 ? 'text-dark' : 'text-white'}`}
                      onClick={() => window.location.href = '/dashboard'}
                      title="Voir mon dashboard"
                    >
                      Bonjour, {session.user.name}
                    </span>
                    <button 
                      onClick={() => signOut()}
                      className={`px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all`}
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/signin" legacyBehavior>
                      <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                        Se connecter
                      </a>
                    </Link>
                    <Link href="/auth/signup" legacyBehavior>
                      <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                        S'inscrire
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Fond émotionnel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-primary/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
              Espace d'expression anonyme
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Libère ton <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">cœur</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Un espace bienveillant où tu peux exprimer tes émotions, partager tes peines et commencer ton chemin vers la guérison.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CTAButton 
              text="Écrire ma lettre anonyme" 
              onClick={scrollToForm}
              className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/30 transform hover:-translate-y-1 transition-all"
            />
            <a 
              href="#testimonials" 
              className="inline-flex items-center justify-center text-lg px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/20 transition-all"
            >
              Découvrir les témoignages
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>

        {/* Éléments décoratifs flottants */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Intro Section avec effet de parallaxe */}
      <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Notre mission
          </motion.span>
          
          <motion.h2 
            className="text-4xl font-bold mb-8 text-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Un espace pour <span className="text-primary">toi</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bienvenue dans un espace bienveillant où tu peux exprimer tes émotions les plus profondes, en toute confidentialité. 
            Que tu traverses une rupture douloureuse, un deuil difficile ou une période de solitude, 
            nous t'offrons un lieu pour déposer tes mots, libérer ton cœur et commencer ton chemin vers la guérison.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary mb-2">100%</span>
                <span className="text-gray-600">Anonyme</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary mb-2">24/7</span>
                <span className="text-gray-600">Disponible</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary mb-2">0€</span>
                <span className="text-gray-600">Inscription gratuite</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Section avec cartes modernes */}
      <section className="py-24 px-4 bg-gradient-to-b from-light/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Bienfaits de l'écriture
            </motion.span>
            
            <motion.h2
              className="text-4xl font-bold mb-6 text-dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Pourquoi <span className="text-primary">écrire</span> ?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600"
            >
              L'écriture est un puissant outil thérapeutique qui t'aide à mettre des mots sur tes émotions et à commencer ton processus de guérison.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/70 overflow-hidden group"
            >
              <div className="h-2 bg-gradient-to-r from-red-400 to-red-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  💔
                </div>
                <h3 className="text-xl font-bold mb-4 text-dark">Rupture</h3>
                <p className="text-gray-600">
                  L'écriture permet de donner un sens à ta douleur après une séparation. Exprime ce que tu n'as pas pu dire et commence à reconstruire ton cœur.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/70 overflow-hidden group"
            >
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  😢
                </div>
                <h3 className="text-xl font-bold mb-4 text-dark">Deuil</h3>
                <p className="text-gray-600">
                  Face à la perte, les mots deviennent un pont entre toi et tes souvenirs. Écris pour honorer, pour pleurer, pour continuer à avancer.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/70 overflow-hidden group"
            >
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🌙
                </div>
                <h3 className="text-xl font-bold mb-4 text-dark">Solitude</h3>
                <p className="text-gray-600">
                  Dans les moments où tu te sens seul(e), tes mots créent une présence. Ils t'écoutent sans jugement et te rappellent que tes sentiments sont légitimes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section avec design moderne */}
      <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Témoignages
            </motion.span>
            
            <motion.h2
              className="text-4xl font-bold mb-6 text-dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ils ont <span className="text-primary">écrit</span>, ils témoignent
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600"
            >
              Découvre comment l'écriture a aidé d'autres personnes à traverser des moments difficiles.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Carousel 
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              preventMovementUntilSwipeScrollTolerance={true}
              swipeScrollTolerance={50}
              width="100%"
              interval={5000}
              className="testimonial-carousel"
            >
              <div className="px-4 pb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 relative">
                  <div className="absolute -top-5 left-10 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 mb-6 pt-6">
                    "Après notre rupture, j'avais tant de choses non-dites qui me pesaient. Écrire ici m'a permis de les exprimer enfin et de commencer à tourner la page."
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary opacity-30"></div>
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-dark">Marie</div>
                      <div className="text-sm text-gray-500">28 ans</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 pb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 relative">
                  <div className="absolute -top-5 left-10 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 mb-6 pt-6">
                    "Perdre mon père a été la chose la plus difficile de ma vie. Mettre des mots sur ma douleur m'a aidé à l'apprivoiser jour après jour."
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-primary opacity-30"></div>
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-dark">Thomas</div>
                      <div className="text-sm text-gray-500">34 ans</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 pb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 relative">
                  <div className="absolute -top-5 left-10 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 mb-6 pt-6">
                    "Dans mes nuits d'insomnie où la solitude me rongeait, j'ai trouvé du réconfort à déposer mes pensées ici. C'est devenu mon rituel de guérison."
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-secondary to-pink-500 opacity-30"></div>
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-dark">Sophie</div>
                      <div className="text-sm text-gray-500">26 ans</div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* Tally Form Section avec design moderne */}
      <section ref={formRef} className="py-24 px-4 bg-gradient-to-b from-white/50 to-light/50 relative" id="write-form">
        <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Exprime-toi
            </motion.span>
            
            <motion.h2
              className="text-4xl font-bold mb-6 text-dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Écris ta <span className="text-primary">lettre anonyme</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600 mb-10"
            >
              Prends le temps d'exprimer ce que tu ressens. Ton message est totalement anonyme et tu peux choisir de le partager ou non.
            </motion.p>
          </div>

          <EmotionModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            emotion={selectedEmotion.emoji} 
            emotionText={selectedEmotion.text} 
          />
          
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-center mb-8">
              <img src="/images/logo.png" alt="ConfessX Logo" className="h-16" />
            </div>
            
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center text-lg">Comment te sens-tu ?</label>
                <div className="flex justify-center gap-6 flex-wrap">
                  <button
                    className="text-5xl p-4 rounded-full shadow-lg bg-gradient-to-br from-pink-200 to-purple-200 hover:scale-110 transition-transform border-2 border-transparent hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
                    onClick={() => openEmotionModal('😢', 'Triste')}
                    aria-label="Triste"
                  >😢</button>
                  <button
                    className="text-5xl p-4 rounded-full shadow-lg bg-gradient-to-br from-blue-200 to-blue-400 hover:scale-110 transition-transform border-2 border-transparent hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
                    onClick={() => openEmotionModal('😔', 'Mélancolique')}
                    aria-label="Mélancolique"
                  >😔</button>
                  <button
                    className="text-5xl p-4 rounded-full shadow-lg bg-gradient-to-br from-yellow-200 to-yellow-400 hover:scale-110 transition-transform border-2 border-transparent hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
                    onClick={() => openEmotionModal('😕', 'Confus')}
                    aria-label="Confus"
                  >😕</button>
                  <button
                    className="text-5xl p-4 rounded-full shadow-lg bg-gradient-to-br from-green-200 to-green-400 hover:scale-110 transition-transform border-2 border-transparent hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
                    onClick={() => openEmotionModal('😌', 'Apaisé')}
                    aria-label="Apaisé"
                  >😌</button>
                  <button
                    className="text-5xl p-4 rounded-full shadow-lg bg-gradient-to-br from-purple-200 to-pink-300 hover:scale-110 transition-transform border-2 border-transparent hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
                    onClick={() => openEmotionModal('🙂', 'Content')}
                    aria-label="Content"
                  >🙂</button>
                </div>
              </div>
            
            <div className="flex justify-center">
              <button 
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1 transition-all"
              >
                Commencer la conversation
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              En soumettant ta lettre, tu acceptes nos <a href="#" className="text-primary hover:underline">conditions d'utilisation</a> et notre <a href="#" className="text-primary hover:underline">politique de confidentialité</a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section avec accordéon moderne */}
      <section id="faq" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Questions fréquentes
            </motion.span>
            
            <motion.h2
              className="text-4xl font-bold mb-6 text-dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Besoin de <span className="text-primary">réponses</span> ?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600"
            >
              Nous avons rassemblé les questions les plus fréquentes pour t'aider à comprendre notre démarche.
            </motion.p>
          </div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FaqItem 
              question="Comment mon anonymat est-il garanti ?" 
              answer="Nous ne collectons aucune information personnelle identifiable lors de la soumission de ta lettre. Ton adresse IP n'est pas enregistrée et aucune connexion à un compte n'est requise. Toutes les données sont cryptées et sécurisées."
            />
            
            <FaqItem 
              question="Que devient ma lettre une fois envoyée ?" 
              answer="Ta lettre est stockée de manière sécurisée dans notre base de données. Elle peut être partagée anonymement sur notre plateforme si tu donnes ton accord, mais jamais avec ton identité. Tu gardes le contrôle total sur ton contenu."
            />
            
            <FaqItem 
              question="Puis-je supprimer ma lettre après l'avoir envoyée ?" 
              answer="Oui, chaque lettre est associée à un code unique que tu reçois après l'envoi. Tu peux utiliser ce code pour supprimer ta lettre à tout moment, sans avoir à justifier ta décision."
            />
            
            <FaqItem 
              question="Est-ce que quelqu'un me répondra ?" 
              answer="Actuellement, nous développons une fonctionnalité de réponse IA empathique qui pourra t'offrir un retour bienveillant. Dans le futur, nous envisageons également une communauté de soutien modérée où des personnes pourront échanger sur leurs expériences."
            />
            
            <FaqItem 
              question="Est-ce que l'inscription est vraiment gratuit ?" 
              answer="Oui, l'inscription est entièrement gratuit. Nous croyons que l'expression émotionnelle et la guérison devraient être accessibles à tous, sans barrière financière."
            />
          </motion.div>
        </div>
      </section>

      {/* Email Capture Section avec design moderne */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-light/50 to-white relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Reste connecté(e)
          </motion.span>
          
          <motion.h2
            className="text-4xl font-bold mb-6 text-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Rejoins notre <span className="text-primary">communauté</span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-700 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Reçois nos nouveautés et découvre des ressources pour t'accompagner dans ton cheminement émotionnel.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <EmailCapture />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-10 space-x-6"
          >
            <a href="#" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-lg transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-lg transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-lg transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Future AI Response Section avec design moderne */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Bientôt disponible
              </span>
              
              <h2 className="text-4xl font-bold mb-6 text-dark">
                Reçois une <span className="text-primary">réponse</span> bienveillante
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                Notre IA empathique est en cours de développement pour t'offrir un retour personnalisé et bienveillant à ta lettre. Un écho à tes mots, une présence dans ton cheminement.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Réponses personnalisées et empathiques</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Ressources adaptées à ta situation</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Soutien continu dans ton processus de guérison</p>
                </div>
              </div>
              
              <button className="px-8 py-3 bg-white text-primary font-medium rounded-full shadow-md hover:shadow-lg transition-all">
                Être notifié(e) au lancement
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark">Réponse IA</h3>
                    <p className="text-sm text-gray-500">Aujourd'hui, 14:32</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <p className="text-gray-700 italic">
                    "Je me sens si seule depuis notre rupture. Chaque jour est un combat pour ne pas lui envoyer un message..."
                  </p>
                </div>
                
                <div className="text-gray-700 mb-6">
                  <p className="mb-3">
                    Je comprends combien cette solitude peut être difficile à porter. Ce que tu ressens est parfaitement normal après une rupture.
                  </p>
                  <p>
                    Chaque jour où tu résistes à l'envie de reprendre contact est une petite victoire. Prends le temps d'honorer tes émotions tout en te rappelant que cette période difficile n'est qu'une étape dans ton cheminement.
                  </p>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-primary">Ressources suggérées</span>
                  <span className="text-gray-500">Confidentiel et sécurisé</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer avec design moderne */}
      <footer className="py-12 px-4 bg-dark text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-6">
                <span className="text-primary">Confess</span>
                <span className="text-white">X</span>
              </div>
              <p className="text-gray-400 mb-6">
                Un espace bienveillant pour exprimer tes émotions et commencer ton chemin vers la guérison.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Accueil</a></li>
                <li><a href="#write-form" className="text-gray-400 hover:text-primary transition-colors">Écrire une lettre</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">Témoignages</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Ressources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Articles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Podcasts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Livres recommandés</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Professionnels</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Légal</h3>
              <ul className="space-y-3">
                <li><a href="/conditions-utilisation" className="text-gray-400 hover:text-primary transition-colors">Conditions d'utilisation</a></li>
                <li><a href="/politique-confidentialite" className="text-gray-400 hover:text-primary transition-colors">Politique de confidentialité</a></li>
                <li><a href="/legal/legal-notice" className="text-gray-400 hover:text-primary transition-colors">Mentions légales</a></li>
                <li><a href="/legal/cookies" className="text-gray-400 hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} LibèreTonCœur. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}