import { store } from '../reducers/store';
import { userActions } from '../reducers/userReducer';

const getToken = () => store.getState().user.currentToken;

const tokenExpired = response => {
  if (response.status === 401) {
    store.dispatch({type: userActions.LOG_OUT});
    return true;
  }
  return false;
};

export const getClientDeposits = (clientId, resolve, reject) => {
  fetch(`/api/deposits/${clientId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  })
    .then(response => {
      if (!tokenExpired(response)) {
        if(response.status === 200) {
          response.json().then(deposits => {
            console.log(deposits);
            resolve(deposits)
          })
        } else {
          reject(response);
        }
      }
    })
    .catch(error => {
      console.log(error.message);
      return [];
    });
};

export const addDeposit = (deposit, resolve, reject) => {
  fetch(`/api/deposits/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(deposit)
  }).then(response => {
    if (!tokenExpired(response)) {
      if (response.status === 200) {
        response.json().then(newDeposit => resolve(newDeposit));
      } else {
        reject(response);
      }
    }
  })
    .catch(error => {
      console.log(error.message);
    });
};