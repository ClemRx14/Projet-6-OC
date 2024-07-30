// Récupération dynamique des works  


async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

async function displayWorks(){
    const works = await fetchWorks();

    gallery.innerHTML = '';

    for(const work of works){
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figCaption = document.createElement("figcaption");
        const gallery = document.getElementById("gallery")

        img.src = work.imageUrl;
        img.alt = work.title;
        figCaption.innerText = work.title;

        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figCaption);
    }
}


// Ajout de la fonction displayWorks après le chargement de la page HTML
// Pour l'actualisation de tout les projets quand on ajoutera ou supprimera d'autres projets.

document.addEventListener('DOMContentLoaded', async () => {
    await displayWorks();
    await displayCategory();
})


// **** Ajout de la partie pour filtre les projets ******* //


const filtresProjets = document.getElementById("filtresProjets");
const divFiltre = document.createElement("div");
filtresProjets.insertAdjacentElement("afterend", divFiltre);

// Création des boutons de filtres 
// Ici le bouton tous qui n'est pas récupérer dynamiquement 

const boutonTous = document.createElement("button");
boutonTous.textContent = "Tous";
boutonTous.addEventListener("click", async function (){
    await displayWorks();
});
divFiltre.appendChild(boutonTous);


// récupération dynamique des catégories 

async function fetchCategory() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

// Création des boutons de catégories 

async function displayCategory (){
    const categories = await fetchCategory();
    
    for(const category of categories){
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.categoryId = category.id;


        divFiltre.appendChild(button);
    }
}