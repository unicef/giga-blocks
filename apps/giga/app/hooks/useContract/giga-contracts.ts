import { useMutation } from '@tanstack/react-query';
import {
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
    mutationFn: ({
      args,
      totalValue,
      contractAddress,
      activationDetails,
    }: {
      args: String;
      totalValue: number;
      contractAddress: string;
      activationDetails: any;
    }) => {
      const weiValue = parseUnits(totalValue.toString(), etherUnits.wei);

      return contract.writeContractAsync({
        args: args,
        contractAddress: contractAddress,
        value: weiValue,
      });
    },
    onSuccess: async (result, variables) => {
      console.log('activationData', variables.activationDetails);
      await activateSchool.mutateAsync(variables.activationDetails);
    },
    onError: (error) => {
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
