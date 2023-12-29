import React, { useEffect, useState } from 'react';
import {
  Grid,
  Column,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import './school-detail.scss';
import { useQuery } from 'urql';
import { Queries } from '../../libs/graph-query';
import { useParams } from 'next/navigation';
import { Default_Chain_Explorer } from '../../components/web3/connectors/network';

const EventTable = ({ data, linkPrefix }) => (
  <TableContainer sx={{ my: 4 }}>
    <Table>
      <TableHead>
        <TableRow style={{ background: '#2c2b33' }}>
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
            {'Event'}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
            {'Price'}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
            {'From'}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
            {'To'}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
            {'Txn Hash'}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'white' }}>
            {'Date'}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map((transfer, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
              }}
            >
              <TableCell>
                {transfer?.from === '0x0000000000000000000000000000000000000000'
                  ? 'Mint'
                  : 'Transfer'}
              </TableCell>
              <TableCell>{0.0}</TableCell>
              <TableCell>
                {transfer?.from
                  ? `${transfer.from.substring(0, 4)}...${transfer.from.slice(
                      -3
                    )}`
                  : ''}
              </TableCell>
              <TableCell>
                {transfer?.to
                  ? `${transfer.to.substring(0, 4)}...${transfer.to.slice(-3)}`
                  : ''}
              </TableCell>
              <TableCell>
                {transfer?.transactionHash ? (
                  <a
                    href={`${linkPrefix}${transfer?.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${transfer.transactionHash.substring(
                      0,
                      4
                    )}...${transfer.transactionHash.slice(-3)}`}
                  </a>
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell>
                {transfer?.blockTimestamp
                  ? new Date(
                      transfer.blockTimestamp * 1000
                    )?.toLocaleDateString('en-GB')
                  : ''}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Connectivity = () => {
  const { id } = useParams();
  const [result] = useQuery({
    query: Queries.transferQuery,
    variables: { id },
  });

  const [collectorResult] = useQuery({
    query: Queries.collectorTransferQuery,
    variables: { id },
  });

  const [transferData, setTransferData] = useState();
  const [collectorTransferData, setCollectorTransferData] = useState();

  useEffect(() => {
    if (result.data) {
      const encodeddata = result.data.schoolTransfers;
      setTransferData(encodeddata);
      setCollectorTransferData(collectorResult.data?.collectorTransfers);
    }
  }, [result.data, collectorResult.data]);

  return (
    <>
      <Grid fullWidth>
        <Column md={4} lg={5} sm={4} style={{ marginTop: '32px' }}>
          <span style={{ fontSize: '1.5em' }}>Transaction History</span>
        </Column>
        <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
          <Tabs>
            <TabList aria-label="List of tabs">
              <Tab style={{ marginRight: '32px' }}>Collector NFT</Tab>
              <Tab>School NFT</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EventTable
                  data={collectorTransferData}
                  linkPrefix={`${Default_Chain_Explorer}/tx/`}
                />
              </TabPanel>
              <TabPanel>
                <EventTable
                  data={transferData}
                  linkPrefix={`${Default_Chain_Explorer}/tx/`}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>
      </Grid>
      <Grid fullWidth>
        <Column md={4} lg={16} sm={4} style={{ marginTop: '36px' }}>
          <div className="border-bottom"></div>
        </Column>
      </Grid>
    </>
  );
};

export default Connectivity;
