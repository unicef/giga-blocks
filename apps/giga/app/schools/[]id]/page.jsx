'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Location,
  CheckmarkFilled,
  Information,
  Download,
  User,
  UserFollow,
  Laptop,
  WatsonHealthCrossReference,
  Flash,
  Education,
} from '@carbon/icons-react';
import { Button, Table, TableRow, TableBody, TableCell } from '@carbon/react';
import './_schoolDetails.scss';

export default function SchoolDetails({ params }) {
  const { id } = params;
  const [selectedTab, setSelectedTab] = useState('weekly');
  const [selectedTheme, setSelectedTheme] = useState('purple');

  // Mock data for the school
  const schoolData = {
    id: id,
    name: 'Evergreen Academy for Advanced Scientific and Holistic Learning',
    level: 'Higher Secondary',
    location: 'USA',
    isActivated: false,
    connectivityStatus: true,
    downloadSpeed: 150,
    connectionType: 'ADSL',
    globalBenchmark: 20,
    students: 1000,
    teachers: 40,
    computers: 120,
    hasWater: true,
    hasElectricity: true,
    hasComputerLab: true,
    establishedYear: '2025 AD',
    fundingType: 'Private',
    maleTeachers: 50,
    femaleTeachers: 40,
    maleStudents: 1200,
    femaleStudents: 500,
    lastUpdated: '21 July, 2025',
  };

  // Mock data for the weekly chart
  const weeklyData = [
    { day: 'S', value: 120 },
    { day: 'M', value: 80 },
    { day: 'T', value: 100 },
    { day: 'W', value: 150 },
    { day: 'T', value: 110 },
    { day: 'F', value: 130 },
    { day: 'S', value: 120 },
  ];

  // Theme options
  const themeOptions = [
    { id: 'purple', colors: ['#f8c8ff', '#e56cff', '#c400ff', '#8400b3'] },
    { id: 'blue', colors: ['#c8e4ff', '#6cb6ff', '#0078ff', '#0046b3'] },
    { id: 'green', colors: ['#c8ffdc', '#6cffad', '#00ff73', '#00b351'] },
  ];

  // Additional details table rows
  const additionalDetails = [
    {
      id: '1',
      key: 'School Established Year',
      value: schoolData.establishedYear,
    },
    {
      id: '2',
      key: 'Electricity Availability',
      value: schoolData.hasElectricity ? <CheckmarkFilled /> : 'No',
    },
    { id: '3', key: 'School Funding Type', value: schoolData.fundingType },
    { id: '4', key: 'Male Teachers', value: schoolData.maleTeachers },
    { id: '5', key: 'Female Teachers', value: schoolData.femaleTeachers },
    { id: '6', key: 'Male Students', value: schoolData.maleStudents },
    { id: '7', key: 'Female Students', value: schoolData.femaleStudents },
  ];

  return (
    <div className="school-details">
      <div className="school-details__container">
        <Link href="/schools" className="school-details__back">
          <ArrowLeft size={20} /> Back
        </Link>

        <div className="school-details__header">
          <div className="school-details__info">
            <h1 className="school-details__title">{schoolData.name}</h1>
            <p className="school-details__level">{schoolData.level}</p>
            <div className="school-details__location">
              <Location size={16} /> {schoolData.location}
              <a href="#" className="school-details__map-link">
                Locate on map <ArrowLeft className="rotate-45" size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="school-details__content">
          <div className="school-details__main">
            <div className="school-details__theme-selector">
              <h3 className="school-details__section-title">Select Theme</h3>
              <p className="school-details__section-description">
                Click a theme below to preview and select it for the activated
                school view.
              </p>

              <div className="school-details__themes">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    className={`school-details__theme-option ${
                      selectedTheme === theme.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="school-details__theme-color"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </button>
                ))}
              </div>

              <p className="school-details__lorem">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>

              <Button className="school-details__activate-btn">
                Activate <ArrowLeft className="rotate-180" size={16} />
              </Button>
            </div>

            <div className="school-details__stats">
              <div className="school-details__stat-card">
                <div className="school-details__stat-header">
                  <div className="school-details__stat-icon connectivity">
                    <CheckmarkFilled size={16} />
                  </div>
                  <h4 className="school-details__stat-title">
                    Connectivity Status
                  </h4>
                </div>
              </div>

              <div className="school-details__stat-card">
                <div className="school-details__stat-header">
                  <div className="school-details__stat-icon download">
                    <Download size={16} />
                  </div>
                  <h4 className="school-details__stat-title">
                    Average Download Speed
                  </h4>
                </div>
                <div className="school-details__stat-value">
                  <span className="school-details__stat-number">
                    {schoolData.downloadSpeed} Mbps
                  </span>
                  <span className="school-details__stat-badge good">Good</span>
                </div>
                <div className="school-details__stat-detail">
                  <p>Connection Type</p>
                  <p>{schoolData.connectionType}</p>
                </div>
                <div className="school-details__stat-detail">
                  <p>Global Benchmark</p>
                  <p>{schoolData.globalBenchmark} Mbps</p>
                </div>
              </div>

              <div className="school-details__chart-card">
                <div className="school-details__chart-tabs">
                  <button
                    className={`school-details__chart-tab ${
                      selectedTab === 'weekly' ? 'active' : ''
                    }`}
                    onClick={() => setSelectedTab('weekly')}
                  >
                    Weekly
                  </button>
                  <button
                    className={`school-details__chart-tab ${
                      selectedTab === 'monthly' ? 'active' : ''
                    }`}
                    onClick={() => setSelectedTab('monthly')}
                  >
                    Monthly
                  </button>
                </div>

                <div className="school-details__chart-dates">
                  <button className="school-details__chart-nav" disabled>
                    «
                  </button>
                  <button className="school-details__chart-nav" disabled>
                    ‹
                  </button>
                  <span className="school-details__chart-date">
                    24 March, 2024 - 2 April 2024
                  </span>
                  <button className="school-details__chart-nav">›</button>
                  <button className="school-details__chart-nav">»</button>
                </div>

                <div className="school-details__chart">
                  {weeklyData.map((item, index) => (
                    <div
                      key={index}
                      className="school-details__chart-bar-container"
                    >
                      <div
                        className="school-details__chart-bar"
                        style={{ height: `${(item.value / 150) * 100}%` }}
                      />
                      <div className="school-details__chart-label">
                        {item.day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="school-details__overview">
              <div className="school-details__overview-header">
                <h3 className="school-details__section-title">
                  School Overview
                </h3>
                <p className="school-details__data-source">
                  Data Source: NIC.br, Government
                </p>
                <div className="school-details__last-updated">
                  <WatsonHealthCrossReference size={16} /> Last Updated:{' '}
                  {schoolData.lastUpdated}
                </div>
              </div>

              <div className="school-details__overview-cards">
                <div className="school-details__overview-card">
                  <User size={24} />
                  <h4 className="school-details__overview-label">Students</h4>
                  <p className="school-details__overview-value">
                    {schoolData.students.toLocaleString()}
                  </p>
                </div>

                <div className="school-details__overview-card">
                  <UserFollow size={24} />
                  <h4 className="school-details__overview-label">Teachers</h4>
                  <p className="school-details__overview-value">
                    {schoolData.teachers}
                  </p>
                </div>

                <div className="school-details__overview-card">
                  <Laptop size={24} />
                  <h4 className="school-details__overview-label">Computers</h4>
                  <p className="school-details__overview-value">
                    {schoolData.computers}
                  </p>
                </div>

                <div className="school-details__overview-card">
                  <WatsonHealthCrossReference size={24} />
                  <h4 className="school-details__overview-label">Water</h4>
                  <div className="school-details__overview-check">
                    {schoolData.hasWater && <CheckmarkFilled size={24} />}
                  </div>
                </div>

                <div className="school-details__overview-card">
                  <Flash size={24} />
                  <h4 className="school-details__overview-label">
                    Electricity
                  </h4>
                  <div className="school-details__overview-check">
                    {schoolData.hasElectricity && <CheckmarkFilled size={24} />}
                  </div>
                </div>

                <div className="school-details__overview-card">
                  <Education size={24} />
                  <h4 className="school-details__overview-label">
                    Computer Lab
                  </h4>
                  <div className="school-details__overview-check">
                    {schoolData.hasComputerLab && <CheckmarkFilled size={24} />}
                  </div>
                </div>
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
          </div>

          <div className="school-details__sidebar">
            <div className="school-details__image-placeholder">
              <Information size={24} />
              <p>
                This school is not activated. Activate this school to generate a
                unique image.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
