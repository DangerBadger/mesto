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
    this._elementImg = this._card.querySelector('.elements__img');
    this._setEventListeners();

    this._elementImg.src = this._data.link;
    this._elementImg.alt = this._data.name;
    this._card.querySelector('.elements__caption').textContent = this._data.name;

    return this._card;
  }

  _setEventListeners() {
    this._elementLikeButton = this._card.querySelector('.elements__like-button');

    this._elementLikeButton.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._card.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._card.querySelector('.elements__img-button').addEventListener('click', () => {
      this._handleImageClick();
    });
    
  }

  _handleCardLike() {
    this._elementLikeButton.classList.toggle('elements__like-button_active');
  }

  _handleDeleteCard = () => {
    this._card.remove();
    this._card = null;
  }

  _handleImageClick() {
    this._openCard(this._data);
  }
  
}

export {Card};