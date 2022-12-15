export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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

  deleteCardOnline(cardId) {
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

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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

  changeAvatar({link}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: link
    })
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    })
    .catch((err) => {
      console.log(err)
    })
  };
  

}