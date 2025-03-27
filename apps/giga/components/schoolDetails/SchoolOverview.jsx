import {
  CheckmarkFilled,
  Education,
  Flash,
  Laptop,
  User,
  UserFollow,
  WatsonHealthCrossReference,
} from '@carbon/icons-react';
import { Table, TableBody, TableCell, TableRow } from '@carbon/react';

const SchoolOverview = ({ schoolData, additionalDetails, fontColor }) => {
  return (
    <div className="school-details__overview">
      <div className="school-details__overview-header">
        <h3 className="school-details__section-title">School Overview</h3>
        <div className="school-details__data-source">
          Last Updated: {schoolData.lastUpdated}
        </div>
      </div>
      <p className="school-details__last-updated">
        Data Source: NIC.br, Government
      </p>

      <div className="school-details__overview-cards">
        {[
          {
            label: 'Students',
            icon: <User size={20} />,
            value: schoolData.students.toLocaleString(),
          },
          {
            label: 'Teachers',
            icon: <UserFollow size={20} />,
            value: schoolData.teachers,
          },
          {
            label: 'Computers',
            icon: <Laptop size={20} />,
            value: schoolData.computers,
          },
          {
            label: 'Water',
            icon: <WatsonHealthCrossReference size={20} />,
            value: schoolData.hasWater && <CheckmarkFilled size={24} />,
          },
          {
            label: 'Electricity',
            icon: <Flash size={20} />,
            value: schoolData.hasElectricity && <CheckmarkFilled size={24} />,
          },
          {
            label: 'Computer Lab',
            icon: <Education size={20} />,
            value: schoolData.hasComputerLab && <CheckmarkFilled size={24} />,
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
