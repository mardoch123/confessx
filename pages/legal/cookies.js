import Head from 'next/head';
import Link from 'next/link';

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Politique de cookies | ConfessX</title>
        <meta name="description" content="Politique de cookies de ConfessX" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Politique de cookies</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p>Un cookie est un petit fichier texte qui est stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Les cookies sont largement utilisés par les propriétaires de sites web pour faire fonctionner leurs sites web, ou pour fonctionner plus efficacement, ainsi que pour fournir des informations de rapport.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. Comment nous utilisons les cookies</h2>
            <p>ConfessX utilise des cookies pour diverses raisons détaillées ci-dessous. Malheureusement, dans la plupart des cas, il n'existe pas d'options standard de l'industrie pour désactiver les cookies sans désactiver complètement les fonctionnalités et caractéristiques qu'ils ajoutent à ce site. Il est recommandé de laisser tous les cookies si vous n'êtes pas sûr d'en avoir besoin ou non dans le cas où ils sont utilisés pour fournir un service que vous utilisez.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Les cookies que nous utilisons</h2>
            <p>Nous utilisons différents types de cookies sur notre site :</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Cookies essentiels</h3>
            <p>Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement établis en réponse à des actions que vous effectuez et qui constituent une demande de services, telles que la définition de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Cookies de performance</h3>
            <p>Ces cookies nous permettent de compter les visites et les sources de trafic afin que nous puissions mesurer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le site.</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Cookies de fonctionnalité</h3>
            <p>Ces cookies permettent au site web de fournir une fonctionnalité et une personnalisation améliorées. Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages.</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Cookies de ciblage</h3>
            <p>Ces cookies peuvent être définis par nos partenaires publicitaires via notre site. Ils peuvent être utilisés par ces entreprises pour établir un profil de vos intérêts et vous montrer des publicités pertinentes sur d'autres sites.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. Comment gérer les cookies</h2>
            <p>Vous pouvez définir vos préférences en matière de cookies en modifiant les options de votre navigateur. Veuillez noter que le blocage de certains types de cookies peut avoir un impact sur votre expérience sur notre site web et les services que nous sommes en mesure d'offrir.</p>
            <p>La plupart des navigateurs vous permettent de refuser les cookies. Vous pouvez bloquer les cookies en activant le paramètre de votre navigateur qui vous permet de refuser tous les cookies ou certains d'entre eux. Vous pouvez également supprimer les cookies déjà stockés sur votre ordinateur.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. Cookies tiers</h2>
            <p>Dans certains cas particuliers, nous utilisons également des cookies fournis par des tiers de confiance. La section suivante détaille les cookies tiers que vous pourriez rencontrer via ce site.</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Ce site utilise Google Analytics, l'un des outils d'analyse les plus répandus et les plus fiables sur le web, pour nous aider à comprendre comment vous utilisez le site et comment nous pouvons améliorer votre expérience.</li>
              <li>Nous utilisons également des boutons de médias sociaux et/ou des plugins sur ce site qui vous permettent de vous connecter avec votre réseau social de différentes façons. Pour que ces fonctionnent, les sites de médias sociaux suivants, incluant Facebook et Google, définiront des cookies à travers notre site.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. Plus d'informations</h2>
            <p>Nous espérons que cela a clarifié les choses pour vous et, comme mentionné précédemment, s'il y a quelque chose que vous n'êtes pas sûr d'avoir besoin ou non, il est généralement plus sûr de laisser les cookies activés au cas où ils interagiraient avec l'une des fonctionnalités que vous utilisez sur notre site.</p>
            <p>Si vous souhaitez plus d'informations, vous pouvez nous contacter via notre page de contact.</p>
            
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