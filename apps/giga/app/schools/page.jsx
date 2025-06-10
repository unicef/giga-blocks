'use client';
import { Button, Modal } from '@carbon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetActiveSchool } from '../../app/hooks/useActivation';
import SchoolHeader from '../../components/schoolSearch/header/header';
import SchoolInfo from '../../components/schoolSearch/schoolInfo/SchoolInfo';
import './list/_schoolList.scss';
import { useMetrics } from '../hooks/useMetrics';

export default function SchoolPage() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const linkActivation = searchParams.get('linkActivation');
  const { data, isLoading } = useGetActiveSchool(linkActivation ?? undefined);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const { data: metricsData, isLoading: metricsLoading } = useMetrics();

  useEffect(() => {
    if (!linkActivation) return;
    if (!isLoading && !data) {
      setShowExpiredModal(true);
    }
  }, [isLoading, data, linkActivation]);

  const handleModal = () => {
    route.push('/schools');
    setShowExpiredModal(false);
  };

  return (
    <div>
      <SchoolHeader metrics={metricsData} metricsLoading ={metricsLoading} />
      <SchoolInfo />

      {showExpiredModal && (
        <Modal
          open={showExpiredModal}
          passiveModal
          size="sm"
          className="dashboard-modal"
          onRequestClose={handleModal}
        >
          <h3 className="dashboard-modal-activate-heading">
            Oops! This event link is no longer active.
          </h3>
          <p className="dashboard-modal-activate-description">
            Want to continue? 
            <span onClick={() => (window.location.href = 'schools/list')}>
              Browse the directory
            </span>
             or 
            <span
              onClick={() =>
                (window.location.href = 'https://giga.global/contact-us/')
              }
            >
              get in touch.
            </span>
          </p>
        </Modal>
      )}
    </div>
  )
}
