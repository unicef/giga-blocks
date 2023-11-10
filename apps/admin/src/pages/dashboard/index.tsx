import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
// import { AdministrationProvider } from "@contexts/administration";
import { useSchoolGet } from '@hooks/school/useSchool';
import { MapView } from '../../components/maps';
import CardData from '../../components/dashboard-cards';
import Card from '@mui/material/Card';

Dashboard.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    {/* <RoleBasedGuard hasContent roles={[ROLES.SUPERADMIN]}> */}
    {/* <AdministrationProvider> */}
    {page}
    {/* </AdministrationProvider> */}
    {/* </RoleBasedGuard> */}
  </DashboardLayout>
);

export default function Dashboard() {
  const { data } = useSchoolGet({page: 1, perPage: 10});
  const latitudeArray = data?.rows?.map((item: { latitude: any }) => item.latitude);
  const longitudeArray = data?.rows?.map((item: { longitude: any }) => item.longitude);
  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <CardData />
        <Card style={{ marginTop: '45px' }}>
          <MapView
            mapData={
              latitudeArray && longitudeArray
                ? latitudeArray.map((latitude: any, index: number) => ({
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
