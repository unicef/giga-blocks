import { ArrowUpRight, Location } from '@carbon/icons-react';

const Header = ({ schoolData }) => {
  const { name, level, location, fontColor } = schoolData;
  console.log('SchoolHeader Props:', { name, level, location, fontColor });
  return (
    <div className="school-details__header">
      <div className="school-details__info">
        <h1 className="school-details__title">{name}</h1>
        <p className="school-details__level">{level}</p>
        <div className="school-details__location">
          <Location size={16} /> {location}
          <a
            href="#"
            className="school-details__map-link"
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
