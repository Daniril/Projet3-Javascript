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

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    const travaux = await response.json();

    genererFiches(travaux)


// Boutons Filtres
// Tous
const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click",(event) =>{
    document.querySelector(".gallery").innerHTML = "";
    genererFiches(travaux);
})

// Objets
    const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click",function(){
    const objetsFiltres = travaux.filter(function(travaux){
        return travaux.categoryId === 1
    });
    document.querySelector(".gallery").innerHTML = "";
    genererFiches(objetsFiltres);
})

// Appartements 
const boutonAppartements = document.querySelector(".btn-appartements")
boutonAppartements.addEventListener("click",function(){
    const appartementsFiltres = travaux.filter(function(travaux){
        return travaux.categoryId === 2
    });
    document.querySelector(".gallery").innerHTML = "";
    genererFiches(appartementsFiltres);
})

// Hotels et Restaurants
const boutonHotrest = document.querySelector(".btn-hotrest")
boutonHotrest.addEventListener("click",function(){
    const hotrestFiltres = travaux.filter(function(travaux){
        return travaux.categoryId === 3
    });
    document.querySelector(".gallery").innerHTML = "";
    genererFiches(hotrestFiltres);
})
}


// "http://localhost:5678/api/works"

fetchData()

