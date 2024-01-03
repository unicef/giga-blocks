import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';

import { Queries } from '../../../libs/graph-query';
import { useWeb3React } from '@web3-react/core';

import UserContributionTable from '../table';
import OwnedNfts from '../../card';
import ConnectWallet from '../../connectWallet';

const ListTabs = () => {
  const web3 = useWeb3React();
  const { account } = web3;
  const [pageSize, setPageSize] = useState(8);
  const variables = {
    id: account,
    first: pageSize,
  };

  return (
    <div className="tabs-wrapper">
      <Tabs>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#222222',
          }}
        >
          <TabList
            aria-label="List of tabs"
            style={{
              display: 'flex',
            }}
          >
            <Tab
              style={{
                marginRight: '32px',
                color: 'white',
              }}
            >
              Owned NFT
            </Tab>
            <Tab style={{ color: 'white' }}>Contributions</Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel>
            {account? 
            (<OwnedNfts
              query={Queries.ownedNftsQuery}
              variables={variables}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />):
            <ConnectWallet />}
          </TabPanel>
          <TabPanel>
            <UserContributionTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ListTabs;
