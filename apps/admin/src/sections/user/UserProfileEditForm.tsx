import { useForm } from 'react-hook-form';
import { Box, Card, CircularProgress, Container, Grid } from '@mui/material';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import { useUserGetById } from '@hooks/user/useUser';
import { useEffect } from 'react';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '@routes/paths';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}

export default function UserNewEditForm({ id }: Props) {
  const { data, refetch, isLoading } = useUserGetById(id);

  useEffect(() => {
    refetch();
  }, [id]);

  const methods = useForm();

  return (
    <Container>
      {!isLoading ? (
        <FormProvider methods={methods}>
          {data ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} columnGap={2} display="grid">
                    <ProfileTextField
                      name="email"
                      label="Email"
                      placeholder="Enter your username"
                      value={data?.email || ''}
                      disabled
                    />

                    <ProfileTextField
                      name="name"
                      label="Username"
                      placeholder="Enter your username"
                      value={data?.name || ''}
                      disabled
                    />

                    <ProfileTextField
                      name="wallet"
                      label="Metamask wallet"
                      placeholder="Enter your metamask wallet"
                      value={data?.walletAddress || ''}
                      disabled
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 300,
                color: 'text.secondary',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              No user data found. Please check the user ID or try again later.
            </Box>
          )}
        </FormProvider>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '50vw',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}
