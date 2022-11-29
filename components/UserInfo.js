export default class UserInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return this._infoObject = {name: this._name, job: this._job}
  }

  setUserInfo({name, job}) {
    this._name = name;
    this._job = job;
    
    return this._newInfoObject = { name: this._name, job: this._job};
  }

};