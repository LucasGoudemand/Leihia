function volumePool(hauteur, largeur) {
  const largeurM3 = largeur;
  let volumeTotal = 0;

  for (let i = 1; i <= hauteur; i++) {
    //On fait tourner la boucle jsuqu'a 8
    const volumeM3 = largeurM3 * i; // largeur 15 * 1, 2 ,3 ,4...
    volumeTotal += volumeM3; // 0
    console.log(
      `A ${i} mètres de hauteur, il faudrait ${volumeTotal} m3 d'eau pour remplir la piscine.`
    );
  }
}

const hauteurPool = 8;
const largeurPool = 15;

volumePool(hauteurPool, largeurPool);
