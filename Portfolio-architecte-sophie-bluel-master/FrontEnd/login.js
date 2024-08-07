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



// Envoie du formulaire de connexion à l'API

// Envoie du formulaire après le chargement complet du DOM

document.addEventListener('DOMContentLoaded', async () => {
    await envoieLogs();

})

async function fetchLogs() {
    const response = await fetch('http://localhost:5678/api/users/login');
    return await response.json();
}

function envoieLogs() {
    const formulaireLogs = document.querySelector(".inputsConnexion");
    const boutonConnecter = document.getElementById("boutonLogin");

    boutonConnecter.addEventListener("click", async function (event) {
        event.preventDefault();

        const logs = {
            email: formulaireLogs.querySelector("[name=email]").value,
            password: formulaireLogs.querySelector("[name=password]").value,
        };

        // *** Verification du format de l'email

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = formulaireLogs.querySelector("[name=email]").value;
        const errorEmail = document.getElementById("errorEmail");

        if (!emailRegex.test(email)){
            errorEmail.innerText = "Veuillez entrer une adresse email valide.";
            event.preventDefault();
            return;
        } else {
            errorEmail.innerText = "";
        }


     console.log("Valeurs envoyées : ", logs);

     const chargeUtile = JSON.stringify(logs);


     const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    
    });

    const isResponseOk = response.ok;
    const errorLogin = document.getElementById("errorLogin");
    if(isResponseOk){
        const reponseApi = await response.json();
        const token = reponseApi.token
        localStorage.setItem("token", token);
        window.location.href = 'index.html';
    }else{
        errorLogin.innerText= "Login ou mot de passe incorrect";
    }
    });
}



