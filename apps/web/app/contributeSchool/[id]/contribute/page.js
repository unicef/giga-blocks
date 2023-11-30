'use client';
import Contribution from '../../../components/contribute';
import { useSchoolDetails } from '../../../hooks/useSchool';
import { useParams } from 'next/navigation';
import { Modal, ModalBody, ModalFooter, Button } from '@carbon/react';

const Contribute = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const { data } = useSchoolDetails(id);

  return (
    <>
      <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
        <Contribution data={data} />;
      </Modal>
    </>
  );
};

export default Contribute;
