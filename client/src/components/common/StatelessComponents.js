import React from 'react';

export const Input = ({ id, label, type, error }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type}/>
    <p>{error}</p>
  </div>
);

export const Select = ({ id, label, options, error }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select id={id} placeholder='не выбрано'>
      {options.map((option, key) =>
        <option key={key}>{option}</option>
      )}
    </select>
    <p>{error}</p>
  </div>
);

export const TableInput = ({ id, label, type, error, defaultVal }) => (
  <tr>
    <td>{label}</td>
    <td><input id={id} type={type} defaultValue={defaultVal}/></td>
    <td>{error}</td>
  </tr>
);

export const TableSelect = ({ id, label, options, error }) => (
  <tr>
    <td>{label}</td>
    <td><select id={id} placeholder='не выбрано'>
      {options.map((option, key) =>
        <option key={key}>{option}</option>
      )}
    </select></td>
    <td>{error}</td>
  </tr>
);