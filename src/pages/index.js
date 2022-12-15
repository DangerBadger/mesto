import './index.css';

import {
  profilePopupOpenButton,
  popupProfileSelector,
  popupCardSelector,
  cardPopupOpenButton,
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

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  avatarSelector: profileAvatarSelector
});

let userId = undefined;

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationConfig);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '36b86947-e3e3-40c9-9f59-59007cbe88e7',
    'Content-Type': 'application/json'
  }
});

  Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then(([cardsArray, userData]) => {
      userId = userData._id;
      userInfo.setUserInfo(userData)
      
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
    })
    .catch(err => {
      console.log(err)
    });

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
        popupConfirm.renderLoading(true, 'Удаление...')
        api.deleteCardOnline(cardId)
          .then(() => {
            card.deleteCardLocal()
            popupConfirm.close()
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            popupConfirm.renderLoading(false)
          })
      })
    },
    (cardId) => {
      if (card.isLiked()) {
        api.deleteLike(cardId)
          .then((res) => {
            card.countLikes(res.likes)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.addLike(cardId)
          .then((res) => {
            card.countLikes(res.likes)
          })
          .catch((err) => {
            console.log(err)
          });
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

const popupImg = new PopupWithImage('#popupImage');

const popupConfirm = new PopupWithForm('#popupDeleteConfirm');

const popupAvatar = new PopupWithForm(
  '#popupAvatar',

  function handleFormSubmit(formData) {
    popupAvatar.renderLoading(true, 'Сохранение...')
    api.changeAvatar(formData)
      .then((avatar) => {
        userInfo.setUserInfo(avatar);
        popupAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupAvatar.renderLoading(false)
      })
  }
);

const popupItem = new PopupWithForm(
  popupCardSelector,

  function handleFormSubmit(formData) {
    popupItem.renderLoading(true, 'Создание...')
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
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupItem.renderLoading(false)
      })
  }
);

const popupUser = new PopupWithForm(
  popupProfileSelector,

  function handleFormSubmit(formData) {
    popupUser.renderLoading(true, 'Сохранение...')
    api.editProfile(formData)
      .then((profileInfo) => {
        userInfo.setUserInfo(profileInfo)
        popupUser.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupUser.renderLoading(false)
      })
  }
);

// Открытие popupProfile с подстановкой значений, неактивным submit и очисткой ошибок
const openProfilePopup = () => {
  formValidators['profile'].clearErrors()
  formValidators['profile'].disableSubmitButton()
  const inpitValues = userInfo.getUserInfo();
  popupUser.setInputValues(inpitValues);
  popupUser.open();
};

// Открытие popupCard с пустыми полями и неактивным submit, очистка полей, очистка ошибок
const openPopupCard = () => {
  formValidators['card'].clearErrors()
  formValidators['card'].disableSubmitButton()
  popupItem.open();
};

const openAvatarPopup = () => {
  formValidators['avatar'].clearErrors()
  formValidators['avatar'].disableSubmitButton()
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
defaultCardList.renderItems();