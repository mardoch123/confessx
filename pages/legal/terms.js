import Head from 'next/head';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Conditions d'utilisation | ConfessX</title>
        <meta name="description" content="Conditions d'utilisation de ConfessX" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Conditions d'utilisation</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptation des conditions</h2>
            <p>En accédant et en utilisant ConfessX, vous acceptez d'être lié par les présentes conditions d'utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables. Si vous n'acceptez pas l'une de ces conditions, vous êtes interdit d'utiliser ou d'accéder à ce site.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. Utilisation de la licence</h2>
            <p>La permission est accordée de télécharger temporairement une copie des documents sur le site ConfessX pour un usage personnel, non commercial et transitoire uniquement. Il s'agit de l'octroi d'une licence, et non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modifier ou copier les documents</li>
              <li>Utiliser les documents à des fins commerciales ou pour toute présentation publique</li>
              <li>Tenter de décompiler ou de désosser tout logiciel contenu sur le site ConfessX</li>
              <li>Supprimer tout droit d'auteur ou autres notations de propriété des documents</li>
              <li>Transférer les documents à une autre personne ou "miroir" les documents sur tout autre serveur</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Contenu généré par l'utilisateur</h2>
            <p>En soumettant du contenu à ConfessX, vous accordez à ConfessX un droit mondial, non exclusif, libre de redevance, sous-licenciable et transférable d'utiliser, reproduire, distribuer, préparer des œuvres dérivées, afficher et exécuter ce contenu en relation avec les services fournis par ConfessX et les activités de ConfessX.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitation de responsabilité</h2>
            <p>Les documents sur ConfessX sont fournis "tels quels". ConfessX ne donne aucune garantie, expresse ou implicite, et décline et nie par la présente toutes les autres garanties, y compris, sans limitation, les garanties implicites ou les conditions de qualité marchande, d'adéquation à un usage particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. Modifications des conditions</h2>
            <p>ConfessX peut réviser ces conditions d'utilisation de son site Web à tout moment sans préavis. En utilisant ce site Web, vous acceptez d'être lié par la version actuelle de ces conditions d'utilisation.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. Loi applicable</h2>
            <p>Toute réclamation relative au site ConfessX sera régie par les lois de la France sans égard à ses dispositions en matière de conflit de lois.</p>
            
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