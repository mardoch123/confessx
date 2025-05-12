@echo off
echo Préparation du déploiement...

echo Construction de l'application...
call npm run build

echo Exportation des fichiers statiques...
call npm run export

echo Création du fichier ZIP pour le déploiement...
cd out
powershell Compress-Archive -Path * -DestinationPath ../deploy.zip -Force
cd ..

echo Déploiement terminé ! Le fichier deploy.zip est prêt à être téléchargé sur votre hébergeur.
pause