import { Grid, Column, Button } from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import { ArrowRight } from '@carbon/icons-react';
import './school-detail.scss';
import { toSvg } from 'jdenticon';
import { useEffect, useState } from 'react';
import { useSellerContract } from '../../hooks/useContract';
import NftPurchaseModal from '../../components/nftPurchaseModal';
import dynamic from 'next/dynamic';

dynamic(() => import('../../components/card/p5'), {
  ssr: false,
});

import { useWeb3React } from '@web3-react/core';
import generateIdenticon from '../../utils/generateIdenticon'

const Introduction = ({ schooldata, tokenId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account } = useWeb3React();
  const [onSell, setOnSell] = useState(false);
  const [price, setPrice] = useState(0);
  const sellerContract = useSellerContract();

  const fetchPrice = async () => {
    if (!sellerContract) return;

    try {
      const price = await sellerContract.methods.calculatePrice().call();
      setPrice(price);
    } catch (err) {
      console.log(err);
    }
  };

  const [isOwner, setIsOwner] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClick = () => {
    openModal();
  };

  useEffect(() => {
    if (
      schooldata?.owner?.toLowerCase() ===
      process.env.NEXT_PUBLIC_GIGA_ESCROW_ADDRESS?.toLowerCase()
    )
      setOnSell(true);
    else setOnSell(false);
    if (account && account.toLowerCase() === schooldata?.owner?.toLowerCase())
      setIsOwner(true);
  }, [schooldata?.owner, account]);

  useEffect(() => {
    const fetchData = async () => {
      if (!sellerContract) return;
  
      try {
        const price = await sellerContract.methods.calculatePrice().call();
        setPrice(price);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, [sellerContract]);

  return (
    <Grid
      fullWidth
      className="mt-50px"
      style={{ position: 'relative', left: '600px' }}
    >
      <Column md={4} lg={8} sm={4} className="p5Canvas" id="defaultCanvas0">
        {schooldata?.image && (
          <img
            src={`https://ipfs.io/ipfs/${schooldata?.image} || 'QmQ5MAbK8jwcZ1wpmhj99EqRJAXr7p7cHBfhnDz3gde4jy'}`}
            alt={schooldata?.image}
            style={{ marginBottom: '16px' }}
          />
        )}
      </Column>
      <Column md={4} lg={8} sm={4}>
        <div>
          <h1 style={{ fontSize: '1.5em', marginTop: '32px' }}>Sell Status</h1>
          <p style={{ marginTop: '32px', marginBottom: '64px' }}>
            {onSell && 'Currently Available'}
            {!onSell && !isOwner && 'Not Available'}
            {!onSell && isOwner && 'NFT Owned'}
          </p>
        </div>
        <hr />
        <div>
          <h1 style={{ fontSize: '1.5em', marginTop: '64px' }}>Ownership</h1>
          <p
            className="walletAddress"
            style={{ marginTop: '32px', marginBottom: '32px' }}
          >
            {onSell ? 'Giga' : schooldata?.owner}
          </p>
        </div>
        <div>
          {onSell && (
            <Button
              className="submit-btn"
              onClick={onClick}
              renderIcon={ArrowRight}
            >
              Buy Now
            </Button>
          )}
        </div>
      </Column>
      <NftPurchaseModal
        schooldata={schooldata}
        isOpen={isModalOpen}
        onClose={closeModal}
        tokenId={tokenId}
      />
    </Grid>
  );
};

export default Introduction;
