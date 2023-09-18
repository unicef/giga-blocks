interface FilterObject {
  name: string;
  countries: string;
  years: string;
  continents: string;
  capacity: string;
  primary_voltage: string;
  secondary_voltage: string;
  sub_voltage_level: string;
  sub_phases: string;
  rated_current: string;
  voltage: string;
  system: string;
  lines_voltage_level: string;
  lines_phases: string;
  solar_size: string;
  bess_size: string;
  genset_size: string;
  acdc_size: string;
  charge_size: string;

  // common naming for multiple fields
  voltage_level: string;
  phases: string;
  size: string;
}

const commonFilters = ['countries', 'continents', 'page', 'limit', 'years', 'name'];

const filters = {
  lines: [
    ...commonFilters,
    'rated_current',
    'voltage',
    'lines_voltage_level',
    'system',
    'lines_phases',
  ],
  substations: [
    ...commonFilters,
    'capacity',
    'primary_voltage',
    'secondary_voltage',
    'sub_voltage_level',
    'sub_phases',
  ],
  solar: [...commonFilters, 'solar_size'],
  bess: [...commonFilters, 'bess_size'],
  genset: [...commonFilters, 'genset_size'],
  acdc_converter: [...commonFilters, 'acdc_size'],
  charge_controller: [...commonFilters, 'charge_size'],
  other: [...commonFilters],
};

const commonKeysMapper = {
  lines_voltage_level: 'voltage_level',
  sub_voltage_level: 'voltage_level',
  lines_phases: 'phases',
  sub_phases: 'phases',
  solar_size: 'size',
  bess_size: 'size',
  genset_size: 'size',
  acdc_size: 'size',
  charge_size: 'size',
};

type PartialFilterQuery = Partial<FilterObject>;
type FilterQueryResult<T> = Omit<T, keyof FilterObject>;

export default function filterQuery<T extends FilterObject>(
  type: keyof typeof filters,
  query: PartialFilterQuery
): FilterQueryResult<T> {
  const allowedQueries = filters[type];
  if (!allowedQueries) {
    return query as FilterQueryResult<T>;
  }

  const filtered: PartialFilterQuery = {};
  Object.keys(query)?.map((key) => {
    if (allowedQueries.includes(key)) {
      let filterKey = key;
      if (commonKeysMapper[key]) filterKey = commonKeysMapper[key];
      filtered[filterKey] = query[key];
    }
    return null;
  });

  return filtered as FilterQueryResult<T>;
}
