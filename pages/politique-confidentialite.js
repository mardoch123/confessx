import Head from 'next/head';
import Link from 'next/link';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Politique de confidentialité | ConfessX</title>
        <meta name="description" content="Politique de confidentialité de ConfessX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
          
          <div className="prose max-w-none">
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p>
              Chez ConfessX, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Informations que nous collectons</h2>
            <p>
              Nous collectons les types d'informations suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informations d'inscription : nom, adresse e-mail, mot de passe</li>
              <li>Contenu généré : les messages que vous soumettez et les réponses générées</li>
              <li>Données d'utilisation : comment vous interagissez avec notre service</li>
              <li>Informations techniques : adresse IP, type de navigateur, appareil utilisé</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Comment nous utilisons vos informations</h2>
            <p>
              Nous utilisons vos informations pour :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fournir, maintenir et améliorer notre service</li>
              <li>Personnaliser votre expérience</li>
              <li>Communiquer avec vous</li>
              <li>Assurer la sécurité de notre service</li>
              <li>Se conformer aux obligations légales</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Partage des informations</h2>
            <p>
              Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations dans les circonstances suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Avec votre consentement</li>
              <li>Avec nos fournisseurs de services</li>
              <li>Pour se conformer à la loi</li>
              <li>Pour protéger nos droits et ceux des autres</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre tout accès, altération, divulgation ou destruction non autorisés.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Vos droits</h2>
            <p>
              Selon votre lieu de résidence, vous pouvez avoir certains droits concernant vos données personnelles, notamment :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accéder à vos données</li>
              <li>Rectifier vos données</li>
              <li>Supprimer vos données</li>
              <li>Restreindre ou s'opposer au traitement</li>
              <li>Portabilité des données</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : privacy@confessx.com
            </p>
          </div>
          
          <div className="mt-8">
            <Link href="/" className="text-primary hover:underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}