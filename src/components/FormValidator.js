export default class FormValidator {
  constructor(formElement, validationConfig) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Функция добавления класса с ошибкой
  _showInputError = (formInput, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  // Функция удаления класса с ошибкой
  _hideInputError = (formInput) => {
    const errorElement = this._formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(`${this._inputErrorClass}`);
    errorElement.textContent = '';
  };

  // Функция проверки валидности поля
  _checkInputValidity = (formInput) => {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  };

   // Очищаем ошибки
   clearErrors = () => {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formInput);
    });
  }

  // Делаем кнопки неактивными при открытии popup 
  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  // Вызов функции isValid на каждый ввод символа
  enableValidation = () => {
    this._setValidationEventListeners();
  };

  _hasInvalidInput = () => {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

  // Управление состоянием кнопки
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  // Собираем все слушатели
  _setValidationEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState();
      });
    });
  };
};
