const BASE_URL = 'https://api.eugene.gordievsky.students.nomoreparties.space';

const checkResponse = (result) => {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Произошла ошибка: ${result.status}:${result.statusText}`)
}

const register = (email, password, name) => {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  })
    .then((res) => checkResponse(res))
};

const login = (email, password) => {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((res) => checkResponse(res))
}

const getUserInfo = (token) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => checkResponse(res))
}

const updateUserInfo = (email, name) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      email,
      name
    })
  })
    .then((res) => checkResponse(res))
}

const getSavedMovies = () => {
  return fetch(BASE_URL + '/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then((res) => checkResponse(res))
}

module.exports = { register, login, getUserInfo, updateUserInfo, getSavedMovies }
