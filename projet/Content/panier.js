 // Récupérer le panier dans localStorage (tableau d'objets produits)
function getPanier() {
  const panier = localStorage.getItem("panier");
  return panier ? JSON.parse(panier) : [];
}

// Sauvegarder panier dans localStorage
function setPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

// Mettre à jour le compteur dans le header
function updateCompteur() {
  const panier = getPanier();
  const totalQt = panier.reduce((sum, p) => sum + p.quantite, 0);
  const compteurEl = document.getElementById("compteur-panier");
  if (compteurEl) {
    compteurEl.textContent = totalQt;
  } else {
    console.warn("Élément compteur-panier non trouvé dans le DOM.");
  }
}

// Afficher le panier
function afficherPanier() {
  const panier = getPanier();
  console.log("Panier chargé :", panier);
  const container = document.getElementById("panier-produit-list");
  const panierVide = document.getElementById("panier-vide");
  const totalContainer = document.getElementById("panier-total-container");
  const totalSpan = document.getElementById("panier-total");

  if (!container || !panierVide || !totalContainer || !totalSpan) {
    console.error("Un ou plusieurs éléments DOM manquent pour afficher le panier.");
    return;
  }

  container.innerHTML = "";

  if (panier.length === 0) {
    panierVide.style.display = "block";
    totalContainer.style.display = "none";
    updateCompteur();
    return;
  } else {
    panierVide.style.display = "none";
    totalContainer.style.display = "block";
  }

  let totalPrix = 0;

  panier.forEach((produit, index) => {
    const divProduit = document.createElement("div");
    divProduit.classList.add("produit-panier");

    divProduit.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" />
      <div class="details-produit">
        <h3>${produit.nom}</h3>
        <p>${produit.poids}</p>
        <p class="prix">${produit.prix.toFixed(2)} €</p>
      </div>
      <input type="number" min="1" value="${produit.quantite}" class="quantite-input" data-index="${index}" />
      <div class="boutons-panier">
        <button class="btn-supprimer" data-index="${index}">Supprimer</button>
      </div>
    `;

    container.appendChild(divProduit);

    totalPrix += produit.prix * produit.quantite;
  });

  totalSpan.textContent = totalPrix.toFixed(2);

  // Gestion modification quantité
  const inputsQt = document.querySelectorAll(".quantite-input");
  inputsQt.forEach(input => {
    input.addEventListener("change", e => {
      const idx = e.target.dataset.index;
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) val = 1;
      e.target.value = val;

      const panier = getPanier();
      panier[idx].quantite = val;
      setPanier(panier);
      afficherPanier(); // Re-affiche pour mise à jour total & compteur
    });
  });

  // Gestion suppression produit
  const btnsSuppr = document.querySelectorAll(".btn-supprimer");
  btnsSuppr.forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      const panier = getPanier();
      panier.splice(idx, 1);
      setPanier(panier);
      afficherPanier();
    });
  });

  updateCompteur();
}

// Vider le panier
document.getElementById("vider-panier")?.addEventListener("click", () => {
  if (confirm("Voulez-vous vraiment vider le panier ?")) {
    localStorage.removeItem("panier");
    afficherPanier();
  }
});

// Commander (juste une alerte pour prototype)
document.getElementById("commander")?.addEventListener("click", () => {
  alert("Merci pour votre commande ! (fonctionnalité prototype)");
  localStorage.removeItem("panier");
  afficherPanier();
});

// Exécuter quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  afficherPanier();
});

