const BASE_URL = 'https://api.eugene.gordievsky.students.nomoreparties.space';

async function checkResponse (result) {
  const res = await result.json();

  if (result.ok) {
    return res;
  } else {
    return Promise.reject(res)
  }
}


export const register = (email, password, name) => {
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

export const login = (email, password) => {
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

export const getUserInfo = (token) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => checkResponse(res))
}

export const updateUserInfo = (email, name) => {
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

export const getSavedMovies = () => {
  return fetch(BASE_URL + '/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then((res) => checkResponse(res))
}

export const removeMovie = (movieId) => {
  return fetch(BASE_URL + '/movies/' + movieId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => checkResponse(res))
}

export const saveMovie = (movie) => {
  return fetch(BASE_URL + '/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
  })
    .then((res) => checkResponse(res))
}
