import Head from 'next/head';
import Link from 'next/link';

export default function ConditionsUtilisation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Conditions d'utilisation | ConfessX</title>
        <meta name="description" content="Conditions d'utilisation de ConfessX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
          
          <div className="prose max-w-none">
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptation des conditions</h2>
            <p>
              En accédant et en utilisant ConfessX, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser ce service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Description du service</h2>
            <p>
              ConfessX est une plateforme qui permet aux utilisateurs d'exprimer leurs émotions et de recevoir des réponses générées par intelligence artificielle. Le service est fourni "tel quel" sans garantie d'aucune sorte.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Comptes utilisateurs</h2>
            <p>
              Pour utiliser certaines fonctionnalités du service, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de votre compte et mot de passe et de restreindre l'accès à votre ordinateur. Vous acceptez d'assumer la responsabilité de toutes les activités qui se produisent sous votre compte.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Contenu utilisateur</h2>
            <p>
              En soumettant du contenu à ConfessX, vous accordez à ConfessX une licence mondiale, non exclusive, libre de redevances pour utiliser, reproduire, adapter, publier, traduire et distribuer votre contenu dans tous les médias. Vous déclarez et garantissez que vous possédez ou contrôlez tous les droits sur le contenu que vous publiez.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Limitations de responsabilité</h2>
            <p>
              ConfessX ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser le service. Le service n'est pas destiné à remplacer un avis médical ou psychologique professionnel.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Modifications des conditions</h2>
            <p>
              ConfessX se réserve le droit de modifier ces conditions à tout moment. Nous vous informerons de tout changement en publiant les nouvelles conditions sur cette page. Votre utilisation continue du service après la publication des modifications constitue votre acceptation de ces modifications.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Loi applicable</h2>
            <p>
              Ces conditions sont régies et interprétées conformément aux lois françaises, sans égard aux principes de conflits de lois.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : contact@confessx.com
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