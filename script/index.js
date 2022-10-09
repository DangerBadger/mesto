const userPopupOpenButton = document.querySelector('.profile__edit-button');
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
const container = document.querySelector('.elements__list');
const template = document.querySelector('.template');
const containerCard = template.querySelector('.elements__card');
const placeInput = formCardElement.querySelector('.popup__form-input_el_place');
const linkInput = formCardElement.querySelector('.popup__form-input_el_link');
const popupImage = document.querySelector('#popupImage');
const imgPopupCloseButton = popupImage.querySelector('.close-btn');
const popupPictureLink = popupImage.querySelector('.popup__figure-image');
const popupPictureCuption = popupImage.querySelector('.popup__figure-caption');

// Открытие popup

const popupOpen = (currentPopup) => {
  currentPopup.classList.add('popup_opened');
  if (currentPopup == popupProfile) {
    fillInput();
  }
};

userPopupOpenButton.addEventListener('click', () => { popupOpen(popupProfile) });
cardPopupOpenButton.addEventListener('click', () => { popupOpen(popupCard) });

// Заполнение полей .popup-profile при открытии

const fillInput = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};


// Закрытие popup

const popupClose = (currentPopup) => {
  currentPopup.classList.remove('popup_opened');
}

userPopupCloseButton.addEventListener('click', () => { popupClose(popupProfile) });
cardPopupCloseButton.addEventListener('click', () => { popupClose(popupCard) });
imgPopupCloseButton.addEventListener('click', () => { popupClose(popupImage) });

// Сабмит popupProfile

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose(popupProfile);
};

formProfileElement.addEventListener('submit', formSubmitHandler);


// Загрузка 6 карточек (карточки в отдельном файле)


const render = () => {
  initialCards.forEach((card) => {
    const currentCard = createCardNode(card.name, card.link);
    // Отправка в template
    container.append(currentCard);
  });
};

const createCardNode = (name, link) => {
  // Глубокое копирование
  const currentCard = template.content.cloneNode(true);
  // Заголовок
  const currentText = currentCard.querySelector('.elements__caption');
  currentText.textContent = name;
  // link
  const currentLink = currentCard.querySelector('.elements__img');
  currentLink.src = link;

  setListeners(currentCard);

  return currentCard;
};


// Группируем все слушатели в одном методе

const setListeners = (currentCard) => {
  // Добавление лайков в currentCard
  currentCard.querySelector('.elements__like-button').addEventListener('click', likeFunction);
  // Удаление карточки в currentCard
  const deleteButton = currentCard.querySelector('.elements__delete-btn');
  deleteButton.addEventListener('click', handleDeleteCard);
  // Открытие карточки в currentCard
  const imgPopupOpenButton = currentCard.querySelector('.elements__img-button');
  imgPopupOpenButton.addEventListener('click', () => { popupOpen(popupImage) });
  // Заполнение карточки в CurrentCard
  imgPopupOpenButton.addEventListener('click', handleOpendCard);
  // Сабмит popupCard
  formCardElement.addEventListener('submit', handleAddCard); // - сабмит на форму
};

// Функция обработки лайков
const likeFunction = (evt) => {
  evt.target.classList.toggle('elements__like-button_active');
};

// Функция удаления карточки
const handleDeleteCard = (evt) => {
  const currentEl = evt.target.closest('.elements__item');
  currentEl.remove();
}

// Функция открытия и заполнения карточки
const handleOpendCard = (evt) => {
  const currentEl = evt.target.closest('.elements__item');
  const openedCard = currentEl;
  const caption = openedCard.querySelector('.elements__caption').textContent;
  popupPictureCuption.textContent = caption;
  const link = openedCard.querySelector('.elements__img').src;
  popupPictureLink.src = link;
};

// Функция добавления карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCardNode(placeInput.value, linkInput.value);
  container.prepend(card);
  placeInput.value = '';
  linkInput.value = '';
  popupClose(popupCard);
};

render();