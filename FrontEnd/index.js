window.addEventListener("load", (event) => {
    fetchData();
    fetchCategorie();
  

// Si connecté => afficher LogOut + Bouton modifier, sinon afficher LogIn +  Boutons filtres 

if(isConnected()){
    linkLogout();
    afficherElement(document.querySelector(".modale-open"));
    afficherElement(document.querySelector(".bandeau"));
}else{
    linkLogin();
    afficherElement(document.querySelector(".boutons"));
}

});