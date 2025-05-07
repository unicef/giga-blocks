import axios from "axios";
import { ConfigService } from '@nestjs/config';
import { ethers } from "ethers";

const getProposedGasPrice = async () => {
    const config = new ConfigService();
    const apiKey = config.get('ETHERSCAN_API_KEY')
    const url = config.get('ETHERSCAN_URL')
    let proposedGasPrice:string;
    try {
        const result = await axios.get(`${url}?module=proxy&action=eth_gasPrice&apikey=${apiKey}`)
        const proposedGasPriceWei = BigInt(result.data?.result).toString()
        proposedGasPrice = proposedGasPriceWei
        console.log(`Proposed gas price: ${proposedGasPrice} gwei`)
    } catch (error) {
        console.log(error)
    }
    return proposedGasPrice;
}

export default getProposedGasPrice;