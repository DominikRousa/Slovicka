document.addEventListener('DOMContentLoaded', function() {
  displayCars();
});

function displayCars() {
  let cards = getCards();
  let cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';

  // Projde všechny položky a pro každou vytvoří HTML elementy
  cards.forEach((item, index) => {
      let itemElement = document.createElement('div');
      itemElement.className = 'card';
      itemElement.innerHTML = `
        <div class="content">
          <div class="back">
            <div class="back-content">
              <strong>School</strong>
            </div>
          </div>
          <div class="front">
            <div class="front-content">
              <strong>Skola</strong>
            </div>
          </div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Smazat</button>

          <input class="form-check-input" type="checkbox" ${cards.completed ? 'checked' : ''} onchange="toggleItem(${index})">
          <label class="form-check-label ${cards.completed ? 'completed' : ''}">
              ${cards.name}
          </label>
      `;

      cardsContainer.appendChild(itemElement); // Přidá element do DOM
  });
}

// Funkce pro přidání nové položky do seznamu
function addItem() {
  let englishInput = document.getElementById('englishTranslate').value;
  let czechInput = document.getElementById('czechTranslate').value; // Získá textové pole pro vstup od uživatele
  let englishValue = englishInput.trim();
  let czechValue = czechInput.trim(); // Ořeže bílé znaky z obou konců řetězce

  // Kontroluje, zda je vstupní pole prázdné
  if (!englishValue) {
      alert("Prosím, zadejte název položky."); // Zobrazí upozornění, pokud je pole prázdné
      return; // Ukončí funkci, aby se nedošlo k dalšímu zpracování
  }
  if (!czechValue) {
    alert("Prosím, zadejte název položky.");
    return;
}

  let cards = getCards(); // Načte položky ze storage
  cards.push({ name: cardValue, completed: false }); // Přidá novou položku do pole položek
  localStorage.setItem('translateCards', JSON.stringify(cards)); // Uloží upravené pole zpět do LocalStorage
  englishInput.value = ""; // Vyčistí textové pole
  displayCars(); // Aktualizuje zobrazení seznamu
}

// Funkce pro smazání položky ze seznamu
function deleteItem(index) {
  let cards = getCards(); // Načte aktuální stav položek
  cards.splice(index, 1); // Odstraní položku z pole
  localStorage.setItem('translateCards', JSON.stringify(cards)); // Uloží nový stav do LocalStorage
  displayCars(); // Aktualizuje zobrazení seznamu
}

// Funkce pro načtení položek z LocalStorage
function getCards() {
  let storedCards = localStorage.getItem('translateCards'); // Načte položky jako řetězec
  if (storedCards) {
      return JSON.parse(storedCards); // Převede řetězec zpět na JavaScriptový objekt
  }
  return []; // Pokud v LocalStorage nic není, vrátí prázdné pole
}