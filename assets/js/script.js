document.addEventListener("DOMContentLoaded", function () {
  // Seleziona l'elemento corretto
  const container = document.querySelector("#book-container");

  //   localStorage.getItem("carrello"): Questo metodo di localStorage viene utilizzato per recuperare il valore associato alla chiave "carrello". Se non è presente nessun valore associato a questa chiave, restituirà null.
  //   JSON.parse(...): Questo metodo viene utilizzato per convertire una stringa JSON in un oggetto JavaScript. Poiché localStorage memorizza solo dati sotto forma di stringhe, dobbiamo utilizzare JSON.parse per convertire il valore restituito da localStorage.getItem("carrello") in un oggetto JavaScript.
  //   || []: Questa è una tecnica nota come "short-circuit evaluation" in JavaScript. Se il valore recuperato da localStorage è null (quindi se non è stato trovato alcun dato associato alla chiave "carrello"), l'espressione || [] restituirà un array vuoto ([]). In questo modo, garantiamo che carrello contenga sempre un array, anche se non ci sono dati salvati in localStorage.
  //   Quindi, la variabile carrello conterrà i dati del carrello recuperati da localStorage, se presenti, altrimenti conterrà un array vuoto. Questo approccio è molto comune nell'utilizzo di localStorage per memorizzare dati localmente nel browser.

  let carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  // Funzione per aggiungere un libro al carrello
  function aggiungiAlCarrello(libro) {
    carrello.push(libro);
    // Salva il carrello nel localStorage
    localStorage.setItem("carrello", JSON.stringify(carrello));

    // Aggiorna il carrello
    const listCarr = document.getElementById("lista-carrello");
    const carrElem = document.createElement("li");
    carrElem.className = "list-group-item d-flex justify-content-between align-items-center my-1 rounded-2 ";
    carrElem.textContent = `${libro.title} - ${libro.price}€`;

    // tasto rimuovi nel carrello
    const btnRemove = document.createElement("button");
    btnRemove.className = "btn btn-danger btn-sm px-3 py-1";
    btnRemove.textContent = "Rimuovi";
    btnRemove.onclick = function () {
      rimuoviDalCarrello(libro, carrElem);
    };

    carrElem.appendChild(btnRemove);
    listCarr.appendChild(carrElem);
  }

  function funClear() {
    carrello.length = 0;
    localStorage.setItem("carrello", JSON.stringify(carrello));
    document.getElementById("lista-carrello").innerHTML = "";
  }

  // Creo un div che fungerà da contenitore per il pulsante
  const divContainer = document.createElement("div");
  divContainer.className = "text-center mt-3"; // Aggiungi le classi per centraggio e margin-top

  // Creo il btn per svuotare il carrello
  const btnSvuota = document.createElement("button");
  btnSvuota.className = "btn btn-warning btn-sm fw-bold px-3 py-1";
  btnSvuota.textContent = "Svuota Carrello";
  btnSvuota.onclick = funClear;

  // Aggiungo il btn al div contenitore
  divContainer.appendChild(btnSvuota);

  // Aggiungo il div contenitore sotto la lista del carrello
  document.getElementById("carrello").appendChild(divContainer);

  // rimuovere dal carrello il libro
  function rimuoviDalCarrello(libroDaRimuovere, elementoCarrello) {
    // Rimuove il libro dall'array carrello
    const indice = carrello.indexOf(libroDaRimuovere);
    if (indice > -1) {
      carrello.splice(indice, 1);
    }
    localStorage.setItem("carrello", JSON.stringify(carrello));
    elementoCarrello.remove();
  }

  //funzione per creare la card che viene richiamata dal then una volta ricevuto il dato completo
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

    // <div class="col-12 col-md-6 col-lg-4 my-4">               div col
    //     <div class="card h-100" style="max-height: 450px;">   div card
    //         <img src="..." alt="... ">
    //             <div class="card-body d-flex flex-column justify-content-between align-items-center">                                         div cardBody
    //                 <h5 class="card-title">...</h5
    //                 <p class="card-text">...</p>
    //                 <button class="btn btn-danger px-3 py-1">Scarta</button>
    //                 <button class="btn btn-success mx-2 px-3 py-1">Compra ora</button>
    //                 </div>
    //                 </div>
    //                 </div>

    return col;
  }

  // Carico i libri dall'API e creo le card
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        // Continua solo se la risposta è valida
        return response.json();
      } else {
        console.error("Problemi di rete.");
        return []; // Ritorna un array vuoto in caso di risposta non valida
      }
    })
    .then((libri) => {
      libri.forEach((libro) => {
        const card = creaCard(libro);
        // div id book-container
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
