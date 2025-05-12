import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="mr-3 md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/admin" className="text-xl font-bold">
              Sentiment Admin
            </Link>
          </div>
          
          {session && (
            <div className="flex items-center">
              <span className="mr-4 hidden md:inline">{session.user.name || session.user.email}</span>
              <button 
                onClick={handleSignOut}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-gray-800 text-white w-64 min-h-screen fixed md:static z-30 transition-all duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-4">
            <div className="mb-8 mt-4">
              <h2 className="text-xl font-semibold mb-6">Administration</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/admin" 
                      className={`block py-2 px-4 rounded hover:bg-gray-700 ${router.pathname === '/admin' ? 'bg-gray-700' : ''}`}
                    >
                      Tableau de bord
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/users" 
                      className={`block py-2 px-4 rounded hover:bg-gray-700 ${router.pathname.startsWith('/admin/users') ? 'bg-gray-700' : ''}`}
                    >
                      Utilisateurs
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/generations" 
                      className={`block py-2 px-4 rounded hover:bg-gray-700 ${router.pathname.startsWith('/admin/generations') ? 'bg-gray-700' : ''}`}
                    >
                      Générations
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/emotions" 
                      className={`block py-2 px-4 rounded hover:bg-gray-700 ${router.pathname.startsWith('/admin/emotions') ? 'bg-gray-700' : ''}`}
                    >
                      Émotions
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/settings" 
                      className={`block py-2 px-4 rounded hover:bg-gray-700 ${router.pathname.startsWith('/admin/settings') ? 'bg-gray-700' : ''}`}
                    >
                      Paramètres
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            
            <div className="mt-auto">
              <Link 
                href="/" 
                className="block py-2 px-4 rounded hover:bg-gray-700 text-gray-300"
              >
                Retour au site
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Overlay pour fermer le sidebar sur mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Contenu principal */}
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}