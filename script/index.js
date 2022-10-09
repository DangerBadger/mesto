const userPopupOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const userPopupCloseButton = popupProfile.querySelector('.close-btn');
const popupCard = document.querySelector('.popup-card');
const cardPopupOpenButton = document.querySelector('.profile__add-button')
const cardPopupCloseButton = popupCard.querySelector('.close-btn');
const formProfileElement = popupProfile.querySelector('#popupProfile');  //Заменён на id
const nameInput = formProfileElement.querySelector('.popup__form-input_el_name');
const jobInput = formProfileElement.querySelector('.popup__form-input_el_job');
const formCardElement = popupCard.querySelector('#popupCard');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const container = document.querySelector('.elements__list');
const template = document.querySelector('.template');
const containerCard = template.querySelector('.elements__card');
const placeInput = formCardElement.querySelector('.popup__form-input_el_place');
const linkInput = formCardElement.querySelector('.popup__form-input_el_link');

// Открытие popup

const popupOpen = (currentPopup) => {
  currentPopup.classList.add('popup_opened');
  if (currentPopup == popupProfile) {
    fillInput();
  }
};

// Заполнение полей .popup-profile при открытии

const fillInput = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

userPopupOpenButton.addEventListener('click', () => {popupOpen(popupProfile)});
cardPopupOpenButton.addEventListener('click', () => {popupOpen(popupCard)});

// Закрытие popup

const popupClose = (currentPopup) => {
  currentPopup.classList.remove('popup_opened');
}

userPopupCloseButton.addEventListener('click', () => {popupClose(popupProfile)});
cardPopupCloseButton.addEventListener('click', () => {popupClose(popupCard)});

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

  // Сабмит popupCard
  formCardElement.addEventListener('submit', handleAddCard); // - сабмит на форму
};

const createCardNode = (name, link) => {
  const currentCard = template.content.cloneNode(true);
  // Заголовок
  const currentText = currentCard.querySelector('.elements__caption');
  currentText.textContent = name;
  // link
  const currentLink = currentCard.querySelector('.elements__img');
  currentLink.src = link;
  // Добавление лайков
  currentCard.querySelector('.elements__like-button').addEventListener('click', likeFunction);

  const deleteButton = currentCard.querySelector('.elements__delete-btn');
  deleteButton.addEventListener('click', handleDeleteCard);
  
  return currentCard;
};

// Функция обработки лайков
const likeFunction = (evt) => {
  evt.target.classList.toggle('elements__like-button_active');
};

const handleDeleteCard = (evt) => {
  const currentEl = evt.target.closest('.elements__item');
  currentEl.remove();
}

// Добавление карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCardNode(placeInput.value, linkInput.value);
  container.prepend(card);
  placeInput.value = '';
  linkInput.value = '';
  popupClose(popupCard);
};



render();