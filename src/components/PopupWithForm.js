import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__form-input')); // Раньше я всегда явно преобразовывал...
  }        // массивоподобные объекты в массивы, но в группе меня уверяли что в этом теперь нет смысла и стал избегать этого по-возможности.

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
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