// URL de l'API (remplacez par l'URL correcte de votre back-end)
const apiUrl = 'http://localhost:5678/api/works'; 

// Sélection de l'élément menu de catégories et galerie dans le DOM
const categoriesMenu = document.querySelector('.menu-categories');
const gallery = document.querySelector('.gallery');

// Fonction pour afficher les projets dans la galerie
function afficherProjets(travaux) {
  gallery.innerHTML = ''; // Vider la galerie
  
  travaux.forEach(travail => {
    const figure = document.createElement('figure');
    
    const img = document.createElement('img');
    img.src = travail.imageUrl;
    img.alt = travail.title;
    
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = travail.title;
    
    figure.appendChild(img);
    figure.appendChild(figcaption);
    
    gallery.appendChild(figure);
  });
}

// Fonction pour générer dynamiquement les boutons de catégories
function genererBoutonsCategories(categories, data) {
  categoriesMenu.innerHTML = ''; // Vider le menu de catégories

  // Créer le bouton "Tous" par défaut
  const boutonTous = document.createElement('button');
  boutonTous.textContent = 'Tous';
  boutonTous.classList.add('active'); // Par défaut, "Tous" est actif
  boutonTous.addEventListener('click', () => {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.menu-categories button').forEach(btn => btn.classList.remove('active'));
    boutonTous.classList.add('active'); // Activer le bouton "Tous"
    afficherProjets(data); // Afficher tous les projets
  });
  categoriesMenu.appendChild(boutonTous);

  // Créer un bouton pour chaque catégorie unique
  categories.forEach(category => {
    const bouton = document.createElement('button');
    bouton.textContent = category;
    bouton.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      document.querySelectorAll('.menu-categories button').forEach(btn => btn.classList.remove('active'));
      bouton.classList.add('active'); // Activer le bouton cliqué

      // Filtrer les projets par catégorie
      const projetsFiltres = data.filter(travail => travail.category.name === category);
      afficherProjets(projetsFiltres);
    });
    categoriesMenu.appendChild(bouton);
  });
}

// Charger les projets et générer dynamiquement les catégories
document.addEventListener('DOMContentLoaded', () => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Créer un Set pour obtenir les catégories uniques
      const categories = new Set(data.map(travail => travail.category.name));

      // Générer les boutons de catégories dynamiques
      genererBoutonsCategories(categories, data);

      // Afficher tous les projets par défaut
      afficherProjets(data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des projets:', error);
    });
});
