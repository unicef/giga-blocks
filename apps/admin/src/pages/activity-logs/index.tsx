// next
import Head from "next/head";
import { Container, Typography } from "@mui/material";
// layouts
import DashboardLayout from "@layouts/dashboard";
// components
import { useSettingsContext } from "@components/settings";
import RoleBasedGuard from "src/auth/RoleBasedGuard";

// ----------------------------------------------------------------------

ActivityLogs.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function ActivityLogs() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Activity Logs | LSO Partners</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h3" component="h1" paragraph>
          This is the activity logs page
        </Typography>
      </Container>
    </>
  );
}
