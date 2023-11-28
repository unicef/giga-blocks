import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';

import { Queries } from '../../../libs/graph-query';
import { useWeb3React } from '@web3-react/core';

import UserContributionTable from '../table';
import OwnedNfts from '../../card';

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
        <TabList className="tabs">
          <Tab>Owned NFTs</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OwnedNfts
              query={Queries.ownedNftsQuery}
              variables={variables}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
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
