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


// Ajout des fonctions Display après le chargement de la page HTML
// Pour l'actualisation de tout les projets quand on ajoutera ou supprimera d'autres projets.

document.addEventListener('DOMContentLoaded', async () => {
    await displayWorks();
    await displayCategory();
})


// **** Ajout de la partie pour filtre les projets ******* //


const filtresProjets = document.getElementById("filtresProjets");
const divFiltre = document.createElement("div");
filtresProjets.insertAdjacentElement("afterend", divFiltre);
divFiltre.className = 'divdesfiltres';

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

        button.addEventListener("click", async function(){
            await filtrerCategory(category.id);
        })

        divFiltre.appendChild(button);
    }
}


// Filtrage des Projets pour affichage en catégorie

async function filtrerCategory(categoryId){
    const works = await fetchWorks();
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = '';

    for (const work of works){
        if (work.categoryId === categoryId){
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figCaption = document.createElement("figcaption");

            img.src = work.imageUrl;
            img.alt = work.title;
            figCaption.innerText = work.title;

            gallery.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(figCaption);
        }
    }
}

// *** Verification de la présence du Token dans le LocalStorage de l'utilisateur
// et modification de la page index selon la présence du token ou non


document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem('token');

    if (token){
        divFiltre.remove();
        const logout = document.getElementById("login");
        logout.innerHTML = 'logout';
        logout.addEventListener("click", () => {
            localStorage.removeItem('token');
            location.reload();
        });
    }
    else {
        const btnModifier = document.querySelector(".boutonLogoAdd");
        btnModifier.style.display = 'none';
    }

    console.log(token);
   
});





