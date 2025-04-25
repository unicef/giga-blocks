'use client';

import { useEffect, useState } from 'react';
import { Location, ArrowLeft } from '@carbon/icons-react';
import Link from 'next/link';
import NonPayingUser from '../../../../components/schoolActivate/NonPayingUser';
import PayingUser from '../../../../components/schoolActivate/PayingUser';
import ActivationModal from '../../../../components/schoolActivate/ActivationModal';
import './_activate.scss';
import '../_schoolDetails.scss';
import { useParams, useSearchParams } from 'next/navigation';
import {  useSchoolDetails } from '../../../hooks/useSchool';
import { useSchoolThemeGet } from '../../../hooks/useTheme';
import { useThemeStore } from '../../../store/themeStore';
import { useGigaBuyNft } from '../../../hooks/useContract/giga-contracts';
import { useAccount } from 'wagmi';
import { setTimeout } from 'timers';
import { getGasPrice } from '../../../utils/gasFee';

export default function ActivateSchool() {
  const { id } = useParams();
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

  const contractAddress = process.env.NEXT_PUBLIC_GIGA_NFT_CONTRACT_ADDRESS

  const { fontColor, bgColor, selectedThemeName, themeId } = useThemeStore();

  const { data } = useSchoolDetails(id);
  const { data: themeData, isLoading: themeLoading } =
    useSchoolThemeGet(themeFromParams);
  
  useEffect(async( )=>{
    const gasFee = await getGasPrice();
    setGasFee(gasFee);
    setTimeout(() => {
      setGasFee(gasFee);
    }
    , 1000);
    
  },[])

  useEffect(() => {
    if (themeFromParams && themeData?.colorScheme) {
      const { fontColor, bgColor } = themeData.colorScheme;
      useThemeStore
        .getState()
        .setTheme(fontColor, bgColor, themeFromParams, themeData?.id);
    }
  }, [themeFromParams, themeData]);

  const schoolData = [
    data?.name,
    data?.school_type,
    data?.country,
    data?.longitude,
    data?.latitude,
    data?.connectivity,
    data?.coverage_availabitlity,
    data?.electricity_availabilty,
    data?.region_name,
  ];

  const mintSchool = useGigaBuyNft();

  const handleActivate = async () => {
    const args = [data?.giga_school_id, address, address, schoolData];
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
    });
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotal = () => {
    const base = parseFloat(baseFee) || 0;
    const gas = parseFloat(gasFee) || 0;
    const donate = parseFloat(donation) || 0;
    const totalValue = (base + gas + donate);
    setTotal(totalValue);
    return total;
  };

  useEffect(() => {
    calculateTotal();
  }, [baseFee, gasFee, donation]);

  return (
    <div className="container">
      <div className="backButton">
        <Link href="/" className="backLink">
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
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
                        style={{ backgroundColor: fontColor }}
                      />
                    </>
                  ) : (
                    <p>Theme Not Selected</p>
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

      <ActivationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
