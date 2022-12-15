export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Функция закрытия popup на esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Функция установки слушателя закрытия popup на esc на весь документ
  _setKeyHandler = () => {
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Снятие слушателя закрытия popup на esc на весь документ
  _removeKeyHandler = () => {
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие popup на оверлее
  _bindPopupsOverlayClickHandlers() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
  };

  // Закрытие popup на крестике
  _bindPopupsCloseButtonsClickHandlers() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('close-btn')) {
        this.close();
      };
    })
  };

  setEventListeners() {
    this._bindPopupsCloseButtonsClickHandlers();
    this._bindPopupsOverlayClickHandlers();
  };

  open() {
    this._popup.classList.add('popup_opened');
    this._setKeyHandler();
  };

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeKeyHandler();
  };
};