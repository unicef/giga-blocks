'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../../../../components/schoolDetails/SchoolHeader';
import SchoolOverview from '../../../../components/schoolDetails/SchoolOverview';
import SchoolStats from '../../../../components/schoolDetails/SchoolStats';
import ThemeSelector from '../../../../components/schoolDetails/SchoolThemes';
import Sidebar from '../../../../components/schoolDetails/Sidebar';
import { useSchoolDetails } from '../../../hooks/useSchool';
import './_schoolDetails.scss';
import { useThemeToggleStore } from '../../../store/themeToggleStore';
import { useThemeStore } from '../../../store/themeStore';
import { useSearchParams } from 'next/navigation';
import { useThemeGet } from '../../../hooks/useTheme';
import ClaimNFT from '../../../../components/ClaimNFT/ClaimNft';
import DetailsLoading from '../../../../components/detailsLoading/DetailsLoading';
import { useRouter } from 'next/navigation';

export default function SchoolDetails({ params }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, isLoading } = useSchoolDetails(id);
  const { giga_maps_data, theme, minted } = data || {};
  const { data: themeOptions, isLoading: themeLoading } = useThemeGet();
  const isMinted = minted === 'MINTED';
  const isVisibleForMinted = useThemeToggleStore(
    (state) => state.isVisibleForMinted
  );
  const [selectedTheme, setSelectedTheme] = useState('white');
  const defaultFontColor = '#000';
  const defaultBgColor = '#fff';
  const defaultCardColor = '#fff';

  useEffect(() => {
    useThemeStore.getState().resetTheme();

    if (!data) return;
    if (data.schoolClaimed === true) router.push(`/schools/${id}`);

    const { colorScheme } = data.theme || {};
    const fontColor = colorScheme?.fontColor || defaultFontColor;
    const cardColor = colorScheme?.cardColor || defaultCardColor;
    const bgColor = colorScheme?.bgColor || defaultBgColor;

    useThemeStore.getState().setTheme(fontColor, cardColor, bgColor);
  }, [data]);

  const themeStore = useThemeStore();
  const hasCustomTheme =
    !!themeStore.fontColor && !!themeStore.cardColor && !!themeStore.bgColor;
  const linkActivation = searchParams.get('linkActivation');

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

  const fontColor = hasCustomTheme
    ? themeStore.fontColor
    : isMinted
    ? theme?.colorScheme?.fontColor || '#000'
    : themeOptions?.find((t) => t.name === selectedTheme)?.colorScheme
        .fontColor || '#000';

  const cardColor = hasCustomTheme
    ? themeStore.cardColor
    : isMinted
    ? theme?.colorScheme?.cardColor || '#000'
    : themeOptions?.find((t) => t.name === selectedTheme)?.colorScheme
        .cardColor || '#000';

  const bgColor = hasCustomTheme
    ? themeStore.bgColor
    : isMinted
    ? theme?.colorScheme?.bgColor || '#fff'
    : themeOptions?.find((t) => t.name === selectedTheme)?.colorScheme
        .bgColor || '#fff';

  if (isLoading || !data) return <DetailsLoading />;
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
        <ClaimNFT />

        <div className="school-details__content">
          <div className="school-details__main">
            <Header
              name={data?.name}
              school_type={data?.school_type}
              region_name={data?.region_name}
              locationId={data?.locationId}
              countryCode={data?.countryCode}
              fontColor={fontColor}
            />

            {(minted === 'NOTMINTED' || isVisibleForMinted) && (
              <ThemeSelector
                themeOptions={themeOptions}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                id={id}
                linkActivation={linkActivation}
                loading={themeLoading}
              />
            )}

            <SchoolStats
              cardColor={cardColor}
              fontColor={fontColor}
              weeklyData={weeklyData}
              connectionType={data?.giga_maps_data?.connectivity_type}
              giga_school_id={data?.giga_school_id}
            />
            <SchoolOverview
              updatedAt={data?.updatedAt}
              connectivity={data?.connectivity}
              coverage_availability={data?.coverage_availability}
              electricity_available={data?.electricity_available}
              region_name={data?.region_name}
              longitude={data?.longitude}
              latitude={data?.latitude}
              gigaMapsData={giga_maps_data}
              fontColor={fontColor}
              cardColor={cardColor}
            />
          </div>
          <Sidebar
            fontColor={fontColor}
            minted={minted}
            imageHash={data?.imageHash}
            schoolName={data?.name}
          />
        </div>
      </div>
    </div>
  );
}
