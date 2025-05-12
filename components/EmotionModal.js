import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function EmotionModal({ isOpen, onClose, emotion, emotionText }) {
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini'); // Gemini par défaut
  const [localCompletion, setLocalCompletion] = useState('');
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/generate-response',
    onResponse: (response) => {
      // Vérifier si la réponse est une réinitialisation
      if (response.status === 200) {
        response.json().then(data => {
          setLocalCompletion(data.completion);
        });
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Appel à l'API AI pour générer une réponse
    const result = await complete(`Émotion: ${emotionText}. Message: ${message}`, {
      body: { model: selectedModel }
    });
    setLocalCompletion(result);
  };

  // Utiliser localCompletion au lieu de completion
  const currentCompletion = localCompletion || completion;

  const [isSaving, setIsSaving] = useState(false);

  const saveResponse = async () => {
    if (!currentCompletion) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Émotion: ${emotionText}. Message: ${message}`,
          response: currentCompletion
        }),
      });
      
      const data = await response.json();
      alert('Réponse enregistrée avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl">{emotion}</span>
              <h3 className="ml-3 text-xl font-semibold text-gray-900">{emotionText}</h3>
            </div>
            
            {!currentCompletion ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Partagez ce que vous ressentez...
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Exprimez vos émotions ici..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choisissez le modèle d'IA
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="model"
                        value="gemini"
                        checked={selectedModel === 'gemini'}
                        onChange={() => setSelectedModel('gemini')}
                      />
                      <span className="ml-2">Gemini (recommandé)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="model"
                        value="openai"
                        checked={selectedModel === 'openai'}
                        onChange={() => setSelectedModel('openai')}
                      />
                      <span className="ml-2">ChatGPT</span>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  {isLoading ? 'Génération en cours...' : 'Recevoir du réconfort'}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-light rounded-lg">
                  <h4 className="font-medium text-dark mb-2">Message de réconfort :</h4>
                  <p className="text-gray-700">{currentCompletion}</p>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={() => {
                      setLocalCompletion('');
                      setMessage('');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                  >
                    Nouvelle réponse
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentCompletion);
                      alert('Copié !');
                    }}
                    className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition"
                  >
                    Copier
                  </button>
                  <button
                    onClick={saveResponse}
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}