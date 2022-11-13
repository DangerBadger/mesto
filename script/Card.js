class Card {
  constructor(data, openCard, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openCard = openCard;
  }

  _getTemplate() {
    const currentCard = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return currentCard;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.elements__img').src = this._data.link;
    this._card.querySelector('.elements__img').alt = this._data.name;
    this._card.querySelector('.elements__caption').textContent = this._data.name;
    this._name = this._card.querySelector('.elements__caption').textContent;
    this._link = this._card.querySelector('.elements__img').src;

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.elements__like-button').addEventListener('click', () => {
      this._handleCardLike();
    });
    this._card.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._card.querySelector('.elements__img-button').addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
    
  }

  _handleCardLike() {
    this._card.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
  }

  _handleDeleteCard = (evt) => {
    this._card.closest('.elements__item').remove();
  }

  _handleOpenImagePopup() {
    this._openCard(this._name, this._link);
  }
  
}

export {Card};