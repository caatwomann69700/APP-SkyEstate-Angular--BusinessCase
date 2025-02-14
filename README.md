# ColivioFrontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

### Creer un nouveau projet avec la commande suivante : 
```
ng new SkyEstate 
````
### Installation de bootstrap au seins de l'app avec configuration : 
````
npm install bootstrap
````
+ L'ajout de Bootstrap dans angular.json dans la section "styles" comme ceci : 
````js 
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
````
+  L'mport de Bootstrap dans le fichier parent de l'app styles.css
````js 
@import "~bootstrap/dist/css/bootstrap.min.css";
````
#### Attention ! 
étant donné que l'on a modifié un fichier de configuration Angular, pour qu'il soit pris en compte il est nécessaire de couper et de relancer le serveur !

### Lancement du projet avec la commande suivante : 
``` POWERSHELL
ng serve
```
````POWERSHELL
http://localhost:4200/
````
### Creation du dossier environements qui contient les deux fichiers suivants : 
+ environement.ts : 
+ environement.developement.ts : 

ce sont des fichiers qui nous permet d'eviter de coder des url en dur dans notre typescript 

### Creation de la premiere page "Home" avec la commande suivante : 
````
ng generate component pages/home
```` 
### dans le fichier parent de l'app "HTML" et "TS" rajouter le router pour que la page principale soit affichée via le routage 
+ "HTML" 
````HTML
<router-outlet></router-outlet>
````
+ "TS"  
````JS 
imports: [RouterOutlet],
````
### Mettre la redirection par defaut lorsque on bascule dans l'app on sera rediriger dans la page home qui sera la page pricipal donc on doit mettre ceci dans le fichier app.routes.ts 
````js
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
````

### Creation du premier composant "header" qui sera reutilisable dans d'autre page que "home" avec la commande suivante : 
````JS
ng generate component components/header

````
### La creation du composant "navbar" que je vais appeler dans le fichier parent de l'app car je voudrais avoir la navbar presente dans toute l'app donc je l'appelle dans le fichier de base et non pas le composant header c'est a dire la navbar sera presente dans toute l'app , pour la creation ca sera avec la commande suivante : 
````
ng generate component components/navbar
````


### Appeler le composant navbar dans le fichier parent de base comme ceci sans oublier de l'importer dans le fichier ts de base : 
+ HTML  : 
````html 
<app-navbar></app-navbar>
````
+ TS   : 
````JS 
imports: [RouterOutlet, NavbarComponent],
````
## Connexion et Inscription 
## Connexion
### Créer le modèle "interface" pour l'entity "user" 
````bash
mkdir src/app/models
touch src/app/models/user.model.ts
````
#### Important !
chaque entity doit avoir une interface 
### Creation des services
+ Créer le service AuthService :

````bash
ng generate service services/auth
````
+ Créer le service UserService :

````bash
ng generate service services/user
````
### l'Ajout d'un interceptor pour le token
+ Créer l’interceptor AuthInterceptor :
````bash
ng generate interceptor interceptors/auth
````
###  l'Ajout d'un guard
+ Créer le guard AuthGuard pour protéger les routes privées :
````bash
ng generate guard guards/auth
````
### Créer les pages login et register
+ Créer la page login :
````bash
ng generate component pages/login
````
+ Créer la page register ::
````bash
ng generate component pages/register
````
+ l'ajout des routes dans routes.ts :
````JS
ng generate component pages/register
````
### Creation des composants UserDashboard et AdminDashboard : 
````bash 
ng generate component pages/user-dashboard
ng generate component pages/admin-dashboard
````
## Inscription 
+ Creation du formulaire d'inscription (RegisterComponent)

````bash
ng g c pages/register
````
### Creation de tout les services dans le dossier "services" pour chaque entity avec la commande suivante : 
````bash 
ng g s services/nom-du-service
````
#### pour les entity suivantes : 
+ category
+ image 
+ user
+ 

### Creation de tout les interfaces dans le dossier "models" pour chaque entity avec la commande suivante : 
````bash 
ng g s models/nom-d'interface
````
#### pour les entity suivantes : 
+ category
+ image 
+ user
+ 
## Page des annonces 
### Création du composant category-section qui va me servir d'afficher les categories, avec la commande suivante : 
````bash 
ng g c components/category-section --standalone 
````

### Création de la page annonces-page pour afficher les annonces dans la section annonces qui est un li affihcer dans la navbar, avec la commande suivante : 
````bash 
ng g c pages/annonces-page 
````
### Création du composant annonces-lists pour afficher les annonces dans la page annonces-page, avec la commande suivante : 
````bash 
ng g c components/annonces-lists --standalone 
````

## Barre de reservation 
### Creation de composant barre de reservation 
````bash 
ng generate c components/reservation
````
### Installation du material datepicker avec la commande suivante : 
+ pour choisir un calendrier  : 
````bash
ng add @angular/material
````
+ importer les modules necessaires dans app.module.ts 
````bash 
 MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
````
## Admin 

### generer les composants suivants : 
````
ng generate component pages/admin/admin-annonces
ng generate component pages/admin/admin-amenities
ng generate component pages/admin/admin-categories
ng generate component pages/admin/admin-reservations
ng generate component pages/admin/admin-utilisateurs
````

## Messagerie instantannée 
creer une interface Message 
ensuite creer un service message 
ng generate service services/message
ensuite creer une page message  
ng generate component pages/message/message
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
