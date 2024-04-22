document.addEventListener('DOMContentLoaded', function () {
  displayCards();
});

function displayCards(english, czech) {
  let cards = getCards();
  let cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';


  cards.forEach((item, index) => {
    let itemElement = document.createElement('div');
    itemElement.className = 'card';
    itemElement.innerHTML = `
        <div class="content">
          <div class="back">
            <div class="back-content">
              <strong>${item.english}</strong>
            </div>
          </div>
          <div class="front">
            <div class="front-content">
              <strong>${item.czech}</strong>
            </div>
          </div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Smazat</button>
      `;

    cardsContainer.appendChild(itemElement);
  });
}

function addItem() {
  let englishInput = document.getElementById("englishTranslate").value;
  let czechInput = document.getElementById('czechTranslate').value;
  let englishValue = englishInput.trim();
  let czechValue = czechInput.trim();


  if (!englishValue) {
    alert("Prosím, zadejte název položky.");
    return;
  }
  if (!czechValue) {
    alert("Prosím, zadejte název položky.");
    return;
  }

  let cards = getCards();
  cards.push({ english: englishValue, czech: czechValue });
  localStorage.setItem('translateCards', JSON.stringify(cards));
  englishInput.value = "";
  displayCards(englishValue, czechValue);
}

function deleteItem(index) {
  let cards = getCards();
  cards.splice(index, 1);
  localStorage.setItem('translateCards', JSON.stringify(cards));
  displayCards();
}

function getCards() {
  let storedCards = localStorage.getItem('translateCards');
  if (storedCards) {
    return JSON.parse(storedCards);
  }
  return [];
}