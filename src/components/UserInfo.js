export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._name = this._nameInput.textContent;
    this._job = this._jobInput.textContent;
    return {name: this._name, job: this._job};
  }
    

  setUserInfo({name, job, avatar}) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = job;
    if(avatar){
      this._avatar.src = avatar;
    }
  }
};