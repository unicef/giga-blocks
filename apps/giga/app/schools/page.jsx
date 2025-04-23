'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetActiveSchool } from '../../app/hooks/useActivation';
import SchoolHeader from '../../components/schoolSearch/header/header';
import SchoolSearch from '../../components/schoolSearch/schoolSearch/SchoolSearch';
import { Button, Modal } from '@carbon/react';

export default function SchoolPage() {
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
    <div>
      <SchoolHeader />
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
    </div>
  );
}
