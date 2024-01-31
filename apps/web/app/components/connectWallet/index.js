import React from 'react';
import {metaMaskLogin} from '../../utils/metaMaskUtils';
import {Tile,Column,Button} from '@carbon/react';    


const ConnectWallet = () => {  
    const connectMetaMask = async ()=>{
        await metaMaskLogin();
      }
    return (
        <Column sm={4} md={8} lg={16} align='center'>
        {/* <Tile> */}
        <h1>Please connect your wallet</h1>
        <br/>
          <Button 
          className='submit-btn'
          type='submit'
          style={{marginRight:'13px'}}
          onClick={connectMetaMask}>
            Connect
          </Button>
          {/* </Tile> */}
      </Column>

    )
}

export default ConnectWallet;