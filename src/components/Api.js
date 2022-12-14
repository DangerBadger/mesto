export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    // this._authorization = headers.authorization;
    // this._contentType = headers.Content-Type;
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: this._headers
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    })
    .catch((err) => {
      console.log(err)
    })
  };
  

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  editProfile({name, job}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job
      })
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

}