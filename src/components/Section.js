export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  renderCard(item) { 
    this._renderer(item);
}

  addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card);
  }

  addItemAppEnd(element) {
    this._container.append(element);
  }

  addItemPrepEnd(element) {
    this._container.prepend(element); // Не могу осилить логику, возможно вернусь к реализации этого "Можно лучше" позже
  }
};