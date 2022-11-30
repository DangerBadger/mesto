import './pages/index.css';

import FormValidator from './components/FormValidator.js';
import {
  profilePopupOpenButton,
  popupProfile,
  popupCard,
  cardPopupOpenButton,
  formProfileElement,
  nameInput,
  jobInput,
  formCardElement,
  profileName,
  profileJob,
  popupImage,
  cardsContainer,
  validationConfig,
  initialCards
} from './utils/constants.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const cardFormValidator = new FormValidator(validationConfig, formCardElement);
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);

const popupImg = new PopupWithImage(popupImage);

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
  popupCard,
  {handleFormSubmit: (formData) => {
    const card = createCard(
      { data: { name: formData.place, link: formData.link }, handleOpenImagePopup: handleCardClick }, '.template');
      defaultCardList.addItemPrepEnd(card);
      popupItem.close();
  }
});

const userInfo = new UserInfo({ name: profileName.textContent, job: profileJob.textContent });

const popupUser = new PopupWithForm(
  popupProfile,
  {
    handleFormSubmit: (formData) => {
      const newUserInfo = userInfo.setUserInfo(
        { name: formData.name, job: formData.job }
      );
      profileName.textContent = newUserInfo.name;
      profileJob.textContent = newUserInfo.job;
      popupUser.close();
    }
  }
);

// Открытие popupProfile с подстановкой значений, неактивным submit и очисткой ошибок
const openProfilePopup = () => {
  profileFormValidator.clearErrors();
  profileFormValidator.disableSubmitButton(popupProfile);
  fillProfileFormInputs();
  popupUser.open();
};

// Заполнение полей popupProfile при открытии
const fillProfileFormInputs = () => {
  const profileAtribute = userInfo.getUserInfo();
  nameInput.value = profileAtribute.name;
  jobInput.value = profileAtribute.job;
};

// Открытие popupCard с пустыми полями и неактивным submit, очистка полей, очистка ошибок
const openPopupCard = () => {
  cardFormValidator.clearErrors();
  cardFormValidator.disableSubmitButton(popupCard);
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