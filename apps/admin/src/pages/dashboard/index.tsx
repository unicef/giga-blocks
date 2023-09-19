import { Container } from "@mui/material";
import DashboardLayout from '@layouts/dashboard';
// import { AdministrationProvider } from "@contexts/administration";
import { ROLES } from 'src/config-global';

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
  return (
    <Container>
      <h1>Dashboard</h1>
    </Container>
  );
}
