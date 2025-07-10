import { Box, Button, Container, Grid, Typography } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { useAllSchool } from '@hooks/school/useSchool';
import { MapView } from '../../components/maps';
import CardData from '../../components/dashboard-cards';
import Card from '@mui/material/Card';
import MintingProgressBar from '@components/stepper/MintingProgressBar';
import React, { useContext, useEffect } from 'react';
import routes from '../../constants/api';
import api from '@utils/apiCall';
import { AxiosError } from 'axios';
import { useUploadContext } from '@contexts/uploadContext';
import MintDetails from '@components/stepper/MintDetails';
import NotMinting from '@components/stepper/NotMinting';
import { Lightning } from '@carbon/react/icons';

Dashboard.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Dashboard() {
  const { data = [] } = useAllSchool();
  const { mintDetails, setMintDetails } = useUploadContext();
  const [viewDetails, setViewDetails] = React.useState<boolean>(false);
  const [csvDetails, setCsvDetails] = React.useState({
    mintedCount: 0,
    notMintedCount: 0,
    mintingCount: 0,
    schools: [],
  });
  const [csvUploadId, setCsvUploadId] = React.useState<string | null>(null);
  const baseUrl = routes.BASE_URL;
  const currentCsvUploadId = 'currentCsvUploadId';
  const CSV_DETAILS_API_URL = `${baseUrl}${routes.SCHOOLS.DETAILS}/${csvUploadId}`;
  const TOTAL_MINTED_API_URL = `${baseUrl}${routes.SCHOOLS.TOTALMINTED}/${csvUploadId}`;

  // const latitudeArray = Array.isArray(data) ? data.map((item) => item.latitude) : [];
  // const longitudeArray = data?.map((item: { longitude: any }) => item.longitude);
  useEffect(() => {
    if (csvUploadId && viewDetails) {
      api
        .get(CSV_DETAILS_API_URL)
        .then((response) => {
          setCsvDetails(response.data);
        })
        .catch((error: AxiosError) => {});
    }
  }, [viewDetails, mintDetails]);

  useEffect(() => {
    const csvUploadId = localStorage.getItem(currentCsvUploadId);

    if (csvUploadId) {
      setCsvUploadId(csvUploadId);
    }
  }, []);

  useEffect(() => {
    const fetchMintedStatus = async () => {
      try {
        const res = await api.get(TOTAL_MINTED_API_URL);
        setMintDetails(res.data);
        //clear from local storage
        if (res?.data?.mintedCount === res?.data?.total) {
          localStorage.removeItem(currentCsvUploadId);
        }
      } catch (err) {
        console.error('Error fetching minted status', err);
      }
    };
    if (!csvUploadId) return; // Exit if csvUploadId is not set
    // Initial call
    fetchMintedStatus();

    // Set interval to fetch every 20 seconds
    const intervalId = setInterval(fetchMintedStatus, 20000);

    // Clean up
    return () => clearInterval(intervalId);
  }, [csvUploadId]);

  const tips = [
    {
      number: 1,
      title: 'Prepare Your CSV',
      description: 'Ensure your CSV follows the correct format with all required fields',
    },
    {
      number: 2,
      title: 'Batch Size Optimization',
      description: 'Keep batches under 2,000 schools for optimal processing speed',
    },
    {
      number: 3,
      title: 'Monitor Progress',
      description: 'Track activation progress and address any failed attempts promptly',
    },
  ];
  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <CardData />
        <Card sx={{ mt: 10 }}>
          {/* <MapView
            mapData={
              latitudeArray && longitudeArray
                ? latitudeArray?.map((latitude: any, index: number) => ({
                    latitude,
                    longitude: longitudeArray[index],
                  }))
                : []
            }
          /> */}
          {csvUploadId ? (
            !viewDetails ? (
              <>
                <MintingProgressBar />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    py: 3,
                    px: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ background: '#00AB55' }}
                    color="success"
                    onClick={() => setViewDetails(true)}
                  >
                    View Details
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <MintDetails csvDetails={csvDetails} setViewDetails={setViewDetails} />
              </>
            )
          ) : (
            <>
              <NotMinting />
            </>
          )}
        </Card>
        <Card
          sx={{
            p: 3,
            backgroundColor: '#f5f7fe',
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Lightning size={30} color="#6a48f2" />
            <Typography variant="h5" fontWeight={700} ml={1}>
              Bulk Activation Tips
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {tips.map((tip) => (
              <Grid item xs={12} md={4} key={tip.number}>
                <Box display="flex" alignItems="flex-start">
                  <Box
                    sx={{
                      width: 45,
                      height: 32,
                      backgroundColor: '#e0d9ff',
                      borderRadius: '50%',
                      color: '#6a48f2',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    {tip.number}
                  </Box>
                  <Box>
                    <Typography fontWeight={600}>{tip.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tip.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
