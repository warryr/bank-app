import React from 'react'
import { Select, TableSelect } from 'src/common/StatelessComponents'

const countries = [
  'Латвийская Республика',
  'Литовская Республика',
  'Республика Беларусь',
  'Република Польша',
  'Российская Федерация',
  'Украина',
]
const cities = ['Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилев', 'Минск']
const maritalStatuses = ['женат/замужем', 'не женат/не замужем']
const invalidGroups = ['нет', '1 группа', '2 группа', '3 группа']

export const CountrySelect = ({ id, label }) => <Select id={id} label={label} options={countries} />

export const CitySelect = ({ id, label }) => <Select id={id} label={label} options={cities} />

export const MaritalStatusSelect = ({ id, label }) => (
  <Select id={id} label={label} options={maritalStatuses} />
)

export const InvalidSelect = ({ id, label }) => (
  <Select id={id} label={label} options={invalidGroups} />
)

export const TableCountrySelect = ({ id, label, error }) => (
  <TableSelect id={id} label={label} options={countries} error={error} />
)

export const TableCitySelect = ({ id, label, error }) => (
  <TableSelect id={id} label={label} options={cities} error={error} />
)

export const TableMaritalStatusSelect = ({ id, label, error }) => (
  <TableSelect id={id} label={label} options={maritalStatuses} error={error} />
)

export const TableInvalidSelect = ({ id, label, error }) => (
  <TableSelect id={id} label={label} options={invalidGroups} error={error} />
)
