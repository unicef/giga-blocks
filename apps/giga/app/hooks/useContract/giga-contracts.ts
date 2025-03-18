import {
  useWriteGigaMinterBuyNft,
  useWriteGigaMinterMintNft,
} from './gigaMinter';
import { toast } from 'react-hot-toast';

export const useGigaBuyNft = () => {
  return useWriteGigaMinterBuyNft({
    mutation: {
      onSuccess: () => {
        toast.success('NFT Purchase Success !!');
      },
      onError: () => {
        toast.error('NFT Purchase Failed !!');
      },
    },
  });
};

export const useGigaMintNft = () => {
  return useWriteGigaMinterMintNft({
    mutation: {
      onSuccess: () => {
        toast.success('NFT Mint Successful !!');
      },
      onError: () => {
        toast.error('NFT Mint Unsuccessful');
      },
    },
  });
};
