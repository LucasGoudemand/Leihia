Le formulaire est contenu dans le fichier index.html.

Le JavaScript est contenu dans le fichier FunctionPool.js.

Le CSS est contenu dans le fichier styles.css.

Aucune dépendance n'a été téléchargé le site est donc utilisable en l'état.

POUR LANCER LE SITE : Ouvrez-le avec Visual Studio Code (VSCODE) et LiveServer, ou dans le dossier du site, faites un clic droit et ouvrez-le avec votre navigateur.

Prérequis :

Assurez-vous d'être connecté à Internet pour communiquer avec l'API.
Notez que l'API de cryptage de JavaScript ne fonctionne qu'en local ou en utilisant HTTPS.

Sécurité :

Quasiment aucune mesure de sécurité n'a été déployée pour ce projet. Une légère couche de sécurité peut être appliquée en amont au niveau du front-end (client) (Regex.test),
 mais 99 % de la sécurité sera gérée côté backend (serveur). Il est donc possible d'injecter des données via ce formulaire ou d'envoyer des données non attendues dans les champs.
Un prévent Default est actuellement mis en place lors du submit du formulaire, les données du formulaire reste en "place" jusqu'au rafraichissement de la page.
Lucas Goudemand : goudemand.lucas@gmail.com