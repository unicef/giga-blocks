import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useSchoolCount, useSchoolGet } from '@hooks/school/useSchool';

export default function OutlinedCard() {
  const { data: schoolCount } = useSchoolCount();
  const { data: mintedCount } = useSchoolGet(0, 0, 'MINTED');

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {/* <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Seasons Hosted</Typography>
            <Typography variant="h5" component="div">
              4
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}
      {/* <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total Contributions</Typography>
            <Typography variant="h5" component="div">
              2443
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">Total School</Typography>
            <Typography variant="h5" component="div">
              {schoolCount ? schoolCount : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">NFTs Minted</Typography>
            <Typography variant="h5" component="div">
              {mintedCount?.meta?.total || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
