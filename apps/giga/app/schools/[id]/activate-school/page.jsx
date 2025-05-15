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
import { useAccount } from 'wagmi';
import { setTimeout } from 'timers';
import { getGasPrice } from '../../../utils/gasFee';

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

  const contractAddress = process.env.NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS;
  const escrowAddress = process.env.NEXT_PUBLIC_GIGA_SCHOOL_ESCROW_ADDRESS;

  const { fontColor, cardColor, bgColor, selectedThemeName, themeId } =
    useThemeStore();

  const { data } = useSchoolDetails(id);
  const { data: themeData, isLoading: themeLoading } =
    useSchoolThemeGet(themeFromParams);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchGasFee = async () => {
      const gasFee = await getGasPrice();
      setGasFee(gasFee);

      const timeoutId = setTimeout(() => {
        setGasFee(gasFee);
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
      contractAddress,
      activationDetails,
      onComplete: () => setIsModalOpen(true),
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  return (
    <>
      <div className="container">
        <div className="backButton">
          <span onClick={handleBack} className="backLink">
            <ArrowLeft size={20} />
            <span>Back</span>
          </span>
        </div>

        <div className="content">
          <div className="formSection">
            <h1 className="title">Activate School</h1>
            <p className="subtitle">
              Click a theme below to preview and select it for the activated
              school view.
            </p>

            {linkActivation ? (
              <NonPayingUser
                email={email}
                setEmail={setEmail}
                linkActivation={linkActivation}
                themeName={selectedThemeName}
                themeId={themeId}
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
              />
            )}
          </div>

          <div className="previewSection">
            <div className="previewCard">
              <h2 className="schoolName">{data?.name}</h2>
              <p className="schoolLevel">{data?.school_type}</p>
              <div className="locationRow">
                <span className="locationIcon">
                  <Location />
                </span>
                <span>{data?.region_name}</span>
              </div>

              <div className="themeRow">
                <span className="themeLabel">Selected Theme:</span>
                <div className="school-details__themes">
                  <div className="school-details__theme-option">
                    {selectedThemeName ? (
                      <>
                        <div
                          className="school-details__theme-color"
                          style={{ backgroundColor: bgColor }}
                        />
                        <div
                          className="school-details__theme-color"
                          style={{ backgroundColor: cardColor }}
                        />
                        <div
                          className="school-details__theme-color"
                          style={{ backgroundColor: fontColor }}
                        />
                      </>
                    ) : (
                      <p>Please select theme to activate school. </p>
                    )}
                  </div>
                </div>
              </div>

              {!linkActivation && (
                <div className="totalSection">
                  <div className="totalLabel">Grand Total</div>
                  <div className="totalAmount">{total} Eth</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ActivationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
