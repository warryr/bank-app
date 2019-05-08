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

export const getAllClients = (resolve, reject) => {
  return fetch('/api/clients/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  })
    .then(response => {
      if (!tokenExpired(response)) {
        if(response.status === 200) {
          response.json().then(clients => resolve(clients))
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

export const addClient = (client, resolve, reject) => {
  console.log(client);
  fetch(`/api/clients/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(client)
  }).then(response => {
      if (!tokenExpired(response)) {
        if (response.status === 200) {
          response.json().then(newClient => resolve(newClient));
        } else {
          reject(response);
        }
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const deleteClient = (id, resolve, reject) => {
  return fetch(`/api/clients/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  })
    .then(response => {
      if (!tokenExpired(response)) {
        if (response.status === 204) {
          resolve(id);
        } else {
          reject('You tried to delete someone who doesn\'t exist!!');
        }
      }
    })
    .catch(error => {
      console.log(error.message);
      return false;
    });
};

export const getSingleClient = (id, resolve, reject) => {
  return fetch(`/api/clients/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  })
    .then(response => {
      if (!tokenExpired(response)) {
        if (response.status === 200) {
          response.json().then(client => resolve(client[0]));
        } else {
          reject(response);
        }
      }
    })
    .catch(error => {
      console.log(error.message);
      return {};
    });
};

export const updateClient = (client, id, resolve, reject) => {
  return fetch(`/api/clients/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(client)
  })
    .then(response => {
      if (!tokenExpired(response)) {
        if (response.status === 200) {
          response.json().then(updatedClient => resolve(updatedClient));
        } else {
          reject(response);
        }
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};