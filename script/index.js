const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.close-btn');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-input_el_name');
let jobInput = formElement.querySelector('.popup__form-input_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

// Открытие popup

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

popupCloseButton.addEventListener('click', popupToggle);

// Заполнение полей popup при открытии

function fillInput() {
  popupToggle();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupOpenButton.addEventListener('click', fillInput);

// Сабмит popup

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle()
}

formElement.addEventListener('submit', formSubmitHandler);


// Загрузка 6 карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const container = document.querySelector('.elements__list');
const template = document.querySelector('.template');
const containerCard = template.querySelector('.elements__card');

const render = () => {
  initialCards.forEach((card) => {
    const currentCard = createCardNote(card.name, card.link);
    container.append(currentCard);
  });
};

const createCardNote = (name, link) => {
  const currentCard = template.content.cloneNode(true);
  // Заголовок
  const currentText = currentCard.querySelector('.elements__caption');
  currentText.textContent = name;
  // link
  const currentLink = currentCard.querySelector('.elements__img');
  currentLink.src = link;
  // currentLink.setAttribute('src', link); - альтернативный вариант
  return currentCard;
};

render();