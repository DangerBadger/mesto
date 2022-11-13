class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Функция добавления класса с ошибкой
  _showInputError = (formInput, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
  };

// Функция удаления класса с ошибкой
  _hideInputError = (formInput) => {
    const errorElement = this._formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(`${this._inputErrorClass}`);
    errorElement.textContent = '';
  };

  // Функция проверки валидности поля
  _isValid = (formInput) => {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  };
  
  // Вызов функции isValid на каждый ввод символа

  enableValidation = () => {
    this._setValidationEventListeners();
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

  // Управление состоянием кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  // Очищаем ошибки
  _clearErrors = () => {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formInput);
    });
  }

  // Собираем все слушатели
  _setValidationEventListeners = () => {
    const inputList = this._inputList;
    const buttonElement  = this._buttonElement;

    this._formElement.addEventListener('reset', () => {
      this._clearErrors();
    });
    
    this._toggleButtonState(inputList, buttonElement);


    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this._toggleButtonState(inputList, buttonElement); 
      });
    });
  };

}


export {FormValidator};