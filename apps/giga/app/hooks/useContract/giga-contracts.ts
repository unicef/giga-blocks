import { useMutation } from '@tanstack/react-query';
import {
  gigaMinterAbi,
  useWriteGigaMinterBuyNft,
  useWriteGigaMinterMintNft,
} from './gigaMinter';
import { toast } from 'react-hot-toast';
import { etherUnits, parseUnits } from 'viem';
import { useSchoolPaidActivation } from '../useSchool';

export const useGigaBuyNft = () => {
  const contract = useWriteGigaMinterBuyNft();
  const activateSchool = useSchoolPaidActivation();

  const functionCall = useMutation({
    mutationFn: async({
      args,
      totalValue,
      gasFee,
      contractAddress,
      activationDetails,
    }: {
      args: any;
      totalValue: number;
      gasFee: number;
      contractAddress: `0x${string}`;
      activationDetails: any;
      onComplete?: () => void;
    }) => {
      const weiValue = parseUnits(totalValue.toString(), etherUnits.wei);

      const tx = await  contract.writeContractAsync({
        address: contractAddress,
        args: args,
        value: weiValue,
        gasPrice: gasFee   
      });
       activationDetails.transactionHash = tx
    },
    onSuccess: async (result, variables) => {
      await activateSchool.mutateAsync(variables.activationDetails);
      if (variables.onComplete) {
        variables.onComplete();
      }
    },
    onError: async (error) => {
      console.error('Error in transaction:', error);
      toast.error('NFT Purchase Failed !!');
    },
  });
  return functionCall;
};

// return useWriteGigaMinterBuyNft({
//   mutation: {
//     onSuccess: () => {
//       toast.success('NFT Purchase Success !!');
//     },
//     onError: () => {
//       toast.error('NFT Purchase Failed !!');
//     },
//   },
// });

export const useGigaMintNft = () => {
  console.log('useGigaMintNft');
  const contract = useWriteGigaMinterMintNft();
  console.log('contract', contract);
  const functionCall = useMutation({
    mutationFn: ({
      id,
      args,
      contractAddress,
    }: {
      id: string;
      args: any[];
      contractAddress: string;
    }) => {
      console.log('args', args);
      return contract.writeContractAsync({
        args: args,
        contractAddress: contractAddress,
      });
    },

    // return useWriteGigaMinterMintNft({
    //   mutation: {
    //     onSuccess: () => {
    //       toast.success('NFT Mint Successful !!');
    //     },
    //     onError: () => {
    //       toast.error('NFT Mint Unsuccessful');
    //     },
    //   },
    // });
  });
  return functionCall;
};
