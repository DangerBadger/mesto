import './index.css';

import {
  profilePopupOpenButton,
  popupProfileSelector,
  popupCardSelector,
  cardPopupOpenButton,
  formAvatarElement,
  formProfileElement,
  nameInput,
  jobInput,
  formCardElement,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  cardsContainer,
  validationConfig,
  avatarPopupOpenButton,
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId = undefined;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '36b86947-e3e3-40c9-9f59-59007cbe88e7',
    'Content-Type': 'application/json'
  }
});

api.getProfileInfo()
  .then((profileInfo) => {
    userInfo.setUserInfo(profileInfo)
    userId = profileInfo._id
  });

api.getInitialCards()
  .then((cardsArray) => {
    cardsArray.forEach(cardItem => {
      const card = createCard(
        {
          data: cardItem,
          userId,
          handleOpenImagePopup: handleCardClick
        },
        '.template');
      defaultCardList.addItemAppEnd(card)
    });
  });

const cardFormValidator = new FormValidator(validationConfig, formCardElement);
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);
const avatarFormValodator = new FormValidator(validationConfig, formAvatarElement)

const popupImg = new PopupWithImage('#popupImage');

const handleCardClick = (imageData) => {
  popupImg.open(imageData);
}

const createCard = (cardData, template) => {
  const card = new Card(
    cardData,
    template,
    (cardId) => {
      popupConfirm.open()
      popupConfirm.changeHandleFormSubmit(() => {
        api.deleteCardOnline(cardId)
          .then(() => {
            card.deleteCardLocal()
            popupConfirm.close()
          })
      })
    },
    (cardId) => {
      if(card.isLiked()) {
        api.deleteLike(cardId)
        .then((res) => {
          card.countLikes(res.likes)
        })
      } else {
        api.addLike(cardId)
        .then((res) => {
          card.countLikes(res.likes)
        })
      }
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

const popupConfirm = new PopupWithForm('#popupDeleteConfirm');

const popupAvatar = new PopupWithForm(
  '#popupAvatar',

  function handleFormSubmit(formData) {
    api.changeAvatar(formData)
      .then((avatar) => {
        userInfo.setUserInfo(avatar);
        popupAvatar.close()
      })
  }
);

const popupItem = new PopupWithForm(
  popupCardSelector,

  function handleFormSubmit(formData) {
    api.addNewCard(formData)
      .then((data) => {
        const card = createCard(
          {
            data,
            userId,
            handleOpenImagePopup: handleCardClick
          },
          '.template')
        defaultCardList.addItemPrepEnd(card)
        popupItem.close()
      })

  }
);

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  avatarSelector: profileAvatarSelector
});

const popupUser = new PopupWithForm(
  popupProfileSelector,

  function handleFormSubmit(formData) {
    api.editProfile(formData)
      .then((profileInfo) => {
        userInfo.setUserInfo(profileInfo)
        popupUser.close()
      })
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

const openAvatarPopup = () => {
  avatarFormValodator.clearErrors();
  avatarFormValodator.disableSubmitButton();
  popupAvatar.open();
}

// Слушатель открытия popupAddCard
cardPopupOpenButton.addEventListener('click', openPopupCard);

// Слушатель открытия popupProfile
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Слушатель открытия popupAvatar
avatarPopupOpenButton.addEventListener('click', openAvatarPopup);

popupImg.setEventListeners();
popupUser.setEventListeners();
popupItem.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValodator.enableValidation();
defaultCardList.renderItems();