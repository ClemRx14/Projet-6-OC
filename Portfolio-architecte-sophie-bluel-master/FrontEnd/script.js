// **** Ajout de la partie pour filtrer les projets ******* //


const filtresProjets = document.getElementById("filtresProjets");
const divFiltre = document.createElement("div");

// Au début utilisation de AppenChild mais la div se retrouvait dans le h2 donc autre méthode
// Pour placer précisement la div en dessous du h2

filtresProjets.insertAdjacentElement("afterend", divFiltre);

// Création des boutons de filtres 

const boutonTous = document.createElement("button");
boutonTous.textContent = "Tous";


const boutonObjets = document.createElement("button");
boutonObjets.textContent = "Objets";


const boutonAppartement = document.createElement("button");
boutonAppartement.textContent = "Appartement";


const boutonHotel = document.createElement("button");
boutonHotel.textContent = "Hotels & restaurants";

divFiltre.appendChild(boutonTous);
divFiltre.appendChild(boutonObjets);
divFiltre.appendChild(boutonAppartement);
divFiltre.appendChild(boutonHotel);



