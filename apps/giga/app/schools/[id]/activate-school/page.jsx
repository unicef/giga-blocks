'use client';

import { useEffect, useState } from 'react';
import { Location, ArrowLeft } from '@carbon/icons-react';
import Link from 'next/link';
import NonPayingUser from '../../../../components/schoolActivate/NonPayingUser';
import PayingUser from '../../../../components/schoolActivate/PayingUser';
import ActivationModal from '../../../../components/schoolActivate/ActivationModal';
import './_activate.scss';
import '../_schoolDetails.scss';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSchoolDetails } from '../../../hooks/useSchool';
import { useSchoolThemeGet } from '../../../hooks/useTheme';
import { useThemeStore } from '../../../store/themeStore';
import { useGigaBuyNft } from '../../../hooks/useContract/giga-contracts';
import { useAccount, useBalance } from 'wagmi';
import { setTimeout } from 'timers';
import { getGasPrice } from '../../../utils/gasFee';
import { InlineNotification } from '@carbon/react';
import CardSkeleton from '../../../../components/cardSkeleton/CardSkeleton';

export default function ActivateSchool() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeFromParams = searchParams.get('themeName');
  const linkActivation = searchParams.get('linkActivation');

  const [baseFee, setBaseFee] = useState('0.01');
  const [gasFee, setGasFee] = useState('00');
  const [donation, setDonation] = useState('');
  const [total, setTotal] = useState(
    Number.parseFloat(baseFee) + Number.parseFloat(gasFee)
  );
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const [gasFeeWei, setGasFeeWei] = useState('0');
  const { data: balance } = useBalance({ address });
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const contractAddress = process.env.NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS;
  const escrowAddress = process.env.NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS;

  const { fontColor, cardColor, bgColor, selectedThemeName, themeId } =
    useThemeStore();

  const { data, isLoading: dataLoading } = useSchoolDetails(id);

  const { data: themeData, isLoading: themeLoading } =
    useSchoolThemeGet(themeFromParams);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchGasFee = async () => {
      const { gasPriceInEth, gasPriceWei } = await getGasPrice();
      setGasFee(gasPriceInEth);
      setGasFeeWei(gasPriceWei);

      const timeoutId = setTimeout(() => {
        setGasFee(gasPriceInEth);
        setGasFeeWei(gasPriceWei);
      }, 1000);

      return () => clearTimeout(timeoutId);
    };

    fetchGasFee();
  }, []);

  useEffect(() => {
    if (themeFromParams && themeData?.colorScheme) {
      const { fontColor, cardColor, bgColor } = themeData.colorScheme;
      useThemeStore
        .getState()
        .setTheme(
          fontColor,
          cardColor,
          bgColor,
          themeFromParams,
          themeData?.id
        );
    }
  }, [themeFromParams, themeData]);

  const schoolData = [
    data?.name || '',
    data?.school_type || '',
    data?.country || '',
    data?.longitude?.toString() || '',
    data?.latitude?.toString() || '',
    data?.connectivity?.toString() || '',
    data?.coverage_availability?.toString() || '',
    data?.electricity_available?.toString() || '',
    data?.region_name || '',
  ];

  const mintSchool = useGigaBuyNft();

  const handleActivate = async () => {
    const args = [data?.giga_school_id, escrowAddress, address, schoolData];
    const activationDetails = {
      schoolId: data?.id,
      themeId,
      contributorData: {
        walletAddress: address,
      },
    };
    await mintSchool.mutateAsync({
      args,
      totalValue: total,
      gasFee: gasFeeWei,
      contractAddress,
      activationDetails,
      onComplete: () => setIsModalOpen(true),
      onError: (error) => {
        setShowError(true);
        setErrorMessage('An error occurred while activating the school.');
      },
    });
  };

  // Track if the user has manually closed the modal
  const [modalClosedByUser, setModalClosedByUser] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalClosedByUser(true);
  };

  const calculateTotal = () => {
    const base = parseFloat(baseFee) || 0;
    const gas = parseFloat(gasFee) || 0;
    const donate = parseFloat(donation) || 0;
    const totalValue = base + gas + donate;
    setTotal(totalValue);
    return total;
  };

  useEffect(() => {
    calculateTotal();
  }, [baseFee, gasFee, donation]);

  useEffect(() => {
    if (!data) return;
    if (
      (data?.minted === 'MINTED' || data?.minted === 'ISMINTING') &&
      !isModalOpen &&
      !modalClosedByUser
    ) {
      router.push(`/schools`);
    } else setLoader(false);
  }, [data, isModalOpen, modalClosedByUser, router, loader]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 2000); // 2 seconds
      return () => {
        clearTimeout(timer);
        router.push(`/schools/${id}`);
      };
    }
  }, [showError]);

  return (
    <>
      {!dataLoading && !loader ? (
        <>
          <div className="content">
            <div className="formSection">
              {showError && (
                <div
                  style={{
                    position: 'fixed',
                    top: 24,
                    right: 24,
                    zIndex: 9999,
                    minWidth: 320,
                    maxWidth: 400,
                  }}
                >
                  <InlineNotification
                    kind="error"
                    title="Error"
                    subtitle={errorMessage}
                    onClose={() => setShowError(false)}
                    lowContrast
                    style={{ marginTop: '16px', position: 'right' }}
                  />
                </div>
              )}
              {linkActivation ? (
                <NonPayingUser
                  email={email}
                  setEmail={setEmail}
                  linkActivation={linkActivation}
                  themeName={selectedThemeName}
                  themeId={themeId}
                  schoolName={data?.name}
                  selectedThemeName={selectedThemeName}
                  bgColor={bgColor}
                  cardColor={cardColor}
                  fontColor={fontColor}
                />
              ) : (
                <PayingUser
                  baseFee={baseFee}
                  gasFee={gasFee}
                  donation={donation}
                  setDonation={setDonation}
                  handleActivate={handleActivate}
                  isConnected={isConnected}
                  selectedThemeName={selectedThemeName}
                  bgColor={bgColor}
                  cardColor={cardColor}
                  fontColor={fontColor}
                  schoolName={data?.name}
                  gasFeeWei={gasFeeWei}
                  balance={balance}
                />
              )}
            </div>
          </div>
          <ActivationModal
            schoolName={data?.name}
            schoolLocation={data?.country}
            createdAt={data?.updatedAt}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </>
      ) : (
        <CardSkeleton count={3} />
      )}
    </>
  );
}
