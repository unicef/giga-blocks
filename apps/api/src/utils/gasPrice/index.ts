import axios from "axios";
import { ConfigService } from '@nestjs/config';
import { ethers } from "ethers";

const getProposedGasPrice = async () => {
    const config = new ConfigService();
    const apiKey = config.get('ETHERSCAN_API_KEY')
    const url = config.get('ETHERSCAN_URL')
    let proposedGasPrice:bigint;
    try {
        const result = await axios.get(`${url}?module=gastracker&action=gasoracle&apikey=${apiKey}`)
        const proposedGasPriceWei = result?.data?.result?.ProposeGasPrice
        proposedGasPrice = ethers.parseUnits(proposedGasPriceWei, 'gwei')
    } catch (error) {
        console.log(error)
    }
    return proposedGasPrice*10n;
}

export default getProposedGasPrice;