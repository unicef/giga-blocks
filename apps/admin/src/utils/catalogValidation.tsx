import * as Yup from 'yup';

// Reusable validation schema for non-negative numbers
const nonNegativeNumber = Yup.number().min(0, 'Must be a non-negative number');

const UpdateCatalogSchema = Yup.object().shape({
  name: Yup.string().required().test(
    'no-comma',
    'Name must not contain a comma',
    (value) => !value || !value.includes(',')
  ),
  country: Yup.string().required().matches(/^[a-zA-Z\s]+$/, 'Country must contain only alphabets and spaces'),
  continent: Yup.string().required().matches(
    /^[a-zA-Z\s]+$/,
    'Continent must contain only alphabets and spaces'
  ),
  year: Yup.number().required().typeError('Year must be a valid number'),
  type: Yup.string().required().matches(/^[a-zA-Z\s]+$/, 'Type must contain only alphabets and spaces'),
  resistance_ohm_km: nonNegativeNumber,
  reactance_ohm_km: nonNegativeNumber,
  rated_current_a: nonNegativeNumber,
  overload_p_u: nonNegativeNumber,
  voltage_kv: nonNegativeNumber,
  phases: nonNegativeNumber,
  min_failure_rate_failures_km_yr: nonNegativeNumber,
  av_failure_rate_failures_km_yr: nonNegativeNumber,
  max_failure_rate_failures_km_yr: nonNegativeNumber,
  overnight_cost_usd: nonNegativeNumber,
  predictive_maintenance_cost_usd_yr_km: nonNegativeNumber,
  corrective_maintenance_cost_usd_failure: nonNegativeNumber,
  capacity_kva: nonNegativeNumber,
  primary_voltage_kv: nonNegativeNumber,
  secondary_voltage_kv: nonNegativeNumber,
  no_load_losses_kw: nonNegativeNumber,
  lv_side_short_circuit_resistance_ohms: nonNegativeNumber,
  max_output_feeders: nonNegativeNumber,
  cost_per_output_feeder_usd: nonNegativeNumber,
  min_failure_rate_failures_yr: nonNegativeNumber,
  av_failure_rate_failures_yr: nonNegativeNumber,
  max_failure_rate_failures_yr: nonNegativeNumber,
  predictive_maintenance_cost_usd_yr: nonNegativeNumber,
  size_kw: nonNegativeNumber,
  gis_ratio: nonNegativeNumber,
  lifetime_yr: nonNegativeNumber,
  installation_costs_as_fraction_of_overnight_cost_p_u: nonNegativeNumber,
  annual_o_m_as_a_fraction_of_overnight_cost_p_u: nonNegativeNumber,
  annual_o_m_man_hours_hours_yr: nonNegativeNumber,
  annual_capacity_loss_p_u: nonNegativeNumber,
  size_kwh: nonNegativeNumber,
  lifetime_kwh: nonNegativeNumber,
  capacity_at_end_of_life_p_u: Yup.number()
    .min(0, 'Must be a non-negative number')
    .max(1, 'Must be less than or equal to 1'),
  soc_init_p_u: Yup.number()
    .min(0, 'Must be a non-negative number')
    .max(1, 'Must be less than or equal to 1'),
  soc_max_p_u: Yup.number()
    .min(0, 'Must be a non-negative number')
    .max(1, 'Must be less than or equal to 1'),
  soc_min_p_u: Yup.number()
    .min(0, 'Must be a non-negative number')
    .max(1, 'Must be less than or equal to 1'),
  efficiency_charge_and_discharge_p_u: Yup.number()
    .min(0, 'Must be a non-negative number')
    .max(1, 'Must be less than or equal to 1'),
  maximum_charge_current_a: nonNegativeNumber,
  maximum_discharge_current_a: nonNegativeNumber,
  nominal_voltage_v: nonNegativeNumber,
  alpha_c_a_a_h: nonNegativeNumber,
  c: nonNegativeNumber,
  k_1_hour: nonNegativeNumber,
  lifetime_hours: nonNegativeNumber,
  no_load_l_hour: nonNegativeNumber,
  startup_fuel_l: nonNegativeNumber,
  stop_time_hours: nonNegativeNumber,
  minimum_power_kw: nonNegativeNumber,
  one_2_load_l_kwh: nonNegativeNumber,
  one_4_load_l_kwh: nonNegativeNumber,
  start_time_hours: nonNegativeNumber,
  three_4_load_l_kwh: nonNegativeNumber,
  installation_costs_as_fraction_of_overnight_cost: nonNegativeNumber,
  inverter_efficiency_p_u: nonNegativeNumber,
  rectifier_efficiency_p_u: nonNegativeNumber,
  rectifier_capacity_inverter_capacity_ratio: nonNegativeNumber,
  installation_costs_as_fraction_of_overnight_c: nonNegativeNumber,
  annual_o_m_as_a_fraction_of_overnight_cost_p_: nonNegativeNumber,
  efficiency_p_u: nonNegativeNumber,
  parameter_value: nonNegativeNumber,
});

export default UpdateCatalogSchema;
