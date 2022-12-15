import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageLink = this._popup.querySelector('.popup__figure-image');
    this._imageText = this._popup.querySelector('.popup__figure-caption');

  }


  open({name, link}) {
    super.open();
    this._imageLink.src = link;
    this._imageLink.alt = name;
    this._imageText.textContent = name;
  };
};
