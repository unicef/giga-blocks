import {
  Flag,
  Flash,
  Map,
  ScisControlTower,
  Misuse,
} from '@carbon/icons-react';
import { Table, TableBody, TableCell, TableRow } from '@carbon/react';

const SchoolOverview = ({
  updatedAt,
  fontColor,
  cardColor,
  coverage_availability,
  electricity_available,
  region_name,
  longitude,
  latitude,
  gigaMapsData,
}) => {
  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const excludedKeys = new Set([
    'admin1',
    'admin1_id_giga',
    'admin2',
    'admin2_id_giga',
    'education_level',
    'electricity_availability',
    'school_id_giga',
    'school_id_govt',
    'school_location_ingestion_timestamp',
    'school_name',
    'signature',
  ]);

  const additionalDetails = Object.entries(gigaMapsData || {})
    .filter(([key, value]) => !excludedKeys.has(key) && value !== null)
    .map(([key, value]) => ({
      id: key,
      key: formatKey(key),
      value: value !== null && value !== undefined ? value : 'N/A',
    }));

  const overviewData = [
    {
      label: 'Country',
      icon: <Flag size={20} />,
      value: region_name,
    },
    {
      label: 'Coverage Availability',
      icon: <ScisControlTower size={20} />,
      value: coverage_availability ? coverage_availability : <Misuse />,
    },
    {
      label: 'Electricity',
      icon: <Flash size={20} />,
      value: electricity_available ? electricity_available : <Misuse />,
    },
    {
      label: 'Longitude',
      icon: <Map size={20} />,
      value: longitude?.toFixed(10),
    },
    {
      label: 'Latitude',
      icon: <Map size={20} />,
      value: latitude?.toFixed(10),
    },
  ].filter(({ value }) => value !== 'N/A'); // Exclude "N/A" from overview

  return (
    <div className="school-details__overview">
      <div className="school-details__overview-header">
        <h3 className="school-details__section-title">School Overview</h3>
        <div className="school-details__data-source">
          Last Updated: {new Date(updatedAt).toLocaleDateString()}
        </div>
      </div>
      <p className="school-details__last-updated">
        Data Source: NIC.br, Government
      </p>

      {/* Render only if there's valid data */}
      {overviewData.length > 0 && (
        <div className="school-details__overview-cards">
          {overviewData.map(({ label, icon, value }) => (
            <div
              key={label}
              className="school-details__overview-card"
              style={{ backgroundColor: cardColor, borderColor: fontColor }}
            >
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
      )}

      {/* Render additional details only if available */}
      {additionalDetails.length > 0 && (
        <div
          className="school-details__additional"
          style={{ backgroundColor: cardColor, borderColor: fontColor }}
        >
          <Table>
            <TableBody
              style={{ backgroundColor: cardColor, borderColor: fontColor }}
            >
              {additionalDetails.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.key}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SchoolOverview;
