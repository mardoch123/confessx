import Head from 'next/head';
import Link from 'next/link';

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Mentions légales | ConfessX</title>
        <meta name="description" content="Mentions légales de ConfessX" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Mentions légales</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Éditeur du site</h2>
            <p>Le site ConfessX est édité par :</p>
            <p>Raison sociale : [Votre Société]</p>
            <p>Forme juridique : [Forme juridique]</p>
            <p>Capital social : [Montant] euros</p>
            <p>Siège social : [Adresse complète]</p>
            <p>SIRET : [Numéro SIRET]</p>
            <p>Numéro de TVA intracommunautaire : [Numéro TVA]</p>
            <p>Directeur de la publication : [Nom du directeur]</p>
            <p>Email de contact : [Email]</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. Hébergeur</h2>
            <p>Le site ConfessX est hébergé par :</p>
            <p>Raison sociale : [Nom de l'hébergeur]</p>
            <p>Adresse : [Adresse de l'hébergeur]</p>
            <p>Téléphone : [Téléphone de l'hébergeur]</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Propriété intellectuelle</h2>
            <p>L'ensemble du contenu du site ConfessX (structure, textes, logos, images, vidéos, sons, etc.) est la propriété exclusive de [Votre Société] ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de [Votre Société].</p>
            <p>Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. Liens hypertextes</h2>
            <p>Le site ConfessX peut contenir des liens hypertextes vers d'autres sites internet. [Votre Société] n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et n'assumera en conséquence aucune responsabilité de ce fait.</p>
            <p>La création de liens hypertextes vers le site ConfessX est soumise à l'accord préalable du Directeur de la publication.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. Données personnelles</h2>
            <p>Les informations concernant la collecte et le traitement des données personnelles sont détaillées dans notre <Link href="/legal/privacy" className="text-primary hover:underline">Politique de confidentialité</Link>.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. Droit applicable et juridiction compétente</h2>
            <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
            
            <div className="mt-8">
              <Link href="/" className="text-primary hover:underline">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}