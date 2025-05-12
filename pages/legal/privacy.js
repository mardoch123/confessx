import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Politique de confidentialité | ConfessX</title>
        <meta name="description" content="Politique de confidentialité de ConfessX" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p>Chez ConfessX, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informera sur la façon dont nous prenons soin de vos données personnelles lorsque vous visitez notre site web et vous informera de vos droits en matière de confidentialité et de la façon dont la loi vous protège.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. Les données que nous collectons</h2>
            <p>Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant, notamment :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Données d'identité : prénom, nom, nom d'utilisateur ou identifiant similaire</li>
              <li>Données de contact : adresse e-mail et numéros de téléphone</li>
              <li>Données techniques : adresse IP, données de connexion, type et version du navigateur, fuseau horaire et emplacement, types et versions de plug-ins du navigateur, système d'exploitation et plate-forme</li>
              <li>Données d'utilisation : informations sur la façon dont vous utilisez notre site web, nos produits et services</li>
              <li>Données de profil : votre nom d'utilisateur et mot de passe, vos préférences, vos commentaires et vos réponses aux sondages</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Comment nous utilisons vos données</h2>
            <p>Nous utiliserons vos données personnelles uniquement lorsque la loi nous y autorise. Le plus souvent, nous utiliserons vos données personnelles dans les circonstances suivantes :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Lorsque nous devons exécuter le contrat que nous sommes sur le point de conclure ou que nous avons conclu avec vous</li>
              <li>Lorsque cela est nécessaire pour nos intérêts légitimes (ou ceux d'un tiers) et que vos intérêts et droits fondamentaux ne l'emportent pas sur ces intérêts</li>
              <li>Lorsque nous devons nous conformer à une obligation légale ou réglementaire</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. Partage de données</h2>
            <p>Nous pouvons partager vos données personnelles avec les parties suivantes :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fournisseurs de services qui fournissent des services informatiques et d'administration de système</li>
              <li>Conseillers professionnels, y compris avocats, banquiers, auditeurs et assureurs</li>
              <li>Autorités fiscales, autorités de régulation et autres autorités</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. Sécurité des données</h2>
            <p>Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles ne soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou divulguées.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. Vos droits légaux</h2>
            <p>Selon les lois sur la protection des données, vous avez des droits concernant vos données personnelles, notamment :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Demander l'accès à vos données personnelles</li>
              <li>Demander la correction de vos données personnelles</li>
              <li>Demander l'effacement de vos données personnelles</li>
              <li>S'opposer au traitement de vos données personnelles</li>
              <li>Demander la limitation du traitement de vos données personnelles</li>
              <li>Demander le transfert de vos données personnelles</li>
              <li>Droit de retirer votre consentement</li>
            </ul>
            
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