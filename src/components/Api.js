export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
  };


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getProfileInfo() {
    return this._request(
      `${this._baseUrl}/users/me`,
      {
        method: "GET",
        headers: this._headers
      })
  };
  

  getInitialCards() {
    return this._request(
      `${this._baseUrl}/cards`,
      {
        method: "GET",
        headers: this._headers
      })
  };

  editProfile({name, job}) {
    return this._request(
      `${this._baseUrl}/users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about: job
        })
      })
  }

  addNewCard({name, link}) {
    return this._request(
      `${this._baseUrl}/cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
  }

  deleteCardOnline(cardId) {
    return this._request(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      })
  }

  addLike(cardId) {
    return this._request(
      `${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      })
  }

  deleteLike(cardId) {
    return this._request(
      `${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      })
  }

  changeAvatar({link}) {
    return this._request(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
  };
  

}