import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Card, Grid, Stack, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from '@components/snackbar';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_CONTRIBUTE } from '@routes/paths';
import { useContributionGetById, useContributionValidate } from '@hooks/contribute/useContribute';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}

export default function ContributeDetail({ id }: Props) {
  const [profile, setProfile] = useState<any>({
    fullname: '',
    schoolName: '',
    createdAt: '',
    status: '',
    contributed_data: '',
    coverage: '',
    mintedStatus: '',
  });

  const { data, isSuccess, isError, refetch } = useContributionGetById(id);
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate,
    isSuccess: isValidationSuccess,
    isError: isValidationError,
  } = useContributionValidate();

  const router = useRouter();

  const [nftData, setNftData] = useState({
    id: '',
    schoolName: '',
    longitude: '',
    latitude: '',
    schoolType: '',
    country: '',
    connectivity: '',
    coverage_availabitlity: '',
    electricity_availabilty: '',
    mintedStatus: '',
  });

  useEffect(() => {
    if (isSuccess) {
      const keyValue = Object.entries(data?.contributed_data);
      const jsonString = JSON.parse(keyValue?.map((pair) => pair[1])?.join(''));
      setProfile({
        fullname: data?.contributedUser?.name,
        schoolName: data?.school.name,
        createdAt: new Date(data?.createdAt).toLocaleDateString(),
        status: data?.status,
        contributed_data: jsonString,
        coverage: data?.coverage_availability,
        mintedStatus: data?.minted,
      });
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    isValidationSuccess &&
      enqueueSnackbar('Successfully updated contribution', { variant: 'success' });
    refetch();
    isValidationError && enqueueSnackbar('Unsuccessful', { variant: 'error' });
  }, [isValidationSuccess, isValidationError]);

  useEffect(() => {
    setNftData({
      id: data?.id,
      schoolName: data?.name,
      longitude: data?.longitude,
      latitude: data?.latitude,
      schoolType: data?.school_type,
      country: data?.country,
      connectivity: data?.connectivity,
      coverage_availabitlity: data?.coverage_availability,
      electricity_availabilty: data?.electricity_available,
      mintedStatus: data?.minted,
    });
  }, [data]);

  const methods = useForm();

  const onContribute = (validity: boolean) => {
    const payload = { contributions: [{ contributionId: id, isValid: validity }] };
    mutate(payload);
    router.push('/contribute');
  };

  const back = () => {
    router.push('/contribute');
  };

  return (
    <>
      <Grid item xs={8}>
        <Container>
          <CustomBreadcrumbs
            heading="Contribution Detail"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Contribute', href: PATH_CONTRIBUTE.root },
              { name: 'Detail' },
            ]}
          />
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} columnGap={2} display="grid">
                    <ProfileTextField
                      name="name"
                      value={profile?.fullname || ''}
                      label="Contributed by"
                      disabled
                    />

                    <ProfileTextField
                      name="location"
                      value={profile?.schoolName || ''}
                      label="School Name"
                      disabled
                    />
                    <Box
                      display="grid"
                      rowGap={3}
                      columnGap={8}
                      gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                      }}
                    >
                      <ProfileTextField
                        name="latitude"
                        value={profile?.createdAt || ''}
                        label="Created At"
                        disabled
                      />
                      <ProfileTextField
                        name="longitude"
                        value={profile?.status || ''}
                        label="Status"
                        disabled
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span>Contributed Data</span>
                        <span>
                          <ProfileTextField
                            name="coverage"
                            value={Object.values(profile?.contributed_data)[0]  === true ? 'Yes' : Object.values(profile?.contributed_data)[0] === false ? 'No' : Object.values(profile?.contributed_data)[0]  || ''}
                            label={Object.keys(profile?.contributed_data)[0] || ''}
                            disabled
                          />
                        </span>
                      </div>
                    </Box>
                  </Box>

                  <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                    <Button
                      onClick={back}
                      variant="contained"
                      style={{ width: '300px', background: '#474747' }}
                    >
                      Back
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
      </Grid>
      {profile?.status === 'Pending' && (
        <Grid item xs={4}>
          <Container>
            <Box justifyContent={'center'}>
              <Stack direction="row" alignItems="center">
                <Button
                  variant="contained"
                  color={'info'}
                  style={{ width: '150px', background: '#474747' }}
                  onClick={() => onContribute(false)}
                >
                  Invalidate
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  color={'info'}
                  style={{ width: '150px', background: '#474747' }}
                  onClick={() => onContribute(true)}
                >
                  Validate
                </Button>
              </Stack>
            </Box>
          </Container>
        </Grid>
      )}
    </>
  );
}
