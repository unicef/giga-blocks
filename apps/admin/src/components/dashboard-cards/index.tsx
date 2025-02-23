import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useSchoolCount, useSchoolGet,useMintedSchoolCount } from '@hooks/school/useSchool';
import { useContributeGet } from '@hooks/contribute/useContribute';
import { useUserGet } from '@hooks/user/useUser';
import { useQuery } from 'urql';
import { Queries } from 'src/libs/graph-query';

export default function OutlinedCard() {
  const { data: mintedCount } = useMintedSchoolCount('MINTED');
  const { data: schoolCount } = useSchoolCount();
  const {data:contributionData} = useContributeGet({page: 0, perPage: 10})
  const {data:userData} = useUserGet(1, 10, 'CONTRIBUTOR')

  const [result] = useQuery({
    query: Queries.nftListQuery,
    variables: {  },
  });
  const { data } = result;

  const dataLength = data?.schoolTokenUris.length

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total School</Typography>
            <Typography variant="h5" component="div">
              {schoolCount ? schoolCount.toString() : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">NFTs Minted</Typography>
            <Typography variant="h5" component="div">
              {dataLength|| 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total Contributors</Typography>
            <Typography variant="h5" component="div">
            {userData?.meta?.total || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total Contributions</Typography>
            <Typography variant="h5" component="div">
            {contributionData?.meta?.total || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
