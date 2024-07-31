// Redirection quand on est sur l'index pour aller vers la page de login

const loginConnexion = document.getElementById('login');

loginConnexion.addEventListener("click", function() {
    window.location.href = 'login.html';
});


// Retour à la page index.html contenant les projets 


const retourIndex = document.getElementById('retourProjets');

retourIndex.addEventListener("click", function() {
    window.location.href = 'index.html';
});