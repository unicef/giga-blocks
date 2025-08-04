'use client';

import { ArrowLeft } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import Header from '../../../components/schoolDetails/SchoolHeader';
import SchoolOverview from '../../../components/schoolDetails/SchoolOverview';
import SchoolStats from '../../../components/schoolDetails/SchoolStats';
import ThemeSelector from '../../../components/schoolDetails/SchoolThemes';
import Sidebar from '../../../components/schoolDetails/Sidebar';
import DetailsLoading from '../../../components/detailsLoading/DetailsLoading';
import { useSchoolDetails } from '../../hooks/useSchool';
import { useGetAuthRequest } from '../../hooks/useCIW';
import './_schoolDetails.scss';
import { useThemeToggleStore } from '../../store/themeToggleStore';
import { useThemeStore } from '../../store/themeStore';
import { useSearchParams } from 'next/navigation';
import { useThemeGet } from '../../hooks/useTheme';
import { useReadNftContentSchoolIdToTokenId } from '../../hooks/useContract/nftContent';
import { useReadNftOwnerOf } from '../../hooks/useContract/gigaNft';
import { useRouter } from 'next/navigation';
import { InlineNotification } from '@carbon/react';
import countryList from '../../data/country.json';
import QRCodeModal from '../../../components/schoolDetails/qrCode';

export default function SchoolDetailsClient({ params }) {
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading } = useSchoolDetails(id);
  const { giga_maps_data, theme, minted } = data || {};
  const { data: themeOptions, isLoading: themeLoading } = useThemeGet();
  const [notification, setNotification] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [universalLink, setUniversalLink] = useState('');
  const [isVerfierDisabled, setIsVerifierDisabled] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_WEB_NAME;

  const isMinted = minted === 'MINTED';
  const isVisibleForMinted = useThemeToggleStore(
    (state) => state.isVisibleForMinted
  );
  const [selectedTheme, setSelectedTheme] = useState('');
  const defaultFontColor = '#000';
  const defaultBgColor = '#fff';
  const defaultCardColor = '#EBEBEB';
  const nftContentAddress = process.env.NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS;
  const collectorNftAddress =
    process.env.NEXT_PUBLIC_GIGA_COLLECTOR_NFT_ADDRESS;

  useEffect(() => {
    if (!data) return;
    const countryName = countryList.find(
      (c) => c.code === data?.country
    )?.country;
    setCountryName(countryName);

    useThemeStore.getState().resetTheme();
    const { colorScheme } = data.theme || {};
    const fontColor = colorScheme?.fontColor || defaultFontColor;
    const cardColor = colorScheme?.cardColor || defaultCardColor;
    const bgColor = colorScheme?.bgColor || defaultBgColor;

    useThemeStore.getState().setTheme(fontColor, cardColor, bgColor);
  }, [data]);

  const themeStore = useThemeStore();

  const handleBack = () => {
    router.back();
  };

  const onCloseNotification = () => {
    setNotification(null);
  };

  const showNotification = (kind, title, subtitle) => {
    setNotification({ kind, title, subtitle });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const { data: tokenId, isLoading: isTokenLoading } =
    useReadNftContentSchoolIdToTokenId({
      address: nftContentAddress,
      args: data?.giga_school_id ? [data?.giga_school_id] : undefined,
      query: {
        enabled: !!data?.giga_school_id,
      },
    });
  const { data: owner } = useReadNftOwnerOf({
    address: collectorNftAddress,
    args: tokenId ? [Number(tokenId)] : undefined,
    query: {
      enabled: !!tokenId && !isTokenLoading,
    },
  });

  const hasCustomTheme = Boolean(
    themeStore.fontColor && themeStore.cardColor && themeStore.bgColor
  );
  const linkActivation = searchParams.get('linkActivation');

  const fontColor = hasCustomTheme
    ? themeStore.fontColor
    : isMinted
    ? theme?.colorScheme?.fontColor
    : themeOptions?.find((t) => t.name === selectedTheme)?.colorScheme
        .fontColor;

  const cardColor = hasCustomTheme
    ? themeStore.cardColor
    : isMinted
    ? theme?.colorScheme?.cardColor
    : themeOptions?.find((t) => t.name === selectedTheme)?.colorScheme
        .cardColor;

  const bgColor = hasCustomTheme
    ? themeStore.bgColor
    : isMinted
    ? theme?.colorScheme?.bgColor
    : themeOptions?.find((t) => t.name === selectedTheme)?.colorScheme.bgColor;

  const [minLoaderDone, setMinLoaderDone] = useState(false);

  const { data: authRequest } = useGetAuthRequest(id);

  const handleCIWClick = () => {
    const qrValue = JSON.stringify(authRequest?.request);
    setQrCodeValue(qrValue);
    setUniversalLink(
      `https://wallet.privado.id#i_m=${authRequest?.universalLink}&back_url=${baseUrl}/schools/${id}&finish_url=${baseUrl}/schools/${id}`
    );
    setIsQRCodeModalOpen(true);
  };

  useEffect(() => {
    if (!authRequest?.request) setIsVerifierDisabled(true);
    else setIsVerifierDisabled(false);
  }, [authRequest]);

  useEffect(() => {
    setMinLoaderDone(false);
    const timer = setTimeout(() => setMinLoaderDone(true), 1200);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading || !data || !minLoaderDone) return <DetailsLoading />;

  return (
    <>
      {notification && (
        <InlineNotification
          aria-label="closes notification"
          kind={notification.kind}
          onClose={onCloseNotification}
          title={notification.title}
          subtitle={notification.subtitle}
          style={{
            position: 'fixed',
            top: '60px',
            right: '2px',
            width: '400px',
            zIndex: 1000,
          }}
        />
      )}
      <div className="school-details">
        <div className="school-details__container">
          <p onClick={handleBack} className="school-details__back">
            <ArrowLeft size={20} /> Back
          </p>

          {(minted === 'NOTMINTED' || isVisibleForMinted) && (
            <ThemeSelector
              themeOptions={themeOptions}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              id={id}
              linkActivation={linkActivation}
              loading={themeLoading}
              showNotification={showNotification}
              SchoolName={data?.name}
              country_name={countryName}
            />
          )}
          <div className="school-details__content">
            <div className="school-details__main">
              <Header
                name={data?.name}
                school_type={data?.school_type}
                country_name={countryName}
                locationId={data?.locationId}
                countryCode={data?.countryCode}
                fontColor={fontColor}
              />
              <SchoolStats
                bgColor={bgColor}
                cardColor={cardColor}
                fontColor={fontColor}
                connectivity={data?.connectivity}
                connectionType={data?.giga_maps_data?.connectivity_type}
                giga_school_id={data?.giga_school_id}
              />
              <SchoolOverview
                updatedAt={data?.updatedAt}
                connectivity={data?.connectivity}
                coverage_availability={data?.coverage_availability}
                electricity_available={data?.electricity_available}
                country_name={countryName}
                longitude={data?.longitude}
                latitude={data?.latitude}
                gigaMapsData={giga_maps_data}
                dataSource={data?.data_Source}
                fontColor={fontColor}
                cardColor={cardColor}
                bgColor={bgColor}
              />
            </div>
            <Sidebar
              fontColor={fontColor}
              bgColor={bgColor}
              cardColor={cardColor}
              minted={minted}
              owner={owner}
              imageHash={data?.imageHash}
              id={id}
              schoolName={data?.name}
              handleCIWClick={handleCIWClick}
              isVerfierDisabled={isVerfierDisabled}
              verifiedCIW={data?.verifiedCIW}
            />
          </div>
        </div>
      </div>

      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
        value={qrCodeValue}
        universalLink={universalLink}
      />
    </>
  );
}
