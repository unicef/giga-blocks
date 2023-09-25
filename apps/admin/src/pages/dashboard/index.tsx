import { Container } from "@mui/material";
import DashboardLayout from "@layouts/dashboard";
// import { AdministrationProvider } from "@contexts/administration";
import { ROLES } from "src/config-global";
import { useSchoolGet } from "@hooks/school/useSchool";
import { MapView } from "../../components/maps";

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
  const { data } = useSchoolGet(1, 10);
  console.log(data?.rows[0]);
  return (
    <>
      <Container>
        <h1>Dashboard</h1>
      </Container>
      <MapView
        mapData={[
          {
            latitude: data?.rows?.lat,
            longitude: data?.rows?.lon,
          },
        ]}
      />
    </>
  );
}
