export const getAllClients = () => {
  return fetch('clients/', {method: 'GET'})
    .then(response => response.json())
    .then(data => data.map(({_id, ...client}) => ({id: _id, ...client})))
    .catch(error => {
      console.log(error.message);
      return [];
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