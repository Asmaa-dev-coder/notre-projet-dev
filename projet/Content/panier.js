const panier = JSON.parse(localStorage.getItem('panier')) || [];
const contenuPanier = document.getElementById('panier-produit-list');
const totalElement = document.getElementById('panier-total');
const panierVide = document.getElementById('panier-vide'); // bloc message panier vide
const panierTotalContainer = document.getElementById('panier-total-container');


function afficherPanier() {
  contenuPanier.innerHTML = '';

  if (panier.length === 0) {
    contenuPanier.innerHTML = "<p>Votre panier est vide.</p>";
    totalElement.textContent = "0";
    return;
  }

  let total = 0;

  panier.forEach(produit => {
    const divProduit = document.createElement('div');
    divProduit.classList.add('produit-panier');

    
const prixNum = produit.prix;
    total += prixNum * (produit.quantite || 1);


   divProduit.innerHTML = `
  <img src="${produit.image}" alt="${produit.nom}">
  <div class="details-produit">
    <h3>${produit.nom}</h3>
    <p>Prix unitaire : ${produit.prix} €</p>
    <div>
      <button class="btn-moins" data-nom="${produit.nom}">-</button>
      <span class="quantite">${produit.quantite}</span>
      <button class="btn-plus" data-nom="${produit.nom}">+</button>
   <button class="btn-supprimer" data-nom="${produit.nom}" style="margin-left:10px; color:red;">Supprimer</button>
      </div>
    <p>Total : ${(produit.prix * produit.quantite).toFixed(2)} €</p>
 
    </div>
`;


    contenuPanier.appendChild(divProduit);
  });

  totalElement.textContent = total.toFixed(2);
}

afficherPanier();


contenuPanier.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-plus')) {
    const nom = e.target.getAttribute('data-nom');
    const produit = panier.find(p => p.nom === nom);
    produit.quantite++;
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
  }
  

  if (e.target.classList.contains('btn-moins')) {
    const nom = e.target.getAttribute('data-nom');
    const produit = panier.find(p => p.nom === nom);
    if (produit.quantite > 1) {
      produit.quantite--;
    } else {
      // Supprimer le produit si quantité à 1 et qu'on clique sur -
      const index = panier.indexOf(produit);
      panier.splice(index, 1);
    }
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
  }
   if (e.target.classList.contains('btn-supprimer')) {
  const nom = e.target.getAttribute('data-nom');
  const index = panier.findIndex(p => p.nom === nom);
  if (index !== -1) {
    panier.splice(index, 1);               // Supprime le produit du panier
    localStorage.setItem('panier', JSON.stringify(panier));  // Met à jour localStorage
    afficherPanier();                      // Réaffiche le panier à jour
  }
}

});


document.getElementById("commander")?.addEventListener("click", () => {
  window.location.href = "commande.html";
});

