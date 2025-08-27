import axios from "axios";
import { ConfigService } from '@nestjs/config';

 const getProposedGasPrice = async () => {
    const config = new ConfigService();
    const apiKey = config.get('EXPLORER_API_KEY')
    const url = config.get('EXPLORER_API')
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