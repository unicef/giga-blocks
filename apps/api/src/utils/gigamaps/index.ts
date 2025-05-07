import axios from 'axios';
import { ConfigService } from '@nestjs/config';

const getLocationId = async (giga_school_id: string, search_fields: string) => {
  const config = new ConfigService();
  console.log('giga_school_id', giga_school_id);
  console.log('search_fields', search_fields);
  const url = config.get('UNI_OOI_GIGA');
  try {
    const data = await axios.get(
        `${url}/?q=${giga_school_id}&search_fields=${search_fields}`
    );
    return data.data?.results[0];
  } catch (error) {
    console.log(error);
  }
};
export default getLocationId;
