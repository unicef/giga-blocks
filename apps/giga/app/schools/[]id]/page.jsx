'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Location,
  CheckmarkFilled,
  Information,
  User,
  UserFollow,
  Laptop,
  WatsonHealthCrossReference,
  Flash,
  Education,
  MeterAlt,
} from '@carbon/icons-react';
import { Button, Table, TableRow, TableBody, TableCell } from '@carbon/react';
import './_schoolDetails.scss';

export default function SchoolDetails({ params }) {
  const { id } = params;
  const [selectedTab, setSelectedTab] = useState('weekly');
  const [selectedTheme, setSelectedTheme] = useState('white');

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
    { id: 'purple', colors: ['#FBECFE', '#e56cff', '#c400ff'] },
    { id: 'blue', colors: ['#c8e4ff', '#6cb6ff', '#0078ff'] },
    { id: 'green', colors: ['#c8ffdc', '#6cffad', '#00ff73'] },
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

  const fontColor =
    themeOptions.find((theme) => theme.id === selectedTheme)?.colors[2] ||
    '#000';

  const bgColor =
    themeOptions.find((theme) => theme.id === selectedTheme)?.colors[0] ||
    '#fff';

  return (
    <div className="school-details">
      <div
        className="school-details__container"
        style={{
          background: bgColor,
        }}
      >
        <Link href="/schools" className="school-details__back">
          <ArrowLeft size={20} /> Back
        </Link>

        <div className="school-details__content">
          <div className="school-details__main">
            <div className="school-details__header">
              <div className="school-details__info">
                <h1 className="school-details__title">{schoolData.name}</h1>
                <p className="school-details__level">{schoolData.level}</p>
                <div className="school-details__location">
                  <Location size={16} /> {schoolData.location}
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

              <Button
                href={`${id}/activate-school`}
                className="school-details__activate-btn"
              >
                Activate <ArrowLeft className="rotate-180" size={16} />
              </Button>
            </div>

            <div className="school-details__stats">
              <div className="school-details__stat-cards">
                <div className="school-details__stat-card">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <h4 className="school-details__stat-title">
                      Connectivity Status
                    </h4>
                    <div className="school-details__stat-icon connectivity">
                      <CheckmarkFilled color={fontColor} size={24} />
                    </div>
                  </div>
                </div>

                <div className="school-details__stat-card">
                  <div className="school-details__stat-header">
                    <div className="school-details__stat-icon download">
                      <MeterAlt size={16} />
                    </div>
                    <h4 className="school-details__stat-title">
                      Average Download Speed
                    </h4>
                  </div>
                  <div className="school-details__stat-value">
                    <span
                      className="school-details__stat-number"
                      style={{ color: fontColor }}
                    >
                      {schoolData.downloadSpeed} Mbps
                    </span>
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
                <div className="school-details__data-source">
                  Last Updated: {schoolData.lastUpdated}
                </div>
              </div>
              <p className="school-details__last-updated">
                Data Source: NIC.br, Government
              </p>

              <div className="school-details__overview-cards">
                {/* Students Card */}
                <div className="school-details__overview-card">
                  <div className="school-details__overview-label">
                    <User size={20} /> Students
                  </div>
                  <div
                    className="school-details__overview-value"
                    style={{ color: fontColor }}
                  >
                    {schoolData.students.toLocaleString()}
                  </div>
                </div>

                {/* Teachers Card */}
                <div className="school-details__overview-card">
                  <div className="school-details__overview-label">
                    <UserFollow size={20} /> Teachers
                  </div>
                  <div
                    className="school-details__overview-value"
                    style={{ color: fontColor }}
                  >
                    {schoolData.teachers}
                  </div>
                </div>

                {/* Computers Card */}
                <div className="school-details__overview-card">
                  <div className="school-details__overview-label">
                    <Laptop size={20} /> Computers
                  </div>
                  <div
                    className="school-details__overview-value"
                    style={{ color: fontColor }}
                  >
                    {schoolData.computers}
                  </div>
                </div>

                {/* Water Card */}
                <div className="school-details__overview-card">
                  <div className="school-details__overview-label">
                    <WatsonHealthCrossReference size={20} /> Water
                  </div>
                  <div
                    className="school-details__overview-value checkmark"
                    style={{ color: fontColor }}
                  >
                    {schoolData.hasWater && <CheckmarkFilled size={24} />}
                  </div>
                </div>

                {/* Electricity Card */}
                <div className="school-details__overview-card">
                  <div className="school-details__overview-label">
                    <Flash size={20} /> Electricity
                  </div>
                  <div
                    className="school-details__overview-value checkmark"
                    style={{ color: fontColor }}
                  >
                    {schoolData.hasElectricity && <CheckmarkFilled size={24} />}
                  </div>
                </div>

                {/* Computer Lab Card */}
                <div className="school-details__overview-card">
                  <div className="school-details__overview-label">
                    <Education size={20} /> Computer Lab
                  </div>
                  <div
                    className="school-details__overview-value checkmark"
                    style={{ color: fontColor }}
                  >
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
