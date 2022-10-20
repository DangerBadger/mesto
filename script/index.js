const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popupProfile');
const userPopupCloseButton = popupProfile.querySelector('.close-btn');
const popupCard = document.querySelector('#popupCard');
const cardPopupOpenButton = document.querySelector('.profile__add-button')
const cardPopupCloseButton = popupCard.querySelector('.close-btn');
const formProfileElement = popupProfile.querySelector('#popupFormProfile');  //Заменён на id
const nameInput = formProfileElement.querySelector('.popup__form-input_el_name');
const jobInput = formProfileElement.querySelector('.popup__form-input_el_job');
const formCardElement = popupCard.querySelector('#popupFormCard');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.template');
const placeInput = formCardElement.querySelector('.popup__form-input_el_place');
const linkInput = formCardElement.querySelector('.popup__form-input_el_link');
const popupImage = document.querySelector('#popupImage');
const imgPopupCloseButton = popupImage.querySelector('.close-btn');
const popupPictureLink = popupImage.querySelector('.popup__figure-image');
const popupPictureCaption = popupImage.querySelector('.popup__figure-caption');

// Функция открытия popup

const openPopup = (currentPopup) => {
  currentPopup.classList.add('popup_opened');
};

// Открытие popupProfile с прдстановкой значений

const openProfilePopup = () => {
  fillProfileFormInputs();
  openPopup(popupProfile);
};

// Заполнение полей .popup-profile при открытии

const fillProfileFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};


// Функция закрытия popup

const closePopup = (currentPopup) => {
  currentPopup.classList.remove('popup_opened');
}

// Закрытие popup на оверлее
const closePopupByOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target == evt.currentTarget) {
        closePopup(evt.currentTarget);
      }
    });
  });
}

// Функция сабмита popupProfile

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

// Загрузка 6 карточек (карточки в отдельном файле)


const renderInitialCards = () => {
  initialCards.forEach((card) => {
    const currentCard = createCardNode(card.name, card.link);
    // Отправка в template
    cardsContainer.append(currentCard);
  });
};

const createCardNode = (name, link) => {
  // Глубокое копирование
  const currentCard = cardTemplate.content.cloneNode(true);
  // Заголовок
  const currentText = currentCard.querySelector('.elements__caption');
  currentText.textContent = name;
  // link
  const currentLink = currentCard.querySelector('.elements__img');
  currentLink.src = link;
  currentLink.alt = name;

  setCardEventListeners(currentCard);

  return currentCard;
};

// Функция обработки лайков
const handleCardLike = (evt) => {
  evt.target.classList.toggle('elements__like-button_active');
};

// Функция удаления карточки
const handleDeleteCard = (evt) => {
  const currentEl = evt.target.closest('.elements__item');
  currentEl.remove();
}

// Функция открытия и заполнения карточки
const handleOpenImagePopup = (evt) => {
  const currentEl = evt.target.closest('.elements__item');
  const openedCard = currentEl;
  const caption = openedCard.querySelector('.elements__caption').textContent;
  popupPictureCaption.textContent = caption;
  const link = openedCard.querySelector('.elements__img').src;
  popupPictureLink.src = link;
  popupPictureLink.alt = caption;
  openPopup(popupImage);
};

// Функция добавления карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCardNode(placeInput.value, linkInput.value);
  cardsContainer.prepend(card);
  placeInput.value = '';
  linkInput.value = '';
  closePopup(popupCard);
};

// Группируем слушатели в одном методе

const setCardEventListeners = (currentCard) => {
  // Добавление лайков в currentCard
  currentCard.querySelector('.elements__like-button').addEventListener('click', handleCardLike);
  // Удаление карточки в currentCard
  const deleteButton = currentCard.querySelector('.elements__delete-btn');
  deleteButton.addEventListener('click', handleDeleteCard);
  // Открытие карточки в currentCard происходит в handleOpenImagePopup
  const imgPopupOpenButton = currentCard.querySelector('.elements__img-button');
  // Заполнение карточки в CurrentCard
  imgPopupOpenButton.addEventListener('click', handleOpenImagePopup);
};

// Слушатель сабмита popupProfile
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

// Слушатель открытия popup
cardPopupOpenButton.addEventListener('click', () => { openPopup(popupCard) });

// Слушатель открытия popupProfile
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Слушатели закрытия popup
userPopupCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
cardPopupCloseButton.addEventListener('click', () => { closePopup(popupCard) });
imgPopupCloseButton.addEventListener('click', () => { closePopup(popupImage) });

// Сабмит popupCard
formCardElement.addEventListener('submit', handleAddCard); // - сабмит на форму

closePopupByOverlay();
renderInitialCards();