import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useSchoolCount } from '@hooks/school/useSchool';
import { useMetrics } from '@hooks/user/useUser';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';
import { ethers } from 'ethers';

export default function OutlinedCard() {
  const { data: schoolCount } = useSchoolCount();
  const { data: metricsData } = useMetrics();

  const [result] = useQuery({
    query: Queries.totalNftCount,
    variables: {},
  });
  const { data } = result;

  const [totalGasFee] = useQuery({
    query: Queries.totalGasFee,
    variables: { id: process.env.NEXT_PUBLIC_ADMIN_ADDRESS },
  });
  const { data: gasFee } = totalGasFee;

  const dataLength = data?.totalNfts[0]?.totalNft;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total School</Typography>
            <Typography variant="h5" component="div">
              {schoolCount ? schoolCount.toLocaleString() : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Schools Activated</Typography>
            <Typography variant="h5" component="div">
              {dataLength ? Number(dataLength).toLocaleString() : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total Contributors</Typography>
            <Typography variant="h5" component="div">
              {metricsData?.contributorCount
                ? Number(metricsData?.contributorCount)?.toLocaleString()
                : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total Gas Fee</Typography>
            <Typography variant="h5" component="div">
              {gasFee?.totalGasFees?.[0]?.totalGasFee
                ? Number(ethers?.formatEther(gasFee?.totalGasFees?.[0]?.totalGasFee)).toExponential(
                    2
                  ) +
                  ' ' +
                  'ETH'
                : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
