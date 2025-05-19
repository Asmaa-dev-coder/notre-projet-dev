// Fonction pour récupérer les produits depuis le localStorage
function getPanier() {
    return JSON.parse(localStorage.getItem("panier")) || [];
  }
  function majCompteur() {
    const compteur = document.getElementById("compteur-panier");
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    if (compteur) {
      compteur.innerText = panier.length;
    }
  }
  
  // Attacher les événements aux boutons
  document.addEventListener('DOMContentLoaded', () => {
    majCompteur(); 
    const boutons = document.querySelectorAll('.card-produit button');
  
    boutons.forEach((bouton) => {
      bouton.addEventListener('click', () => {
        const card = bouton.closest('.card-produit');
        const nom = card.querySelector('h3').textContent;
        const prixTexte = card.querySelector('.prix').textContent;
        const prix = parseFloat(prixTexte.replace('€', '').replace(',', '.'));
        const image = card.querySelector('img').getAttribute('src');
  
        ajouterAuPanier(nom, prix, image);
        majCompteur();
      });
    });
  });
  
  
  // Fonction pour afficher les produits du panier
  function afficherPanier() {
    const produits = getPanier();
    console.log("Produits dans le panier :", produits);
    const container = document.getElementById("panier-container");
container.innerHTML= ""; //vide//  
    if (produits.length === 0) {
      container.innerHTML = "<p>Votre panier est vide.</p>";
      return;
    }
  
    let total = 0;
    produits.forEach((produit, index) => {

        const produitHTML = `
        <div class="panier-item">
          <img src="${produit.image || 'https://via.placeholder.com/80'}" alt="${produit.nom}" />
           <div>
          <h3>${produit.nom}</h3>
          <p>${produit.prix} €</p>
          <button onclick="supprimerProduit(${index})">Supprimer</button>
           </div>
        </div>
        `;

        container.innerHTML += produitHTML;
    total += produit.prix;
      });
  
    document.getElementById("total").textContent = `Total : ${total.toFixed(2)} €`;
  }
  
  // Fonction pour supprimer un produit
  function supprimerProduit(index) {
    const panier = getPanier();
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));

    afficherPanier(); // Mise à jour dynamique
    majCompteur(); 
    // recharge la page pour mettre à jour l'affichage
  }
   
  
  //document.addEventListener('DOMContentLoaded', () => {
  // Appel automatique au chargement de la page
  window.onload = afficherPanier;
  majCompteur();
  afficherPanier();}
  