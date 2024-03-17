// http://localhost:5678/api/users/login

// Gestion de la connexion
const formulaireConnexion = document.querySelector("form");
formulaireConnexion.addEventListener("submit", async function(event){
    event.preventDefault();
    const identifiants = {
        email : document.querySelector("#e-mail").value,
        password : document.querySelector("#password").value
    };
    const chargeUtile = JSON.stringify(identifiants);

    // Envoi du formulaire de connexion à l'API
    try{
        const response = await fetch("http://localhost:5678/api/users/login",
        {   method :"POST",
            headers:{"Content-Type":"application/json"}, 
            body : chargeUtile
        });
        // récupération du token renvoyé par l'API
        const bearer = await response.json()
        const token = bearer.token;

        // Stockage du token dans le local storage
        localStorage.removeItem("token");
        localStorage.setItem("token", `${token}`);

        // gestion de la réponse de l'API (erreur de mdp, utilisateur non enregistré, redirection si utilisateur reconnu)
        if (response.status == "401"){
            const erreur = document.querySelector("form");
            const erreurElement = document.createElement("p");
            erreurElement.innerHTML = "Erreur dans le mot de passe";
            erreur.appendChild(erreurElement);
        } else if (response.status =="404"){
            const erreur = document.querySelector("form");
            const erreurElement = document.createElement("p");
            erreurElement.innerHTML = "Utilisateur non reconnu";
            erreur.appendChild(erreurElement);
        } else {
            document.location.href="index.html"
        }
    
    // Gestion de l'erreur en cas de non réponse du serveur
    } catch {
        const erreur = document.querySelector("#connexion");
        erreur.innerHTML = "";
        const erreurElement = document.createElement("p");
        erreurElement.innerHTML = "Connexion au serveur impossible<br>Essayez de recharger la page";
        erreur.appendChild(erreurElement);
    }
})