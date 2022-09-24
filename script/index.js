const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.close-btn');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-input_el_name');
let jobInput = formElement.querySelector('.popup__form-input_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

popupCloseButton.addEventListener('click', popupToggle);

function fillInput() {
  popupToggle();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupOpenButton.addEventListener('click', fillInput);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle()
}

formElement.addEventListener('submit', formSubmitHandler);
