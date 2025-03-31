import { ArrowUpRight, Location } from '@carbon/icons-react';

const Header = ({
  name,
  school_type,
  region_name,
  longitude,
  latitude,
  fontColor,
}) => {
  return (
    <div className="school-details__header">
      <div className="school-details__info">
        <h1 className="school-details__title">{name}</h1>
        <p className="school-details__level">
          {school_type && 'Not Available'}
        </p>
        <div className="school-details__location">
          <Location size={16} /> {region_name}
          <a
            href={`https://maps.google.com/?q=${latitude},${longitude}`}
            className="school-details__map-link"
            target="_blank"
            style={{ color: fontColor }}
          >
            Locate on map <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Header;
