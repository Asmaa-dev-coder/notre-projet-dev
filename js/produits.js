document.addEventListener('DOMContentLoaded', () => {
  const boutonsAjouter = document.querySelectorAll('.card-produit button');
  const compteurMobile = document.getElementById('compteur-panier');
  const compteurDesktop = document.getElementById('compteur-panier-desktop');

  let panier = JSON.parse(localStorage.getItem('panier')) || [];

  function mettreAJourCompteur() {
    const totalQt = panier.reduce((sum, p) => sum + (p.quantite || 1), 0);
     if (compteurMobile) compteurMobile.textContent = totalQt;
    if (compteurDesktop) compteurDesktop.textContent = totalQt;
  }

  mettreAJourCompteur();

  function afficherMessage(message) {
    const notif = document.createElement("div");
    notif.className = "notification-panier";
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.classList.add("visible");
    }, 10);

    setTimeout(() => {
      notif.classList.remove("visible");
      setTimeout(() => notif.remove(), 300);
    }, 2000);
  }

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
        produitExistant.quantite += 1;
      } else {
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
      afficherMessage("Produit ajouté au panier !");
    });
  });
});

