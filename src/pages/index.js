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
  profileName,
  profileNameSelector,
  profileJob,
  profileJobSelector,
  profileAvatar,
  profileAvatarSelector,
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
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '36b86947-e3e3-40c9-9f59-59007cbe88e7',
    'Content-Type': 'application/json'
  }
});

api.getProfileInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
      avatar: res.avatar
    });
  });

api.getInitialCards()
  .then((cardsArray) => {
    cardsArray.forEach(cardItem => {
      const card = createCard(
        {
          data: cardItem,
          handleOpenImagePopup: handleCardClick
        },
        '.template');
      defaultCardList.addItemAppEnd(card)
    });
  });

const cardFormValidator = new FormValidator(validationConfig, formCardElement);
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);

const popupImg = new PopupWithImage(popupImageSelector);

const handleCardClick = (imageData) => {
  popupImg.open(imageData);
}

const createCard = (cardData, template) => {
  const card = new Card(
    cardData,
    template,
    (cardId) => {
      console.log(cardId)
      popupConfirm.open()
    }
  );
  return card.generateCard();
};

const defaultCardList = new Section({
  items: [],
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

const popupConfirm = new PopupWithForm(
  '#popupDeleteConfirm',
  {
    handleFormSubmit: () => {
      api.deleteCard(id)
        .then((res) => {
          console.log(res)
        })
      popupConfirm.close()
    }
  }
);


const popupItem = new PopupWithForm(
  popupCardSelector,
  {
    handleFormSubmit: (formData) => {
      api.addNewCard(formData)
        .then((res) => {
          const card = createCard(
            {
              data: {
                name: res.name,
                link: res.link,
                likes: res.likes,
                _id: res._id
              },
              handleOpenImagePopup: handleCardClick
            },
            '.template')
          defaultCardList.addItemPrepEnd(card)
          popupItem.close()
          console.log(res._id)
        })

    }
  });

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  avatarSelector: profileAvatarSelector
});

const popupUser = new PopupWithForm(
  popupProfileSelector,
  {
    handleFormSubmit: (formData) => {
      api.editProfile(formData)
        .then((res) => {
          userInfo.setUserInfo({
            name: res.name,
            job: res.about
          })
          popupUser.close()
        })
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
  const { name, job } = userInfo.getUserInfo();
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
popupConfirm.setEventListeners();
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
defaultCardList.renderItems();