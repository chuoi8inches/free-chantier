# Free Chantier - Application mobile pour la gestion et le suivi des chantiers
## Dévéloppé par Huu Anh NGUYEN avec React-native et Appwrite


Il s'agit d'un [Expo](https://expo.dev) projet crée avec [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Dans le terminal, vous avez l'option d'ouvrir l'application sur:
- [Expo Go](https://expo.dev/go) recommandé, car c'est la plus simple et le developement est fait sur cette platform.
Il suffit de scanner le QR code avec votre téléphone.

## Stack technique
Appwrite est choisie pour la gestion des utilisateurs et des données.
React Native est utilisé pour le developpement de l'application mobile.

## Modèle de données
- User (Utilisateur) : soit chef ou responsable de chantier
- Site (Chantier) projet de construction
- Team (Equipe) : groupe d'employés
- Resource (Ressource) : matériel, équipement, véhicule

## Fonctionnalités implémentées
- [x] Authentification
- [ ] Gestion des chantiers
- [ ] Gestion des équipes
- [ ] Gestion des ressources

Jusqu'au 6/12/2024, le projet est toujours en cours de développement. Il y a l'authentification qui est complète et fonctionnel,
mais sur l'autre point, il reste encore beaucoup de travail à faire. La difficulté principale rencontrée est l'accès aux données. 
Par exemple, pour afficher les chantiers affectés à un utilisateur, il faut faire une requête pour récupérer les chantiers,
malgré avoir configuré les permissions sur Appwrite, j'ai toujours l'erreur que l'utilisateur n'est pas autorisé à accéder aux données.
Cela a bloqué le développement de l'application. 



