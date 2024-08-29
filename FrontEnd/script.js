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
        const gallery = document.getElementById("gallery");

        figure.dataset.workId = work.id;
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

        // Ajout de la barre edition quand utilisateur connecté

        const barreEdition = document.querySelector(".barreEdition");
        barreEdition.style.display = 'flex';
    }
    else {
        const btnModifier = document.querySelector(".boutonLogoAdd");
        btnModifier.style.display = 'none';
    }

    console.log(token);
   
});


// ***** Gestion de la modale *****//

const btnModifier = document.querySelector(".boutonLogoAdd");
const displayModale = document.getElementById("modale");
btnModifier.addEventListener("click", async () => {
    displayModale.style.display = 'flex';
    await displayMinia();
    await displayCategoryBis();
});

const fermerModale = document.querySelector(".fermetureModale");
fermerModale.addEventListener("click", () => {
    displayModale.style.display = 'none';
});

// Fermer la modale si on clique sur l'arrière plan de la modale **

window.onclick = function(event) {
    if (event.target === displayModale) {
      displayModale.style.display = "none";
    }
  }

// Affichage des projets en miniatures + possibilité de supprimer un projet

async function displayMinia() {
    const works = await fetchWorks();
    let miniaProjets = document.querySelector(".projetsMinia");
    miniaProjets.innerHTML = '';

    for (const work of works){
        const img = document.createElement("img");
        img.src = work.imageUrl;
        
        const containerImage = document.createElement("div");
        containerImage.className = ('containerImage');
        containerImage.dataset.workId = work.id;

        const divIconeSupp = document.createElement("div");
        divIconeSupp.className = ('divIconeSuppression');
    
        const backgroundDelete = document.createElement("span");
        backgroundDelete.className = ('backgroundBlack');
    
        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa-solid", "fa-trash-can", "iconDelete");

        containerImage.appendChild(img);
        containerImage.appendChild(divIconeSupp);
        divIconeSupp.appendChild(backgroundDelete);
        divIconeSupp.appendChild(iconDelete);
        miniaProjets.appendChild(containerImage);

        // Appel de la fonction Suppression des projets 

        iconDelete.addEventListener("click", async () => {
            await supprimerProjet(work.id);
        });
    }
}

async function supprimerProjet(workId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE', 
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const isResponseOk = response.ok;
    if (isResponseOk){
        await displayWorks();
        await displayMinia();
    }else{
        console.log('Erreur lors de la suppression du projet.');
    }
}

// Modale partie 2 ajout photo 

// Modification et passage à la deuxieme modale 

const ajouterPhoto = document.querySelector(".btnAdd");
const premiereModale = document.querySelector(".premiereModale");
const deuxiemeModale = document.querySelector(".deuxiemeModale");

ajouterPhoto.addEventListener("click", () => {
    premiereModale.style.display = "none";
    deuxiemeModale.style.display = "flex";
});

const retour1Modale = document.getElementById("retourPremiereModale");

retour1Modale.addEventListener("click", () => {
    deuxiemeModale.style.display = "none";
    premiereModale.style.display = "block";
});


// Preview des images pour les nouveaux projets à ajouter **

function previewImage () {
    const imgDownload = document.getElementById("inputImage");
    const imageChoisie = imgDownload.files[0];
    const imagePreview = document.querySelector(".backgroundLogoAjout");

    if(imageChoisie.type.match("image.*")) {
        const reader = new FileReader();

        reader.addEventListener("load", function (event) {
            const imageUrl = event.target.result;
            const image = new Image();
            image.width = 129;
            image.height = 193;
            image.src = imageUrl;
            image.addEventListener("load", function() {
                imagePreview.innerHTML = '';
                imagePreview.appendChild(image);
              });

        });
        reader.readAsDataURL(imageChoisie);
    }
}

// Afficher les catégories dans la balise select

async function displayCategoryBis () {
    const categories = await fetchCategory();
    const select = document.getElementById("categorieNewProjet");

    for(const category of categories){
        const choix = document.createElement("option");
        choix.value = category.id;
        choix.textContent = category.name;
        select.appendChild(choix);
    }
}





