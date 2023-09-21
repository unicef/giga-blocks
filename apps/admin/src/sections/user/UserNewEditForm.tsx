import { useState, ChangeEvent, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, MenuItem, Select, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useSnackbar } from '@components/snackbar';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import { AdministrationService } from '@services/administration';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
}

interface FormValuesProps {
  id: string;
  name: string;
  email: string;
  position: string | null;
  phone: string;
  affiliation: string | null;
  roles: string;
  is_active: boolean;
}

export default function UserNewEditForm() {

  const { push } = useRouter();

  const ROLES = ['ADMIN', 'USER'];

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

  const [profile, setProfile] = useState({
    id: 'asdf',
    name: 'asdf',
    email: 'adsf',
    position: 'asdf',
    phone: 'asdf'
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = async (data: FormValuesProps) => {
  //   const { id, name, roles } = profile;
  //   const updatedProfile = { name, roles: [roles] };

  //   try {
  //     const response = await AdministrationService.updateUser(id, updatedProfile);
  //     if (response.statusText !== 'OK')
  //       enqueueSnackbar('Error while updating user', { variant: 'error' });
  //     enqueueSnackbar('User details updated successfully');
  //     if (isEdit) push('/user/list');
  //   } catch (error) {
  //     enqueueSnackbar('Something went wrong', { variant: 'error' });
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     currentUser.roles = currentUser?.roles?.[0];
  //     setProfile(currentUser);
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   methods.reset(profile); 
  // }, [methods, profile]);

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
            >
              <ProfileTextField
                name="name"
                value={profile?.name || ''}
                label="Full Name"
              />

              <ProfileTextField
                name="location"
                value={profile?.email || ''}
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
              }}>
              <ProfileTextField
                name="latitude"
                value={profile?.phone || ''}
                label="Latitude"
              />
              <ProfileTextField
                name="longitude"
                value={profile?.phone || ''}
                label="Longitude"
              />
              <ProfileTextField
                name="connectivity"
                value={profile?.phone || ''}
                label="Connectivity"
              />
              <ProfileTextField
                name="coverage"
                value={profile?.phone || ''}
                label="Coverage"
              />
              </Box>
            </Box>

            <Stack alignItems="flex-start" sx={{ mt: 3 }}>
              <Button variant="contained" color={'secondary'} style={{width: '300px'}}>
                Back
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
