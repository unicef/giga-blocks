'use client';
import { Button, Modal } from '@carbon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import SchoolSearch from '../../../components/schoolSearch/schoolSearch/SchoolSearch';
import { useGetActiveSchool } from '../../hooks/useActivation';

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
    route.push('/schools');
    setShowExpiredModal(false);
  };

  return (
    <>
      <SchoolSearch linkActivation={linkActivation} />

      {showExpiredModal && (
        <Modal
          open={showExpiredModal}
          modalHeading=""
          passiveModal
          className="activationModal"
        >
          <div className="activationModalContent">
            <div className="activationHeader">
              <h2 className="activationTitle">School Not Activated Yet !!!</h2>
              <p className="activationMessage">
                School has not been activated yet.
              </p>
            </div>

            <Button className="visitButton" onClick={handleModal}>
              Submit
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
export default SchoolSearchPage;
