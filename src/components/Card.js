export default class Card {
  constructor(settings, templateSelector, handleDeleteConfirm, handleCardLikeClick) {
    this._data = settings.data;
    this._userId = settings.userId;
    this._ownerId = this._data.owner._id;
    this._openCard = settings.handleOpenImagePopup;
    this._templateSelector = templateSelector;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._handleCardLikeClick = handleCardLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);
  }

  isLiked() {
    const isLikedByUser = this._data.likes.find(user => user._id === this._userId)

    return isLikedByUser
  }

  countLikes(actualLikes) {
    this._data.likes = actualLikes
    // const cardLikeCounter = this._card.querySelector('.elements__like-counter')
    this._cardLikeCounter.textContent = this._data.likes.length

    if(this.isLiked()) {
      this._elementLikeButton.classList.add('elements__like-button_active');
    } else {
      this._elementLikeButton.classList.remove('elements__like-button_active');
    }
  }

  deleteCardLocal = () => {
    this._card.remove();
    this._card = null;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._deleteButton = this._card.querySelector('.elements__delete-btn');
    this._elementImg = this._card.querySelector('.elements__img');
    this._elementLikeButton = this._card.querySelector('.elements__like-button');
    this._cardLikeCounter = this._card.querySelector('.elements__like-counter');
    this._setEventListeners();

    this._elementImg.src = this._data.link;
    this._elementImg.alt = this._data.name;
    this._card.querySelector('.elements__caption').textContent = this._data.name;

    this.countLikes(this._data.likes);

    if(this._ownerId !== this._userId){
      this._deleteButton.style.display = 'none';
    }

    return this._card;
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._handleCardLikeClick(this._data._id);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteConfirm(this._data._id);
    });

    this._card.querySelector('.elements__img-button').addEventListener('click', () => {
      this._handleImageClick();
    });
    
  }

  _handleImageClick() {
    this._openCard(this._data);
  }
};