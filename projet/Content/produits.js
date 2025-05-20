 const boutonsAjouter = document.querySelectorAll('.card-produit button');
const compteurPanier = document.getElementById('compteur-panier');

// On récupère le panier existant (ou tableau vide si pas encore)
let panier = JSON.parse(localStorage.getItem('panier')) || [];

function mettreAJourCompteur() {
  compteurPanier.textContent = panier.length;
}

mettreAJourCompteur();

boutonsAjouter.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Récupère les infos du produit depuis la carte associée
    const carte = button.closest('.card-produit');
    const nom = carte.querySelector('h3').textContent;
    const prix = carte.querySelector('.prix').textContent;
    const imageSrc = carte.querySelector('img').src;

    // Crée un objet produit
    const produit = { nom, prix, imageSrc };

    // Ajoute au panier
    panier.push(produit);

    // Sauvegarde dans localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Met à jour compteur
    mettreAJourCompteur();

    alert("Produit ajouté au panier !");
  });
});
