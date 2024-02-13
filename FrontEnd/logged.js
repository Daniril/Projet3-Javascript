function genererFiches (data){
    for(let i = 0; i < data.length; i++){
    
    const figure = data[i]
    
    const fichesTravaux = document.querySelector(".gallery")
    const fichesElement = document.createElement("figure")
    
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = figure.title;
    
    const imgElement = document.createElement("img");
    imgElement.src = figure.imageUrl;
    
    fichesTravaux.appendChild(fichesElement);
    fichesElement.appendChild(imgElement);
    fichesElement.appendChild(nomElement);
}}

function genererCategories(data){
    for(let i=0; i< data.length; i++){
    const categories = data[i]
    const categorie = document.querySelector("#categorie")
    const optionsCategories = document.createElement("option")
    optionsCategories.innerText = categories.name;
    optionsCategories.value = categories.id;
    const idCategories = document.createElement("option");
    idCategories.innerHTML = categories.id;

    categorie.appendChild(optionsCategories)
}}

function genererFichesModale(data){
        for(let i = 0; i < data.length; i++){
            // Modale
            const figure = data[i]
            
            const fichesModale = document.querySelector(".modale-gallery")
            const fichesElement = document.createElement("figure")
    
            const imgElement = document.createElement("img");
            imgElement.src = figure.imageUrl;
            const trashDiv = document.createElement("div");

            const trashElement = document.createElement("img")
            trashDiv.classList.add("trash")
            trashElement.src = "assets/icons/trash-can-solidtrash.png"
    
            fichesModale.appendChild(fichesElement);
            fichesElement.appendChild(imgElement);
            fichesElement.appendChild(trashDiv)
            trashDiv.appendChild(trashElement)

            // Suppression d'un travail
            trashDiv.addEventListener("click",async function(event){
                event.preventDefault();
                const id = figure.id;
                const tokenStock = localStorage.getItem("token");
                const response = await fetch("http://localhost:5678/api/works/" + id,
            {  
            method :"DELETE",
            headers:{"Authorization":`Bearer ${tokenStock}`},
                });
            if(response.status =="401"){
                document.location.href="login.html"
            }

            });
            
}}

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    const travaux = await response.json();

    genererFiches(travaux)
    genererFichesModale(travaux)

}

fetchData()

async function fetchCategorie(){
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    genererCategories(categories)
}

fetchCategorie()




const boutonPhoto = document.querySelector(".ajout-photo-bouton")
boutonPhoto.addEventListener("click", function(){
    document.getElementById("photo-file").click()
})
const photoChargee = document.querySelector(".photo-loaded");
photoChargee.addEventListener("click", function(){
    document.querySelector(".photo-loaded").innerHTML = "";
    document.getElementById("photo-file").click();
})
const icone = document.querySelector(".icone-png");
icone.addEventListener("click", function(){
    document.getElementById("photo-file").click()
})

// Miniature image
    const photo = document.getElementById("photo-file");
    photo.addEventListener("input", function(){
    const photoElement = document.createElement("img");
    photoElement.src = URL.createObjectURL(document.querySelector("#photo-file").files[0]);
    document.querySelector(".icone-png").classList.add("active");
    document.querySelector(".ajout-photo-bouton").classList.add("active");
    document.querySelector(".requirements").classList.add("active");
    document.querySelector(".photo-loaded").appendChild(photoElement);
    })


// Ajout d'un travail

    const valider = document.querySelector("form");
     valider.addEventListener("submit", async function(event){
        event.preventDefault();
        event.stopPropagation();

        let imageFile = document.getElementById("photo-file");
        console.log(imageFile.files[0].size)
        if(imageFile.files[0].size <= 4*1024*1024 ){
        let reg = new RegExp("^[^ ]");
        let isValid = reg.test(document.querySelector("#titre-photo").value.trim())
        console.log(isValid)
        if(isValid){
       const formulaire = new FormData()
            formulaire.append("title",event.target.querySelector("#titre-photo").value);
            formulaire.append("image" , event.target.querySelector("#photo-file").files[0]);
            formulaire.append("category" , Number(event.target.querySelector("#categorie").value));

        const chargeutile = JSON.stringify(formulaire);
        const tokenStock = localStorage.getItem("token");

        const response = await fetch("http://localhost:5678/api/works",
        {   method : "POST",
            headers:{"Authorization":`Bearer ${tokenStock}`},
            body: formulaire
        })
        if (response.status == "401"){
            document.location.href ="login.html"
        }
        } else { window.alert("Le titre ne contient que des espaces")}
            } else {
            window.alert("Le fichier est trop volumineux")
            }
        })

const modale = document.querySelector(".modale-open")
const overlay = document.querySelector(".overlay")
const fenetreModale = document.querySelector(".modale")
const modaleClose = document.querySelector(".modale-close")
const ajoutPhoto = document.querySelector(".add-photo")
const fenetreModaleAjout = document.querySelector(".modale-photo")
const modaleClosePhoto = document.querySelector(".modale-photo-close")
const modaleReturn = document.querySelector(".modale-photo-return")

function afficherModale (){
    fenetreModale.classList.add("active");
    overlay.classList.add("active");
}

modale.addEventListener("click", afficherModale);

function cacherModale (){
    fenetreModale.classList.remove("active");
    overlay.classList.remove("active");
    fenetreModaleAjout.classList.remove("active");
}

modaleClose.addEventListener("click", cacherModale);
modaleClosePhoto.addEventListener("click", cacherModale);
overlay.addEventListener("click", cacherModale);


function afficherModalePhoto (){
    fenetreModale.classList.remove("active");
    fenetreModaleAjout.classList.add("active");
    document.querySelector("#titre-photo").value = "";
    document.getElementById("photo-file").value = "";
    document.querySelector(".photo-loaded").innerHTML = "";
    document.querySelector(".icone-png").classList.remove("active");
    document.querySelector(".ajout-photo-bouton").classList.remove("active");
    document.querySelector(".requirements").classList.remove("active");
    
}

ajoutPhoto.addEventListener("click", afficherModalePhoto);

function retourModale (){
    fenetreModaleAjout.classList.remove("active");
    fenetreModale.classList.add("active");
}

modaleReturn.addEventListener("click", retourModale);