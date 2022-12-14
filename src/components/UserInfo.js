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
    

  setUserInfo(info) {
    if(info.name) {
      this._nameInput.textContent = info.name;
    }
    if(info.about) {
      this._jobInput.textContent = info.about;
    } 
    if(info.avatar){
      this._avatar.src = info.avatar;
    }
  }
};