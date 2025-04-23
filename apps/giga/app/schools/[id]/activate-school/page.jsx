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
import { useSchoolDetails } from '../../../hooks/useSchool';
import { useSchoolThemeGet } from '../../../hooks/useTheme';
import { useThemeStore } from '../../../store/themeStore';

export default function ActivateSchool() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const themeFromParams = searchParams.get('themeName');
  const linkActivation = searchParams.get('linkActivation');

  const [baseFee, setBaseFee] = useState('0.01');
  const [gasFee, setGasFee] = useState('00');
  const [donation, setDonation] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fontColor, bgColor, selectedThemeName, setTheme } = useThemeStore();
  const { data } = useSchoolDetails(id);
  const { data: themeData, isLoading: themeLoading } =
    useSchoolThemeGet(themeFromParams);

  // Set theme colors if we have themeFromParams and the theme data loaded
  useEffect(() => {
    if (themeFromParams && themeData?.colorScheme) {
      const { fontColor, bgColor } = themeData.colorScheme;
      useThemeStore.getState().setTheme(fontColor, bgColor, themeFromParams);
    }
  }, [themeFromParams, themeData]);
  console.log('themeData', themeData);

  const handleActivate = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const calculateTotal = () => {
    const base = parseFloat(baseFee) || 0;
    const gas = parseFloat(gasFee) || 0;
    const donate = parseFloat(donation) || 0;
    return (base + gas + donate).toFixed(2);
  };
  // https://beta-giga.rumsan.net/api/v1/schools/theme/green
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
            />
          ) : (
            <PayingUser
              baseFee={baseFee}
              gasFee={gasFee}
              donation={donation}
              setDonation={setDonation}
              handleActivate={handleActivate}
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
                  <div
                    className="school-details__theme-color"
                    style={{ backgroundColor: bgColor }}
                  />
                  <div
                    className="school-details__theme-color"
                    style={{ backgroundColor: fontColor }}
                  />
                </div>
              </div>
            </div>

            {!linkActivation && (
              <div className="totalSection">
                <div className="totalLabel">Grand Total</div>
                <div className="totalAmount">{calculateTotal()} Eth</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ActivationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
