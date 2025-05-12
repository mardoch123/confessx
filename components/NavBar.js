import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const { data: session } = useSession();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold flex items-center"
        >
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="ConfessX Logo" className="h-10 mr-2" />
            </a>
          </Link>
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
          <Link href="/">
            <a className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>Accueil</a>
          </Link>
          <Link href="#write-form">
            <a className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>Écrire</a>
          </Link>
          <Link href="#faq">
            <a className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>FAQ</a>
          </Link>
          <Link href="#contact">
            <a className={`font-medium transition-colors hover:text-primary ${scrollY > 50 ? 'text-dark' : 'text-white'}`}>Contact</a>
          </Link>
          
          {session ? (
            <div className="relative group">
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all`}>
                <span>{session.user.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right">
                {session.user.role === 'admin' && (
                  <Link href="/admin">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Administration
                    </a>
                  </Link>
                )}
                <Link href="/profile">
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Mon profil
                  </a>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          ) : (
            <Link href="/auth/signin">
              <a className={`px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all`}>
                Se connecter
              </a>
            </Link>
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
              <Link href="/">
                <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Accueil</a>
              </Link>
              <Link href="#write-form">
                <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Écrire</a>
              </Link>
              <Link href="#faq">
                <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              </Link>
              <Link href="#contact">
                <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </Link>
              
              {session ? (
                <>
                  {session.user.role === 'admin' && (
                    <Link href="/admin">
                      <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                        Administration
                      </a>
                    </Link>
                  )}
                  <Link href="/profile">
                    <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                      Mon profil
                    </a>
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="font-medium text-dark hover:text-primary text-left"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <Link href="/auth/signin">
                  <a className="font-medium text-dark hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Se connecter
                  </a>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}