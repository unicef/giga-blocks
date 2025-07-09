import { Box, Button, Container } from '@mui/material';
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

Dashboard.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Dashboard() {
  const { data = [] } = useAllSchool();
  const { mintDetails } = useUploadContext();
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
            <></>
          )}
        </Card>
      </Container>
    </>
  );
}
