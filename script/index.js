import {initialCards} from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popupProfile');
const popupCard = document.querySelector('#popupCard');
const cardPopupOpenButton = document.querySelector('.profile__add-button')
const formProfileElement = popupProfile.querySelector('#popupFormProfile');  
const nameInput = formProfileElement.querySelector('#input-name');
const jobInput = formProfileElement.querySelector('#input-job');
const formCardElement = popupCard.querySelector('#popupFormCard');
const placeInput = formCardElement.querySelector('#input-place');
const linkInput = formCardElement.querySelector('#input-link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupImage = document.querySelector('#popupImage');
const popupPictureLink = popupImage.querySelector('.popup__figure-image');
const popupPictureCaption = popupImage.querySelector('.popup__figure-caption');
const popupList = Array.from(document.querySelectorAll('.popup'));
const cardElementsList = document.querySelector('.elements__list');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-input_type_error',
};

// Функция установки слушателя закрытия popup на esc на весь документ
const setKeyHandler = () => {
  document.addEventListener('keydown', closePopupByEscape);
}

// Функция открытия popup с добавлением слушателя закрытия на esc
const openPopup = (currentPopup) => {
  currentPopup.classList.add('popup_opened');
  setKeyHandler();
};

// Открытие popupProfile с подстановкой значений и неактивным submit
const openProfilePopup = () => {
  formProfileElement.reset(); // На reset() навешаны слушатели очистки ошибок форм. Чтобы код работал исправно я теперь...
  fillProfileFormInputs(); // просто вызываю его раньше чем заполнение полей значениями из разметки.
  profileFormValidator.disableSubmitButton(popupProfile);
  openPopup(popupProfile);
};

// Заполнение полей popupProfile при открытии
const fillProfileFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

// Открытие popupCard с пустыми полями и неактивным submit, Очистка полей popupCard
const openPopupCard = () => {
  cardFormValidator.disableSubmitButton(popupCard);
  formCardElement.reset();
  openPopup(popupCard);
}

// Снятие слушателя закрытия popup на esc на весь документ
const removeKeyHandler = () => {
  document.removeEventListener('keydown', closePopupByEscape);
}

// Функция закрытия popup со снятием слушателя закрытия по esc
const closePopup = (currentPopup) => {
  currentPopup.classList.remove('popup_opened');
  removeKeyHandler();
}

// Закрытие popup на оверлее
const bindPopupsOverlayClickHandlers = () => {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup)
      };
    });
  });
};

// Закрытие popup на крестике
const bindPopupsCloseButtonsClickHandlers = () => {
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('close-btn')) {
        closePopup(popup);
      };
    })
  });
};

// Функция закрытия popup на esc
const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Функция сабмита popupProfile
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

// Создание карточек в Class Card
const createCards = (obj, handler, template) => {
  return new Card(obj, handler, template);
};

// Добавление новой карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCards({name: placeInput.value, link: linkInput.value}, handleOpenImagePopup, '.template');
  const cardElement = card.generateCard();
  cardElementsList.prepend(cardElement);
  formCardElement.reset();
  closePopup(popupCard);
}

// Открытие картинки в Card
function handleOpenImagePopup(data) {
  popupPictureLink.src = data.link;
  popupPictureLink.alt = data.name;
  popupPictureCaption.textContent = data.name;
  openPopup(popupImage);
};

// Инициализация создания 6 карточек
initialCards.forEach((item) => {
  const card = createCards(item, handleOpenImagePopup, '.template');
  const cardElement = card.generateCard();
  cardElementsList.append(cardElement);
});

// Слушатель сабмита и доьавления popupCard
formCardElement.addEventListener('submit', handleAddCard); // - сабмит на форму

// Слушатель сабмита popupProfile
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

// Слушатель открытия popupAddCard
cardPopupOpenButton.addEventListener('click', openPopupCard);

// Слушатель открытия popupProfile
profilePopupOpenButton.addEventListener('click', openProfilePopup);


const cardFormValidator = new FormValidator(validationConfig, formCardElement);
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
bindPopupsOverlayClickHandlers();
bindPopupsCloseButtonsClickHandlers();