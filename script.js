document.addEventListener('DOMContentLoaded', function () {
  displayCards();
});

function displayCards(english, czech, explanation) {
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
              <br><br><br><br><br>
              <p>${item.explanation}</p>
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
  let explanationInput = document.getElementById('explanation').value;
  let englishValue = englishInput.trim();
  let czechValue = czechInput.trim();
  let explanationValue = explanationInput.trim();


  if (!englishValue) {
    alert("Prosím, zadejte text");
    return;
  }
  if (!czechValue) {
    alert("Prosím, zadejte text.");
    return;
  }
  if (!explanationValue) {
    alert("Prosím, zadejte text");
    return;
  }

  let cards = getCards();
  cards.push({ english: englishValue, czech: czechValue, explanation: explanationValue });
  localStorage.setItem('translateCards', JSON.stringify(cards));
  englishInput.value = "";
  displayCards(englishValue, czechValue, explanationValue);
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