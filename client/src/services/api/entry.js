import { store } from '../../store/store'
import { userActions } from '../reducers/userReducer'

const getToken = () => store.getState().user.currentToken

const tokenExpired = (response) => {
  if (response.status === 401) {
    store.dispatch({ type: userActions.LOG_OUT })
    return true
  }
  return false
}

export const makeReport = (resolve, reject) => {
  fetch(`/api/entries/report`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      if (!tokenExpired(response)) {
        if (response.status === 200) {
          response.json().then((data) => {
            resolve(data)
          })
        } else {
          reject(response)
        }
      }
    })
    .catch((error) => {
      console.log(error.message)
      return []
    })
}
