import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import { useSession } from 'next-auth/react';

export default function NewUser() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Rediriger si non connecté ou non admin
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=/admin/users/new');
    return null;
  }

  if (session && session.user.role !== 'admin') {
    router.push('/');
    return null;
  }

  useEffect(() => {
    if (id && session && session.user.role === 'admin') {
      setIsEditMode(true);
      fetchUserData(id);
    }
  }, [id, session]);

  const fetchUserData = async (userId) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/users/${userId}`);
      
      if (!res.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }
      
      const data = await res.json();
      setFormData({
        name: data.user.name || '',
        email: data.user.email || '',
        password: '', // Ne pas remplir le mot de passe pour des raisons de sécurité
        role: data.user.role || 'user'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const url = isEditMode 
        ? `/api/admin/users/${id}` 
        : '/api/admin/users';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      // Si en mode édition et que le mot de passe est vide, ne pas l'envoyer
      const dataToSend = isEditMode && !formData.password 
        ? { ...formData, password: undefined } 
        : formData;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || `Erreur lors de la ${isEditMode ? 'modification' : 'création'}`);
      
      setSuccess(`Utilisateur ${isEditMode ? 'modifié' : 'créé'} avec succès`);
      
      if (!isEditMode) {
        setFormData({ name: '', email: '', password: '', role: 'user' });
      }
      
      // Rediriger vers la liste des utilisateurs après 2 secondes
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} un utilisateur</h1>
        <p className="text-gray-600">{isEditMode ? 'Modifiez les informations de l\'utilisateur' : 'Créez un nouveau compte utilisateur'}</p>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          
          {isEditMode && (
            <div className="text-sm text-gray-500 mb-4">
              Note: Laissez le champ mot de passe vide pour conserver le mot de passe actuel.
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/admin/users')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (isEditMode ? 'Modification...' : 'Création...') : (isEditMode ? 'Enregistrer les modifications' : 'Créer l\'utilisateur')}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}