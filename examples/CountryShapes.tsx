import {feature} from 'topojson-client';
import countries from './countries-50m.json';

export const COUNTRIES = feature(
  countries,
  countries.objects.countries,
).features;
