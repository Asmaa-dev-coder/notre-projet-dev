document.addEventListener("DOMContentLoaded", () => {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  const listeProduits = document.getElementById("liste-produits");
  const totalSpan = document.getElementById("total-commande");

  let total = 0;
  panier.forEach(produit => {
    const li = document.createElement("li");
    li.textContent = `${produit.nom} x${produit.quantite} – ${produit.prix * produit.quantite} €`;
    listeProduits.appendChild(li);
    total += produit.prix * produit.quantite;
  });

  totalSpan.textContent = total.toFixed(2);




document.getElementById("form-commande").addEventListener("submit", function (e) {
  e.preventDefault();

  const panier = localStorage.getItem("panier");
  if (!panier || JSON.parse(panier).length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  // Tu peux ici récupérer les infos du formulaire
  const formData = new FormData(this);
  const nom = formData.get("nom");
  const prenom = formData.get("prenom");

  // Exemple : afficher un message de confirmation
  alert(`Commande validée ! ${prenom} ${nom}, Merci pour votre achat 🍯`);

  // Vider le panier
  localStorage.removeItem("panier");

  // Rediriger si tu veux
  window.location.href = "produits.html";
});
