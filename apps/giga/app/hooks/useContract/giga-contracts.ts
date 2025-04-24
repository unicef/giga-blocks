import { useMutation } from '@tanstack/react-query';
import {
  useWriteGigaMinterBuyNft,
  useWriteGigaMinterMintNft,
} from './gigaMinter';
import { toast } from 'react-hot-toast';
import { etherUnits, parseUnits } from 'viem';

export const useGigaBuyNft = () => {

  const contract = useWriteGigaMinterBuyNft();

  const functionCall = useMutation({
    mutationFn:({
      args,
      totalValue,
      contractAddress,
    }:{
      args:String,
      totalValue: number,
      contractAddress: string;
    }) =>{
      const weiValue = parseUnits(
        totalValue.toString(),
        etherUnits.wei,
      )
      // parseUnits(
      //   totalValue.toString(),
      //   18,
      // );

      return contract.writeContractAsync({
        args: args,
        contractAddress: contractAddress,
        value: weiValue,
      });
    }
      })
      return functionCall
    }


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
  console.log('contract',contract);
  const functionCall = useMutation({
    mutationFn:({
      id,
      args,
      contractAddress,

    }:{
      id: string;
      args: any[];
      contractAddress: string;
    }) =>{
      console.log('args', args);
      return contract.writeContractAsync({
        args: args,
        contractAddress: contractAddress,
      });
    }
      
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
})
return functionCall

};
