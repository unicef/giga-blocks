'use client';
import { Button, Modal } from '@carbon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import SchoolSearch from '../../../components/schoolSearch/schoolSearch/SchoolSearch';
import { useGetActiveSchool } from '../../hooks/useActivation';
import './_schoolList.scss';
import CardSkeleton from '../../../components/cardSkeleton/CardSkeleton';

const SchoolSearchPage = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  const linkActivation = searchParams.get('linkActivation');

  const { data, isLoading } = useGetActiveSchool(linkActivation ?? undefined);

  const [showExpiredModal, setShowExpiredModal] = useState(false);
  useEffect(() => {
    if (!linkActivation) return;
    if (!isLoading && !data) {
      setShowExpiredModal(true);
    }
  }, [isLoading, data, linkActivation]);

  const handleModal = () => {
    route.push('/schools/list');
    setShowExpiredModal(false);
  };

  return (
    <>
      {/* <SchoolSearch linkActivation={linkActivation} /> */}

      {showExpiredModal ? (
        <>
          <CardSkeleton count={4} />
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
              <span onClick={() => (window.location.href = '/schools/list')}>
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
        </>
      ) : (
        <SchoolSearch linkActivation={linkActivation} />
      )}
    </>
  );
};
export default SchoolSearchPage;
