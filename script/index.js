import {initialCards} from './cards.js';
import {Card} from './Card.js';

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popupProfile');
const popupCard = document.querySelector('#popupCard');
const cardPopupOpenButton = document.querySelector('.profile__add-button')
const formProfileElement = popupProfile.querySelector('#popupFormProfile');  
const nameInput = formProfileElement.querySelector('#input-name');
const jobInput = formProfileElement.querySelector('#input-job');
const formCardElement = popupCard.querySelector('#popupFormCard');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.template');
const popupImage = document.querySelector('#popupImage');
const popupPictureLink = popupImage.querySelector('.popup__figure-image');
const popupPictureCaption = popupImage.querySelector('.popup__figure-caption');
const submitButton = document.querySelector('.popup__submit-btn');
const popupList = Array.from(document.querySelectorAll('.popup'));
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: '.popup__form-input_type_error',
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

// Очистка ошибок при открытии popup
const clearErrors = (currentPopup) => {
  const form = currentPopup.querySelector('.popup__form');
  const inputList = Array.from(form.querySelectorAll('.popup__form-input'));
  if (!form.closest('.popup_opened')) {
    inputList.forEach((formInput) => {
      hideInputError(form, formInput, settings);
    })
  }
}

// Делаем кнопки неактивными при открытии popup 
const disableSubmitButton = () => {
  const submitButtonList = Array.from(document.querySelectorAll('.popup__submit-btn'));
  submitButtonList.forEach((button) => {
    button.classList.add('popup__submit-btn_inactive');
    button.setAttribute('disabled', '');
  })
};

// Открытие popupProfile с подстановкой значений и неактивным submit; вызов clearErrors
const openProfilePopup = () => {
  fillProfileFormInputs();
  disableSubmitButton(popupProfile);
  clearErrors(popupProfile);
  openPopup(popupProfile);
};

// Заполнение полей popupProfile при открытии
const fillProfileFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

// Очистка полей popupCard и вызов clearErrors
const clearPopupCard = () => {
  formCardElement.reset();
  clearErrors(popupCard);
}
// Открытие popupCard с пустыми полями и неактивным submit
const openPopupCard = () => {
  disableSubmitButton(popupCard);
  clearPopupCard();
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
const closePopupByOverlay = () => {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target == evt.currentTarget) {
        closePopup(popup)
      };
    });
  });
};

// Закрытие popup на крестике
const closePopupByCross = () => {
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


const handleAddCard = (evt) => {
  evt.preventDefault();
  const placeInput = formCardElement.querySelector('#input-place');
  const linkInput = formCardElement.querySelector('#input-link');
  const card = new Card({name: placeInput.value, link: linkInput.value}, handleOpenImagePopup, '.template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').prepend(cardElement);
  formCardElement.reset();
  closePopup(popupCard);
}

// Открытие картинки в Card
function handleOpenImagePopup(name, link) {
  popupPictureLink.src = link;
  popupPictureLink.alt = name;
  popupPictureCaption.textContent = name;
  openPopup(popupImage);
};


// Слушатель сабмита и доьавления popupCard
formCardElement.addEventListener('submit', handleAddCard); // - сабмит на форму

initialCards.forEach((item) => {
  const card = new Card(item, handleOpenImagePopup, '.template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').append(cardElement);
});

// // Загрузка 6 карточек (карточки в отдельном файле)
// const renderInitialCards = () => {
//   initialCards.forEach((card) => {
//     const currentCard = createCardNode(card.name, card.link);
//     // Отправка в template
//     cardsContainer.append(currentCard);
//   });
// };

// const createCardNode = (name, link) => {
//   // Глубокое копирование
//   const currentCard = cardTemplate.content.cloneNode(true);
//   // Заголовок
//   const currentText = currentCard.querySelector('.elements__caption');
//   currentText.textContent = name;
//   // link
//   const currentLink = currentCard.querySelector('.elements__img');
//   currentLink.src = link;
//   currentLink.alt = name;

//   setCardEventListeners(currentCard);

//   return currentCard;
// };

// // Функция обработки лайков
// const handleCardLike = (evt) => {
//   evt.target.classList.toggle('elements__like-button_active');
// };

// // Функция удаления карточки
// const handleDeleteCard = (evt) => {
//   const currentEl = evt.target.closest('.elements__item');
//   currentEl.remove();
// }

// // Функция открытия и заполнения карточки
// const handleOpenImagePopup = (evt) => {
//   const currentEl = evt.target.closest('.elements__item');
//   const openedCard = currentEl;
//   const caption = openedCard.querySelector('.elements__caption').textContent;
//   popupPictureCaption.textContent = caption;
//   const link = openedCard.querySelector('.elements__img').src;
//   popupPictureLink.src = link;
//   popupPictureLink.alt = caption;
//   openPopup(popupImage);
// };

// // Функция добавления карточки
// const handleAddCard = (evt) => {
//   evt.preventDefault();
//   const card = createCardNode(placeInput.value, linkInput.value);
//   cardsContainer.prepend(card);
//   formCardElement.reset();
//   closePopup(popupCard);
// };

// // Группируем слушатели в одном методе
// const setCardEventListeners = (currentCard) => {
//   // Добавление лайков в currentCard
//   currentCard.querySelector('.elements__like-button').addEventListener('click', handleCardLike);
//   // Удаление карточки в currentCard
//   const deleteButton = currentCard.querySelector('.elements__delete-btn');
//   deleteButton.addEventListener('click', handleDeleteCard);
//   // Открытие карточки в currentCard происходит в handleOpenImagePopup
//   const imgPopupOpenButton = currentCard.querySelector('.elements__img-button');
//   // Заполнение карточки в CurrentCard
//   imgPopupOpenButton.addEventListener('click', handleOpenImagePopup);
// };

// Слушатель сабмита popupProfile
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

// Слушатель открытия popupAddCard
cardPopupOpenButton.addEventListener('click', openPopupCard);

// Слушатель открытия popupProfile
profilePopupOpenButton.addEventListener('click', openProfilePopup);


enableValidation(settings);
closePopupByOverlay();
closePopupByCross();
// renderInitialCards();