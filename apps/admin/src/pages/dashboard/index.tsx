import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { useAllSchool } from '@hooks/school/useSchool';
import { MapView } from '../../components/maps';
import CardData from '../../components/dashboard-cards';
import Card from '@mui/material/Card';

Dashboard.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default function Dashboard() {
  const {data} = useAllSchool();
  const latitudeArray = data?.map((item: { latitude: any }) => item.latitude);
  const longitudeArray = data?.map((item: { longitude: any }) => item.longitude);
  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <CardData />
        <Card style={{ marginTop: '45px' }}>
          <MapView
            mapData={
              latitudeArray && longitudeArray
                ? latitudeArray?.map((latitude: any, index: number) => ({
                    latitude,
                    longitude: longitudeArray[index],
                  }))
                : []
            }
          />
        </Card>
      </Container>
    </>
  );
}
