////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////AJOUT DES CHAMPS POUR LES UTILISATEURS////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Création du compteur pour avoir un id différent pour chaque champ.
let compteurId = 1;

function DynamicForm() {
  //Fonction qui permet la création de champ lors d'un clic sur le button
  const container = document.getElementById("dynamic_FormContainer");

  // Création de la DIV
  const div = document.createElement("div");
  div.className = "form__dynamic";

  // Création de l'input pour le label
  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.id = "label" + compteurId;
  labelInput.name = "label";
  labelInput.placeholder = "Label du champ";
  // Création de l'input
  const input = document.createElement("input");
  input.type = "text";
  input.id = "value" + compteurId;
  input.name = "value";

  compteurId++; //On incrémente le compteur ici

  // Ajout des éléments au DOM
  div.appendChild(labelInput);
  div.appendChild(input);
  container.appendChild(div);
}

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////ASHAGE MOT DE PASSE////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour hacher le mot de passe avec SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder(); //TextEncoder est utiliser pour hasher les mdp
  const data = encoder.encode(password); //Cela convertit le mot de passe en une séquence d'octets
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); //pour calculer le hachage SHA-256 des données encodées
  const hashArray = Array.from(new Uint8Array(hashBuffer)); //Cela nous donne un tableau contenant les octets du hachage
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0")) //On utilise la méthode .map() pour itérer sur chaque octet du tableau et convertir chaque valeur en une chaîne de caractères hexadécimaux (base 16)
    .join(""); //pour concaténer toutes les chaînes hexadécimales en une seule chaîne.

  return hashHex; //Voici le mot de passe crypté
}

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////FONCTION POUR L'ENVOI A L'API/////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function sendingDataForApi(dataForApi) {
  const options = {
    method: "POST", //methode post
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForApi), //On convertie le body en format Json
  };
  fetch("https://staging.backend.leihia.com:8081/app/tech-test", options) //Url de notre API
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error sending data to the API");
      }
      return response.json();
    })
    .then((data) => {
      if (data.ok) {
        console.log("C'est good");
      }
    })
    .catch((error) => alert(error));
}

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////GESTION DES ACTIONS LORS DU SUBMIT DU FORMULAIRE//////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

const form = document.getElementById("userForm");
form.addEventListener("submit", handleSubmit);

// Fonction pour gérer la soumission du formulaire
async function handleSubmit(event) {
  event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

  const passwordInput = document.getElementById("password");

  // Hacher le mot de passe récupéré dans le champ password du formulaire
  const hashedPassword = await hashPassword(passwordInput.value);

  // Assigner le mot de passe haché au champ password du formulaire
  passwordInput.value = hashedPassword;

  // Envoi des données à l'API
  const inputFirstName = document.getElementById("firstname");
  const inputLastName = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputPhone = document.getElementById("phone");
  const inputProfilePicture = document.getElementById("profilePicture");

  // Création de notre objet User
  const User = {
    firstName: inputFirstName.value,
    lastname: inputLastName.value,
    email: inputEmail.value,
    phone: inputPhone.value,
    password: hashedPassword, // Utilisez le mot de passe haché
    profilePicture: inputProfilePicture.value,
  };

  // Récupérer les valeurs des champs dynamiques
  const dynamicFields = document.querySelectorAll(".form__dynamic");

  // Tableau pour stocker les données des champs dynamiques
  const dynamicArrayData = [];

  dynamicFields.forEach((field) => {
    //Pour chaque champ avec un nom label et value on récupere
    const labelInput = field.querySelector('input[name="label"]');
    const valueInput = field.querySelector('input[name="value"]');

    const fieldData = {
      label: labelInput.value,
      value: valueInput.value,
    };

    dynamicArrayData.push(fieldData);
  });

  //On envoi a l'API notre objet user et notre Array DynamicArrayData
  sendingDataForApi({ User, dynamicArrayData });
}
