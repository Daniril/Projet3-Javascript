// Selecteurs
const background = document.querySelector(".overlay");
const fenetreModale = document.querySelector(".modale");
const fenetreModaleAjout = document.querySelector(".modale-photo");
const modaleClose = document.querySelector(".modale-close");
const ajoutPhoto = document.querySelector(".add-photo");
const modaleAjoutClose = document.querySelector(".modale-photo-close");
const modaleAjoutReturn = document.querySelector(".modale-photo-return");
const iconePNG = document.querySelector(".icone-png");
const boutonAjoutPhoto = document.querySelector(".ajout-photo-bouton");
const requirements = document.querySelector(".requirements");
const photo = document.getElementById("photo-file");
const photoChargee = document.querySelector(".photo-loaded");
const photoTitre = document.querySelector("#titre-photo");

// Affichage de la modale
// Fonctions d'affichage d'un élement
function afficherElement(element){
    element.classList.add("active");
}

function cacherElement(element){
    element.classList.remove("active")
}

// Fermeture de la modale + background, modale d'ajout de travail et des modales au click sur le background
function cacherModale (e){
    const elementsGestionModale = [background, fenetreModale, fenetreModaleAjout];
    e.addEventListener("click", () => { elementsGestionModale.forEach((e)=>cacherElement(e)) })
}

const tableauElementsClose = [modaleClose, modaleAjoutClose, background];
tableauElementsClose.forEach((e) => cacherModale(e))

// Ouverture de la modale + background
document.querySelector(".modale-open").addEventListener("click", () => {
    const elements = [fenetreModale, background];
    elements.forEach((e) => afficherElement(e))
})

// Changement de modale vers le formulaire d'ajout de travail
ajoutPhoto.addEventListener("click", () => {
    afficherElement(fenetreModaleAjout);
    photo.value = "";
    photoTitre.value = "";
    photoChargee.innerHTML = "";
    cacherElement(iconePNG);
    cacherElement(boutonAjoutPhoto);
    cacherElement(requirements);
});


// Retour arriere depuis la modale d'ajout de travail vers la modale de miniatures
modaleAjoutReturn.addEventListener("click", () => {
    afficherElement(fenetreModale);
    cacherElement(fenetreModaleAjout)
});

// Comportements de click sur les élements HTML
// Permet à l'utilisateur d'ouvrir l'import d'image en cliquant sur le bouton ou sur l'icone png

// Fonction qui ajoute le comportement d'ouverture d'import de fichier sur l'element choisi
function ajoutFichier(e){
    e.addEventListener("click",() => {photo.click()})
}

ajoutFichier(iconePNG);
ajoutFichier(boutonAjoutPhoto);

photoChargee.addEventListener("click", () => {
    photoChargee.innerHTML = "";
    photo.click();
})

// Miniature image
    photo.addEventListener("input", function(){
    const photoElement = document.createElement("img");
    photoElement.src = URL.createObjectURL(photo.files[0]);
    const elements = [iconePNG, boutonAjoutPhoto, requirements]
    elements.forEach((e) => afficherElement(e));
    photoChargee.appendChild(photoElement);
    })

// Ajout d'un travail
const valider = document.querySelector("form");
valider.addEventListener("submit", async function(event){
    event.preventDefault();

    // Test de la taille du fichier (<4mb)
    if (photo.files[0].size >= 4 * 1024 * 1024) {
        window.alert("Le fichier est trop volumineux");
        return;
    }

    // Test si le nom renseigné ne contient que des espaces
    let reg = new RegExp("^[^ ]");
    let isValid = reg.test(photoTitre.value.trim());
    if (!isValid) {
        window.alert("Le titre ne contient que des espaces");
        return;
    }

    // Formulaire pour envoi à l'API
    const formulaire = new FormData();
    formulaire.append("title", photoTitre.value);
    formulaire.append("image", photo.files[0]);
    formulaire.append("category", Number(document.querySelector("#categorie").value));

    // Récupération du token depuis le localStorage
    const tokenStock = localStorage.getItem("token");

    // Envoi à l'API
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization": `Bearer ${tokenStock}`},
        body: formulaire
    });
            
    // Gestion de la réponse du serveur
    if (response.status == "201") {
        document.querySelector(".modale-gallery").innerHTML = "";
        document.querySelector(".gallery").innerHTML = "";
        fetchData();
        cacherElement(fenetreModaleAjout);
        afficherElement(fenetreModale);
    } else if (response.status == "401") {
        // Si token expiré et utilisateur plus authentifié, redirection vers le login pour mettre à jour le token
        document.location.href = "login.html";
    }
});