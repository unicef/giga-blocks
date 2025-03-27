import { Information } from '@carbon/icons-react';

const Sidebar = () => {
  return (
    <div className="school-details__sidebar">
      <div className="school-details__image-placeholder">
        <Information size={24} />
        <p>
          This school is not activated. Activate this school to generate a
          unique image.
        </p>
      </div>
    </div>
  );
};
export default Sidebar;
