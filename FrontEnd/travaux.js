// Fonction permettant de générer les fiches des travaux
function genererFiches(data) {
    for (let i = 0; i < data.length; i++) {
        const fichesTravaux = document.querySelector(".gallery")
        const fichesElement = document.createElement("figure")

        fichesElement.setAttribute("data-id", data[i].categoryId);
        fichesElement.classList.add("active");
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = data[i].title;
        const imgElement = document.createElement("img");
        imgElement.src = data[i].imageUrl;

        fichesTravaux.appendChild(fichesElement);
        fichesElement.appendChild(imgElement);
        fichesElement.appendChild(nomElement);
    }
}

// Fonction permettant de générer les fiches de la modale
function genererFichesModale(data) {
    // Modale
    for (let i = 0; i < data.length; i++) {
        const fichesModale = document.querySelector(".modale-gallery")
        const fichesElement = document.createElement("figure")
        // Ajout image
        const imgElement = document.createElement("img");
        imgElement.src = data[i].imageUrl;
        const trashDiv = document.createElement("div");
        // Ajout icone trash
        const trashElement = document.createElement("img")
        trashDiv.classList.add("trash")
        trashElement.src = "assets/icons/trash-can-solidtrash.png"

        fichesModale.appendChild(fichesElement);
        fichesElement.appendChild(imgElement);
        fichesElement.appendChild(trashDiv);
        trashDiv.appendChild(trashElement);

        //Suppression d'un travail
        trashDiv.addEventListener("click", async function (event) {
            event.preventDefault();
            const tokenStock = localStorage.getItem("token");

            // Envoi à l'API
            const response = await fetch("http://localhost:5678/api/works/" + data[i].id,
                {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${tokenStock}` },
                });

            // Gestion de la réponse de l'API
            if (response.status == "204") {
                const fichesModale = document.querySelector(".modale-gallery");
                fichesModale.innerHTML = "";
                const fiches = document.querySelector(".gallery");
                fiches.innerHTML = "";
                fetchData();
            } else if (response.status == "401")
                document.location.href = "login.html"
        });

    }
}

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    const travaux = await response.json();

    genererFiches(travaux);
    genererFichesModale(travaux);
}

// Fonction permettant de récupérer les catégories depuis l'API
function genererCategoriesModale(data) {
    for (let i = 0; i < data.length; i++) {
        const categorie = document.querySelector("#categorie")
        const optionsCategories = document.createElement("option")
        optionsCategories.innerText = data[i].name;
        optionsCategories.value = data[i].id;
        const idCategories = document.createElement("option");
        idCategories.innerHTML = data[i].id;
        categorie.appendChild(optionsCategories)
    }
}

// Fonction pour générer les boutons de tri
function genererBoutonsTri(data) {
    const boutons = document.getElementById("boutons");
    // Creation du bouton "tous"
    const boutonTous = document.createElement("button");
    boutonTous.innerHTML = "Tous";
    boutonTous.setAttribute("id", "btn-tous");
    boutonTous.setAttribute("class", "active");
    boutons.appendChild(boutonTous);
    // Boucle FOR pour générer les boutons depuis l'API
    for (let i = 0; i < data.length; i++) {
        const boutonsTri = document.createElement("button");
        boutonsTri.setAttribute("data-id", data[i].id);
        boutonsTri.setAttribute('class', 'inactive');
        boutonsTri.innerHTML = data[i].name;
        boutons.appendChild(boutonsTri);
    }
}

// Boutons Filtres
function triImages() {
    const boutonsTri = document.querySelectorAll("#boutons button");
    for (let boutonTri of boutonsTri) {
        boutonTri.addEventListener("click", function () {
            boutonsTri.forEach((e) => cacherElement(e));
            boutonTri.classList.add('active');
            // Tri des travaux
            let id = boutonTri.dataset.id;
            let figures = document.querySelectorAll(".gallery figure");
            for (let figure of figures) {
                figure.classList.replace("active", "inactive");
                if (id === undefined) {
                    figure.classList.replace("inactive", "active");
                } else if (id.includes(figure.dataset.id)) {
                    figure.classList.replace("inactive", "active");
                }
            }
        })
    }
}

async function fetchCategorie() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    genererCategoriesModale(categories);
    genererBoutonsTri(categories);

    triImages()
}
