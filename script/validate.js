// Функция добавления класса с ошибкой
const showInputError = (form, formInput, errorMessage, settings) => {
  const errorElement = form.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция удаления класса с ошибкой
const hideInputError = (form, formInput, settings) => {
  const errorElement = form.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности поля
const isValid = (form, formInput, settings) => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage, settings);
  } else {
    hideInputError(form, formInput, settings);
  }
};

// Вызов функции isValid на каждый ввод символа

const setValidationEventListeners = (form, settings) => {
  // Находим все поля внутри формы и создаём их массив
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);
  
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(form, formInput, settings);

      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setValidationEventListeners(form, settings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

// Управление состоянием кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}