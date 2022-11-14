class FormValidator {
  constructor(validationСonfig, formElement) {
    this._inputSelector = validationСonfig.inputSelector;
    this._submitButtonSelector = validationСonfig.submitButtonSelector;
    this._inactiveButtonClass = validationСonfig.inactiveButtonClass;
    this._inputErrorClass = validationСonfig.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._buttonList = Array.from(this._formElement.querySelectorAll(this._submitButtonSelector));
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

  // Делаем кнопки неактивными при открытии popup 
  disableSubmitButton = () => {
    this._buttonList.forEach((button) => {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = 'true';
    })
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
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = 'true';
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
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
    const buttonElement = this._buttonElement;

    this._formElement.addEventListener('reset', () => {
      this._clearErrors();
    });

    this._toggleButtonState();


    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

}


export { FormValidator };