import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__form-input'));
    this._submitButton = this._popupSelector.querySelector('.popup__submit-btn');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  changeHandleFormSubmit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      switch(this._submitButtonText) {
        case 'Сохранить':
          this._submitButton.textContent = 'Сохранение...';
          break;
        case 'Создать':
          this._submitButton.textContent = 'Создание...';
          break;
        case 'Да':
          this._submitButton.textContent = 'Удаление...';
          break;
      }
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popupSelector.querySelector('.popup__form');

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
};