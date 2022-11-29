export const profilePopupOpenButton = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('#popupProfile');
export const popupCard = document.querySelector('#popupCard');
export const cardPopupOpenButton = document.querySelector('.profile__add-button')
export const formProfileElement = popupProfile.querySelector('#popupFormProfile');  
export const nameInput = formProfileElement.querySelector('#input-name');
export const jobInput = formProfileElement.querySelector('#input-job');
export const formCardElement = popupCard.querySelector('#popupFormCard');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const popupImage = document.querySelector('#popupImage');
export const cardsContainer = '.elements__list';
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-input_type_error',
};
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 