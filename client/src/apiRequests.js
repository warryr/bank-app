export const getAllClients = () => {
  return fetch('/api/clients/', {method: 'GET'})
    .then(response => response.json())
    .catch(error => {
      console.log(error.message);
      return [];
    });
};

export const addClient = (client) => {
  console.log(client);
  return fetch(`/api/clients/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(client)
  }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const deleteClient = (id) => {
  return fetch(`/api/clients/${id}/`, {method: 'DELETE'})
    .then(response => response.status === 204)
    .catch(error => {
      console.log(error.message);
      return false;
    });
};

export const getSingleClient = (id) => {
  return fetch(`/api/clients/${id}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => data[0])
    .catch(error => {
      console.log(error.message);
      return {};
    });
};

export const updateClient = (client, id) => {
  return fetch(`/api/clients/${id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(client)
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};