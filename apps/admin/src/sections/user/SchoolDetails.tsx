import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Box, Card, Grid, Stack, Button, Container } from '@mui/material';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import { useSchoolGetById } from '@hooks/school/useSchool';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
// @ts-ignore
import Identicon from 'react-identicons';
import { useMintSchools } from '@hooks/school/useSchool';
import { PATH_DASHBOARD, PATH_SCHOOL } from '@routes/paths';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}

export default function SchoolDetails({ id }: Props) {
  const [profile, setProfile] = useState({
    fullname: '',
    location: '',
    latitude: '',
    longitude: '',
    connectivity: false,
    coverage: false,
    mintedStatus: '',
    electricity_availabilty: false
  });

  const { data, isSuccess, isError, refetch } = useSchoolGetById(id);

  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate,
    isError: isMintError,
    isSuccess: isMintSuccess,
  } = useMintSchools();

  const router = useRouter()

  const [nftData, setNftData] = useState({
    id: '',
    giga_school_id: '',
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
    console.log(data)
    isSuccess &&
      setProfile({
        fullname: data?.name,
        location: data?.country,
        latitude: data?.latitude,
        longitude: data?.longitude,
        connectivity: data?.connectivity,
        coverage: data?.coverage_availability,
        mintedStatus: data?.minted,
        electricity_availabilty: data?.electricity_available
      });
  }, [isSuccess, isError, data]);

  useEffect(() => {
    setNftData({
      id: data?.id,
      giga_school_id: data?.giga_school_id,
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

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces'),
    email: Yup.string().email('Email must be a valid email address'),
    phone: Yup.number().typeError('Phone must be a valid number'),
    position: Yup.string(),
    affiliation: Yup.string(),
    roles: Yup.string(),
  });

  const methods = useForm();

  const mintSchool = async () => {
    mutate({ data: nftData });
  };

  useEffect(() => {
    isMintSuccess && enqueueSnackbar('Minted successfully'); refetch();
    isMintSuccess &&  back();
    isMintError && enqueueSnackbar('Minting unsuccessful'); refetch();
  }, [isMintSuccess, isMintError])

  const back = () => {
    {profile.mintedStatus === 'NOTMINTED' ? router.push('/school/un-minted?') : router.push('/school/pending')}
  };

  return (
    <>
      <Grid item lg={8} sm={12}>
        <Container>
          <CustomBreadcrumbs
            heading="School Detail Page"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Unminted School', href: PATH_SCHOOL.contributed },
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
                      label="Full Name"
                      disabled
                    />

                    <ProfileTextField
                      name="location"
                      value={profile?.location || ''}
                      label="Location"
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
                        value={profile?.latitude || ''}
                        label="Latitude"
                        disabled
                      />
                      <ProfileTextField
                        name="longitude"
                        value={profile?.longitude || ''}
                        label="Longitude"
                        disabled
                      />
                      <ProfileTextField
                        name="connectivity"
                        value={profile?.connectivity === true ? 'Yes' : 'No' || ''}
                        label="Connectivity"
                        disabled
                      />
                      <ProfileTextField
                        name="coverage"
                        value={profile?.coverage === true ? 'Yes' : 'No' || ''}
                        label="Coverage Availability"
                        disabled
                      />
                      <ProfileTextField
                        name="electricity_availabilty"
                        value={profile?.electricity_availabilty === true ? 'Yes' : 'No' || ''}
                        label="Electricity Availability"
                        disabled
                      />
                    </Box>
                  </Box>

                  <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                    <Button variant="contained" style={{ width: '300px', background: '#474747' }} onClick={back}>
                      Back
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
      </Grid>
      <Grid item lg={4} sm={12}>
        <Container>
          <Box justifyContent={'center'}>
            <Stack alignItems="center" sx={{ mt: 1 }}>
              {profile.mintedStatus === 'NOTMINTED' ? (
                <Button
                  variant="contained"
                  color={'info'}
                  style={{ width: '300px', background: '#474747' }}
                  onClick={mintSchool}
                >
                  Mint
                </Button>
              ) : profile.mintedStatus === 'ISMINTING' ? <Button
              variant="contained"
              color={'info'}
              style={{ width: '300px', background: '#474747' }}
              disabled
            >
              Minting
            </Button> : <Button
              variant="contained"
              color={'success'}
              style={{ width: '300px', background: '#474747' }}
              onClick={mintSchool}
            >
              Minted
            </Button>}
            </Stack>
            <Stack sx={{ mt: 8 }}>
              <Box display="flex" justifyContent="center">
                <Identicon string={profile?.fullname} size={200} />
              </Box>
            </Stack>
          </Box>
        </Container>
      </Grid>
    </>
  );
}
