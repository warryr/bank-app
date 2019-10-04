export const login = (user, resolve, reject) => {
  return fetch(`/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => resolve(data, user.username))
      } else {
        reject()
      }
    })
    .catch((error) => {
      console.log(error.message)
    })
}
