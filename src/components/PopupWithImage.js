import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageLink = this._popupSelector.querySelector('.popup__figure-image');
    this._imageText = this._popupSelector.querySelector('.popup__figure-caption');

  }


  open(data) {
    super.open();
    this._imageLink.src = data.link;
    this._imageLink.alt = data.name;
    this._imageText.textContent = data.name;
  };
};
