import {
  Flag,
  Flash,
  Map,
  ScisControlTower,
  Misuse,
  CheckmarkFilled,
} from '@carbon/icons-react';
import { Table, TableBody, TableCell, TableRow } from '@carbon/react';

const SchoolOverview = ({
  updatedAt,
  fontColor,
  cardColor,
  bgColor,
  coverage_availability,
  electricity_available,
  country_name,
  longitude,
  latitude,
  gigaMapsData,
  dataSource,
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
      value: country_name || '-',
    },
    {
      label: 'Coverage Availability',
      icon: <ScisControlTower size={20} />,
      value: coverage_availability ? <CheckmarkFilled /> : <Misuse />,
    },
    {
      label: 'Electricity',
      icon: <Flash size={20} />,
      value: electricity_available ? <CheckmarkFilled /> : <Misuse />,
    },
    {
      label: 'Longitude',
      icon: <Map size={20} />,
      value: longitude ? longitude?.toFixed(10) : '-',
    },
    {
      label: 'Latitude',
      icon: <Map size={20} />,
      value: latitude ? latitude?.toFixed(10) : '-',
    },
  ].filter(({ value }) => value !== 'N/A'); // Exclude "N/A" from overview

  return (
    <div className="school-details__overview">
      <div className="school-details__overview-header">
        <h3 className="school-details__section-title">School Overview</h3>
        <div className="school-details__data-source">
          Last Updated:{' '}
          {new Date(updatedAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </div>
      </div>
      <p className="school-details__last-updated">
        Data Source: {dataSource} ,{' '}
        <a href="https://www.mapbox.com/about/maps" target="_blank">
          Mapbox
        </a>{' '}
        ,{' '}
        <a href="https://www.openstreetmap.org/copyright" target="_blank">
          OpenStreetMap{' '}
        </a>
      </p>

      {/* Render only if there's valid data */}
      {overviewData.length > 0 && (
        <div className="school-details__overview-cards">
          {overviewData.map(({ label, icon, value }) => (
            <div
              key={label}
              className="school-details__overview-card"
              style={{ backgroundColor: bgColor, borderColor: cardColor }}
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
          style={{ backgroundColor: bgColor, borderColor: cardColor }}
        >
          <Table>
            <TableBody
              style={{ backgroundColor: bgColor, borderColor: cardColor }}
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
