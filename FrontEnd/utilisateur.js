// Affichage logOut + suppression du token dans le local storage au clic
function linkLogout(){
    const link = document.querySelector("#log");
    const logout = document.createElement("a");
    logout.innerHTML = "logout";
    logout.setAttribute("href","index.html");
    logout.setAttribute("class","logout");
    link.appendChild(logout);
    document.querySelector(".logout").addEventListener("click", function(){
        localStorage.removeItem("token")
    })
}

// Affichage logIn + redirection vers la page de connexion
function linkLogin(){
    const link = document.querySelector("#log");
    const login = document.createElement("a");
    login.innerHTML = "login";
    login.setAttribute("href","login.html");
    login.setAttribute("class","login");
    link.appendChild(login);
}

// Test de présence du token d'identification dans le local storage
function isConnected(){
let token = localStorage.getItem("token");
if(token === null){
    return false
} else {
    return true
}}