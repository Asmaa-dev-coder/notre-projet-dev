const boutonsAjouter = document.querySelectorAll('.card-produit button');
const compteurPanier = document.getElementById('compteur-panier');

// On récupère le panier existant (ou tableau vide si pas encore)
let panier = JSON.parse(localStorage.getItem('panier')) || [];

function mettreAJourCompteur() {
  const totalQt = panier.reduce((sum, p) => sum + (p.quantite || 1), 0);
  compteurPanier.textContent = totalQt;
}

mettreAJourCompteur();

boutonsAjouter.forEach((button) => {
  button.addEventListener('click', () => {
    const carte = button.closest('.card-produit');
    const nom = carte.querySelector('h3').textContent;
    const prixTexte = carte.querySelector('.prix').textContent;
    const prix = parseFloat(prixTexte.replace(',', '.').replace('€', '').trim());
    const image = carte.querySelector('img').src;
    const poids = carte.querySelector('.poids')?.textContent || "250g";

    const produitExistant = panier.find(p => p.nom === nom);

    if (produitExistant) {
      // Si oui, on augmente la quantité
      produitExistant.quantite += 1;
    } else {
      // Sinon on l'ajoute au panier
      panier.push({
        nom,
        prix,
        image,
        poids,
        quantite: 1
      });
    }
    localStorage.setItem('panier', JSON.stringify(panier));
    mettreAJourCompteur();
    alert("Produit ajouté au panier !");
  });
});


