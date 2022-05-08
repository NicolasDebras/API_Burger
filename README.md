# API_Burger

### Utilisateur 

La création de compte marche. 
On peut ce loger aussi 
On peut voir no session

On ne peut pas supprimmer l'utilisateur

Il manque le fait de pouvoir ce voir affecter un restaurant.


### Role 

Le role de préparateur. Voir ce qu'on peut faire avec. 
Idée il doit marque que ça a été fait et on peux supprimer les ingredients
Il peut aussi voir l'état de la commande avec un get

Le mode bigboss qui peut affecter des utilisateurs (facile a faire)

Le  mode  BigBoss  permet  de  gerer  l'ensemble  des  restaurants  de  la  chaine,  
d'en  ajouter  et  d'en  supprimer.  
Le  BigBoss  peut  aussi  créer  des  comptes  Admin  et  de  les  affecter  aux  restaurant.
Un  utilisateur  admin  peut  acc éder  qu'a  un  seul  restaurant.  L’utilisateur  bigboss  doit  obligatoirement  être  connecté à l’aide d’un token de session


### Restaurant 


On peut créer un restaurant, le supprimer,  le voir. Faire un crud total.
Manque juste l'affectation de ces travailleurs


### Ingrédients

On peut faire un CRUD sur l'ingrédients donc je pense que ça va 
On dit de qu'elle restaut il fait partie et ça quantité elle peut être update. Donc tout est bon
Manque le fait de voir si le restaurant existe 

### Product 

On faire un crud sur un produit ça me vas.
On peut lui mettre une promotion aussi.
Manque le fait de voir si le restaurant existe et les ingredients sont bien du restaurants

### Menu 

On peut aussi faire un crud et lui mettre une promotion
Manque le fait de voir si le restaurant existe et les ingredients sont bien du restaurants et que le restaurants existe
### Promotion 

On peut faire un crud ça me vas 
Par rapport a un restaurant ou pas 

### Commande
On peut aussi faire le crud 
Il manque le fait de vérifier que les objectID existe bien lors de la création de la commande

### Ce qui nous manque 

Les mode big Boss (facile sauf le faite que l'admin doit être sur un seul restaurant)

Je propose de voir les commandes d'un restaurant
De créer les utilisateurs admin et de les affecter 
Ajouter des restaurant et d'en supprimer. 

Le mode admin (facile)
Vérifier qu'il a qu'un seul utilisateur 
Créer les autre utilisateur employé autre que l'admin
Manque la mise en avant de ce qu'il veut dans son restaurant (manque un get)

Le mode préparateur (facile)
Il lui manque le fait de préparer la commande donc juste les voirs. 
Donc juste lui mettre la fonction que j'ai fait et changer l'état de la commande.

Le mode custommer (moyen chat est le plus dure)
Il lui manque le chat et le fait de dire que ça commande a bien été reçu 
et que le livreur n'a plus de commande

Le mode livreur (dure)
Sa position pour lui affecter une commande si il est libre 
Le chat avec le client de sa commande
Le get pour savoir ou il est en temps réel.


Il nous manque a faire tout les rôles car je suis pas sur d'être d'accord avec celui de Louis
Et peut être avec vous 

### Verification
Manque la vérification lors de la construction si il prend bien les choses du bon restaurants


