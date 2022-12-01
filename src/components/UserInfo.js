export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._name = this._nameInput.textContent;
    this._job = this._jobInput.textContent;
    return {name: this._name, job: this._job};
  }
    

  setUserInfo({name, job}) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = job;
  }
};