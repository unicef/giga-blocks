'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../../../components/schoolDetails/SchoolHeader';
import SchoolOverview from '../../../components/schoolDetails/SchoolOverview';
import SchoolStats from '../../../components/schoolDetails/SchoolStats';
import ThemeSelector from '../../../components/schoolDetails/SchoolThemes';
import Sidebar from '../../../components/schoolDetails/Sidebar';
import { useSchoolDetails } from '../../hooks/useSchool';
import './_schoolDetails.scss';

export default function SchoolDetails({ params }) {
  const { id } = params;
  const { data, isLoading } = useSchoolDetails(id);
  console.log('data', data);

  const { giga_maps_data, theme, minted } = data || {};
  const isMinted = minted === 'MINTED';

  const [selectedTheme, setSelectedTheme] = useState('white');

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

  // Theme options for non-minted schools
  const themeOptions = [
    { id: 'purple', colors: ['#FBECFE', '#c400ff'] },
    { id: 'blue', colors: ['#c8e4ff', '#0078ff'] },
    { id: 'green', colors: ['#c8ffdc', '#00ff73'] },
  ];

  // Determine bgColor and fontColor
  const defaultFontColor = '#000';
  const defaultBgColor = '#fff';

  const fontColor = isMinted
    ? theme?.colorScheme?.fontColor || defaultFontColor
    : themeOptions.find((theme) => theme.id === selectedTheme)?.colors[1] ||
      defaultFontColor;

  const bgColor = isMinted
    ? theme?.colorScheme?.bgColor || defaultBgColor
    : themeOptions.find((theme) => theme.id === selectedTheme)?.colors[0] ||
      defaultBgColor;

  if (isLoading) return <h1>Loading....</h1>;

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
            <Header
              name={data.name}
              school_type={data.school_type}
              region_name={data.region_name}
              longitude={data.longitude}
              latitude={data.latitude}
              fontColor={fontColor}
            />

            {!isMinted && (
              <ThemeSelector
                themeOptions={themeOptions}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                id={id}
              />
            )}

            <SchoolStats fontColor={fontColor} weeklyData={weeklyData} />
            <SchoolOverview
              updatedAt={data.updatedAt}
              connectivity={data.connectivity}
              coverage_availability={data.coverage_availability}
              electricity_available={data.electricity_available}
              region_name={data.region_name}
              longitude={data.longitude}
              latitude={data.latitude}
              gigaMapsData={giga_maps_data}
              fontColor={fontColor}
            />
          </div>
          <Sidebar
            fontColor={fontColor}
            minted={minted}
            imageHash={data.imageHash}
          />
        </div>
      </div>
    </div>
  );
}
