    
// http://localhost:5678/api/users/login

const formulaireConnexion = document.querySelector("form");
formulaireConnexion.addEventListener("submit", async function(event){
    event.preventDefault();
    const identifiants = {
        email : event.target.querySelector("#e-mail").value,
        password : event.target.querySelector("#password").value
    };
    const chargeUtile = JSON.stringify(identifiants);

        try{
        
    const response = await fetch("http://localhost:5678/api/users/login",
    {   method :"POST",
        headers:{"Content-Type":"application/json"}, 
        body : chargeUtile
    });

    const bearer = await response.json()
    const token = bearer.token;

    localStorage.removeItem("token")
    localStorage.setItem("token", `${token}`);

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
        document.location.href="logged.html"
    }} catch {
            const erreur = document.querySelector("#connexion");
            erreur.innerHTML = "";
            const erreurElement = document.createElement("p");
            erreurElement.innerHTML = "Connexion au serveur impossible<br>Essayez de recharger la page";
            erreur.appendChild(erreurElement);
        }


})
    


        
