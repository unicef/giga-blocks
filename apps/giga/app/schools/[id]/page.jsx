'use client';

import { ArrowLeft, CheckmarkFilled } from '@carbon/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../../../components/schoolDetails/SchoolHeader';
import SchoolOverview from '../../../components/schoolDetails/SchoolOverview';
import SchoolStats from '../../../components/schoolDetails/SchoolStats';
import ThemeSelector from '../../../components/schoolDetails/SchoolThemes';
import Sidebar from '../../../components/schoolDetails/Sidebar';
import './_schoolDetails.scss';

export default function SchoolDetails({ params }) {
  const { id } = params;
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
            <Header schoolData={schoolData} />

            <ThemeSelector
              themeOptions={themeOptions}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              id={id}
            />

            <SchoolStats
              schoolData={schoolData}
              fontColor={fontColor}
              weeklyData={weeklyData}
            />
            <SchoolOverview
              schoolData={schoolData}
              additionalDetails={additionalDetails}
              fontColor={fontColor}
            />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
