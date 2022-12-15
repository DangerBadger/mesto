export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const name = this._nameInput.textContent;
    const job = this._jobInput.textContent;
    return {name, job};
  }
    

  setUserInfo({ name, about, avatar}) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = about;
    this._avatar.src = avatar;
  }
};