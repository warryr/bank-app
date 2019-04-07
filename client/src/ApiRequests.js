export const getAllClients = () => {
  return fetch('clients/', {method: 'GET'})
    .then(response => response.json())
    .then(data => data.map(({_id, ...client}) => ({id: _id, ...client})))
    .catch(error => {
      console.log(error.message);
      return [];
    });
};

export const addClient = (client) => {
  console.log(client);
  return fetch(`clients/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(client)
  }).then(response => {
      if (response.status === 200) {
        return response.body;
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const deleteClient = (id) => {
  return fetch(`clients/${id}/`, {method: 'DELETE'})
    .then(response => response.status === 204)
    .catch(error => {
      console.log(error.message);
      return false;
    });
};