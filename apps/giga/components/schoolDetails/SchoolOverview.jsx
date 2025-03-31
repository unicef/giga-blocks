import { Flag, Flash, Map, ScisControlTower } from '@carbon/icons-react';
import { Table, TableBody, TableCell, TableRow } from '@carbon/react';

const SchoolOverview = ({
  updatedAt,
  additionalDetails,
  fontColor,
  coverage_availability,
  electricity_available,
  region_name,
  longitude,
  latitude,
}) => {
  return (
    <div className="school-details__overview">
      <div className="school-details__overview-header">
        <h3 className="school-details__section-title">School Overview</h3>
        <div className="school-details__data-source">
          Last Updated: {new Date(updatedAt).toISOString().split('T')[0]}
        </div>
      </div>
      <p className="school-details__last-updated">
        Data Source: NIC.br, Government
      </p>

      <div className="school-details__overview-cards">
        {[
          {
            label: 'Coverage Availability',
            icon: <ScisControlTower size={20} />,
            value: coverage_availability ? coverage_availability : 'N/A',
          },
          {
            label: 'Electricity',
            icon: <Flash size={20} />,
            value: electricity_available ? electricity_available : 'N/A',
          },
          {
            label: 'Country',
            icon: <Flag size={20} />,
            value: region_name,
          },
          {
            label: 'Longitude',
            icon: <Map size={20} />,
            value: longitude,
          },
          {
            label: 'Latitude',
            icon: <Map size={20} />,
            value: latitude,
          },
        ].map(({ label, icon, value }) => (
          <div key={label} className="school-details__overview-card">
            <div className="school-details__overview-label">
              {icon} {label}
            </div>
            <div
              className="school-details__overview-value"
              style={{ color: fontColor }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="school-details__additional">
        <Table>
          <TableBody>
            {additionalDetails.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.key}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SchoolOverview;
