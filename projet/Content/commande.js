function afficherMessageVolAbeille() {
  const message = "Merci d’avoir choisi notre miel, que douceur et bonheur accompagnent votre dégustation !";

  const notif = document.createElement("div");
  notif.className = "notification-vol-abeille";
  notif.innerHTML = `
    <div class="message">${message}</div>
    <div class="abeilles">
      <div class="abeille abeille1"></div>
      <div class="abeille abeille2"></div>
      <div class="abeille abeille3"></div>
    </div>
  `;

  document.body.appendChild(notif);

  // Animation apparition
  setTimeout(() => notif.classList.add("visible"), 10);

  // Disparition + abeilles s'envolent après 4s
  setTimeout(() => {
    notif.classList.remove("visible");
    notif.querySelectorAll('.abeille').forEach((abeille, i) => {
      abeille.classList.add('s-envole');
      abeille.style.animationDelay = `${i * 0.3}s`;
    });
    setTimeout(() => notif.remove(), 4500);
  }, 4000);
}





window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('orderForm');
  const recap = document.getElementById('recap');

  function afficherProduitsDansCommande() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    const recapProduit = document.getElementById('recapProduit');

    if (!recapProduit) return;

    if (panier.length === 0) {
      recapProduit.innerHTML = "<p>Aucun produit dans le panier.</p>";
      return;
    }

    recapProduit.innerHTML = panier.map(p => {
      const prixUnitaire =  Number(p.prix) || 0;
      const quantite = p.quantite || 1;
      const total = (prixUnitaire * quantite).toFixed(2);
      return `<div>${p.nom} x ${quantite} = ${total} €</div>`;
    }).join('');
  }

  function updateRecap() {
    const nom = form.nom.value.trim();
    const prenom = form.prenom.value.trim();
    const email = form.email.value.trim();
    const adresse = form.adresse.value.trim();

    const livraisonOption = form.livraison.options[form.livraison.selectedIndex];
    const livraison = livraisonOption ? livraisonOption.text : '';
    const prixLivraison = livraisonOption ? parseFloat(livraisonOption.dataset.price) || 0 : 0;

    const paiementOption = form.paiement.options[form.paiement.selectedIndex];
    const paiement = paiementOption ? paiementOption.text : '';

    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    let totalProduits = 0;
    panier.forEach(p => {
      const prixUnitaire = parseFloat(p.prix) || 0;

      totalProduits += prixUnitaire * (p.quantite || 1);
    });

    const total = (totalProduits + prixLivraison).toFixed(2);

    document.getElementById('recapNom').textContent = nom || '-';
    document.getElementById('recapPrenom').textContent = prenom || '-';
    document.getElementById('recapEmail').textContent = email || '-';
    document.getElementById('recapAdresse').textContent = adresse || '-';
    document.getElementById('recapLivraison').textContent = livraison || '-';
    document.getElementById('recapPaiement').textContent = paiement || '-';
    document.getElementById('recapTotal').textContent = total;

    afficherProduitsDansCommande();

    // Affiche le récap seulement si tout est rempli
    if (nom && prenom && email && adresse && livraison && paiement) {
      recap.style.display = 'block';
    }
  }

  form.addEventListener('input', updateRecap);

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // empêche le rechargement

    if (!form.checkValidity()) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

    updateRecap();

    afficherMessageVolAbeille();




    localStorage.removeItem("panier"); // vide le panier
    form.reset();
    recap.style.display = 'none';
  });
});
