import './index.css';

import {
  profilePopupOpenButton,
  popupProfileSelector,
  popupCardSelector,
  cardPopupOpenButton,
  formProfileElement,
  nameInput,
  jobInput,
  formCardElement,
  profileNameSelector,
  profileJobSelector,
  popupImageSelector,
  cardsContainer,
  validationConfig,
  initialCards
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardFormValidator = new FormValidator(validationConfig, formCardElement);
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);

const popupImg = new PopupWithImage(popupImageSelector);

const handleCardClick = (imageData) => {
  popupImg.open(imageData);
}

const createCard = (cardData, template) => {
  const card = new Card(cardData, template);
  return card.generateCard();
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = createCard(
      {
        data: cardItem,
        handleOpenImagePopup: handleCardClick
      },
      '.template');
    defaultCardList.addItemAppEnd(card);
  }
},
  cardsContainer
);

const popupItem = new PopupWithForm(
  popupCardSelector,
  {handleFormSubmit: (formData) => {
    const card = createCard({
      data: formData,
      handleOpenImagePopup: handleCardClick
    },
    '.template');
      defaultCardList.addItemPrepEnd(card);
      popupItem.close();
  }
});

const userInfo = new UserInfo({ nameSelector: profileNameSelector, jobSelector: profileJobSelector });

const popupUser = new PopupWithForm(
  popupProfileSelector,
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
      popupUser.close();
    }
  }
);

// Открытие popupProfile с подстановкой значений, неактивным submit и очисткой ошибок
const openProfilePopup = () => {
  profileFormValidator.clearErrors();
  profileFormValidator.disableSubmitButton();
  fillProfileFormInputs();
  popupUser.open();
};

// Заполнение полей popupProfile при открытии
const fillProfileFormInputs = () => {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};

// Открытие popupCard с пустыми полями и неактивным submit, очистка полей, очистка ошибок
const openPopupCard = () => {
  cardFormValidator.clearErrors();
  cardFormValidator.disableSubmitButton();
  popupItem.open();
};

// Слушатель открытия popupAddCard
cardPopupOpenButton.addEventListener('click', openPopupCard);

// Слушатель открытия popupProfile
profilePopupOpenButton.addEventListener('click', openProfilePopup);

popupImg.setEventListeners();
popupUser.setEventListeners();
popupItem.setEventListeners();
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
defaultCardList.renderItems();