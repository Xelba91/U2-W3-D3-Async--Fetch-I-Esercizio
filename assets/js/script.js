document.addEventListener("DOMContentLoaded", function () {
  // Seleziona l'elemento corretto
  const container = document.querySelector("#book-container");

  function creaCard(libro) {
    const col = document.createElement("div"); // creo un div con classe
    col.className = "col-12 col-md-6 col-lg-4 my-4";

    const card = document.createElement("div"); // creo un div con classe
    card.className = "card h-100";
    card.style = "max-height:450px";

    const img = document.createElement("img");
    img.src = libro.img;
    img.className = "card-img-top";
    img.alt = libro.title;

    const cardBody = document.createElement("div"); // creo un div con classe
    cardBody.className = "card-body d-flex flex-column justify-content-between align-items-center";

    const title = document.createElement("h5"); // creo un h5 con classe e contenuto
    title.className = "card-title";
    title.textContent = libro.title;

    const price = document.createElement("p"); // creo un p con classe e con contenuto il prezzo
    price.className = "card-text";
    price.textContent = `Prezzo: ${libro.price}€`;

    const btnScarta = document.createElement("button"); // creo un bottone con classe e contenuto con un evento onclick per rimuovere il div.col
    btnScarta.className = "btn btn-danger px-3 py-1";
    btnScarta.textContent = "Scarta";
    btnScarta.onclick = () => {
      col.remove(); // Rimuove la card dalla pagina
    };

    const btnCompra = document.createElement("button"); // creo un bottone con classe e contenuto con un evento onclick per aggiungere al carrello il libro
    btnCompra.className = "btn btn-success mx-2 px-3 py-1";
    btnCompra.textContent = "Compra ora";
    btnCompra.onclick = () => {
      aggiungiAlCarrello(libro); // Aggiunge il libro al carrello
    };

    // gli appendo nel DOM
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(btnScarta);
    cardBody.appendChild(btnCompra);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
  }

  // Carico i libri dall'API e creo le card
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json(); // Continua solo se la risposta è valida
      } else {
        console.error("Problemi di rete.");
        return []; // Ritorna un array vuoto in caso di risposta non valida
      }
    })
    .then((libri) => {
      libri.forEach((libro) => {
        const card = creaCard(libro);
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("C'è qualche problema ", error);
    });
});

// Entrambi document.addEventListener("DOMContentLoaded", function () {}) e window.onload sono eventi che si verificano quando la pagina web è completamente caricata e pronta per essere manipolata dal codice JavaScript. Tuttavia, c'è una differenza significativa tra i due:

// DOMContentLoaded:

// Questo evento viene attivato quando il DOM (Document Object Model) della pagina è stato completamente caricato e analizzato dal browser, il che significa che tutti gli elementi HTML sono stati creati e sono accessibili tramite JavaScript.
// document.addEventListener("DOMContentLoaded", function () {}) consente di eseguire del codice JavaScript appena dopo che il DOM è stato caricato, prima che altri elementi esterni come immagini, script e stili siano completamente caricati.
// Questo è utile quando si desidera manipolare gli elementi della pagina appena dopo che sono stati creati, senza dover attendere il caricamento completo di tutto il contenuto della pagina, come immagini o script esterni.
// onload:

// L'evento onload viene attivato quando l'intera pagina, compresi tutti i suoi contenuti (come immagini, script, stili), è stato completamente caricato.
// window.onload = function () {} consente di eseguire del codice JavaScript solo quando tutta la pagina, compresi i contenuti esterni, è stato caricato. Questo evento potrebbe richiedere più tempo rispetto a DOMContentLoaded se ci sono molte immagini o elementi pesanti nella pagina.
// È utile quando si desidera eseguire operazioni che dipendono dal caricamento completo di tutti i contenuti della pagina, come il posizionamento di elementi basato sulle dimensioni delle immagini o il recupero di dati da risorse esterne.
// In sintesi, DOMContentLoaded viene attivato appena dopo che il DOM è stato caricato, mentre onload viene attivato solo dopo che tutta la pagina, inclusi i contenuti esterni, è stata completamente caricata. Quale utilizzare dipende dalle esigenze specifiche del tuo codice JavaScript.
