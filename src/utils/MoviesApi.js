const checkResponse = (result) => {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Произошла ошибка: ${result.status}:${result.statusText}`)
}

export const getMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers : {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => checkResponse(res))
}
