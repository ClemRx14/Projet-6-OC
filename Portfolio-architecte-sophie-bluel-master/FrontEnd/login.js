// Redirection quand on est sur l'index pour aller vers la page de login

const loginConnexion = document.getElementById('login');

loginConnexion.addEventListener("click", function() {
    window.location.href = 'login.html';
});