import React from 'react';

export const Input = ({ id, label, type, error, ...args }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} {...args}/>
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

export const TextInput = ({ ...args }) => (
  <Input type='text' {...args}/>
);

export const NumberInput = ({ ...args }) => (
  <Input type='number' {...args}/>
);

export const CheckboxInput = ({ ...args }) => (
  <Input type='checkbox' {...args}/>
);

export const TextTableInput = ({ ...args }) => (
  <TableInput type='text' {...args}/>
);

export const NumberTableInput = ({ min, ...args }) => (
  <TableInput type='number' min={min} {...args}/>
);

export const CheckboxTableInput = ({ ...args }) => (
  <TableInput type='checkbox' {...args}/>
);