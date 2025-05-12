'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../../../components/schoolDetails/SchoolHeader';
import SchoolOverview from '../../../components/schoolDetails/SchoolOverview';
import SchoolStats from '../../../components/schoolDetails/SchoolStats';
import ThemeSelector from '../../../components/schoolDetails/SchoolThemes';
import Sidebar from '../../../components/schoolDetails/Sidebar';
import DetailsLoading from '../../../components/detailsLoading/DetailsLoading';
import { useSchoolDetails } from '../../hooks/useSchool';
import './_schoolDetails.scss';
import { useThemeToggleStore } from '../../store/themeToggleStore';
import { useThemeStore } from '../../store/themeStore';
import { useSearchParams } from 'next/navigation';
import { useThemeGet } from '../../hooks/useTheme';
import { useReadNftContentSchoolIdToTokenId } from '../../hooks/useContract/nftContent';
import { useReadNftOwnerOf } from '../../hooks/useContract/gigaNft';

export default function SchoolDetails({ params }) {
  const { id } = params;
  const searchParams = useSearchParams();
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
  const nftContentAddress = process.env.NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS;
  const collectorNftAddress =
    process.env.NEXT_PUBLIC_GIGA_COLLECTOR_NFT_ADDRESS;

  useEffect(() => {
    if (!data) return;

    useThemeStore.getState().resetTheme();
    const { colorScheme } = data.theme || {};
    const fontColor = colorScheme?.fontColor || defaultFontColor;
    const cardColor = colorScheme?.cardColor || defaultCardColor;
    const bgColor = colorScheme?.bgColor || defaultBgColor;

    useThemeStore.getState().setTheme(fontColor, cardColor, bgColor);
  }, [data]);

  const themeStore = useThemeStore();

  const { data: tokenId, isLoading: isTokenLoading } =
    useReadNftContentSchoolIdToTokenId({
      address: nftContentAddress,
      args: data?.giga_school_id ? [data?.giga_school_id] : undefined,
      enabled: !!data?.giga_school_id,
    });
  const { data: owner } = useReadNftOwnerOf({
    address: collectorNftAddress,
    args: tokenId ? [Number(tokenId)] : undefined,
    enabled: !!tokenId,
  });

  const hasCustomTheme = Boolean(
    themeStore.fontColor && themeStore.cardColor && themeStore.bgColor
  );
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
            <SchoolStats
              cardColor={cardColor}
              fontColor={fontColor}
              weeklyData={weeklyData}
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
            owner={owner}
            imageHash={data?.imageHash}
          />
        </div>
      </div>
    </div>
  );
}
