import { useState, ChangeEvent, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, MenuItem, Select } from '@mui/material';
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

export default function UserNewEditForm({ isEdit = false, currentUser }: Props) {
  const { enqueueSnackbar } = useSnackbar();

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

  const [profile, setProfile] = useState<FormValuesProps>({
    id: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    affiliation: '',
    roles: '',
    is_active: true,
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

  const onSubmit = async (data: FormValuesProps) => {
    const { id, name, roles } = profile;
    const updatedProfile = { name, roles: [roles] };

    try {
      const response = await AdministrationService.updateUser(id, updatedProfile);
      if (response.statusText !== 'OK')
        enqueueSnackbar('Error while updating user', { variant: 'error' });
      enqueueSnackbar('User details updated successfully');
      if (isEdit) push('/user/list');
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (currentUser) {
      currentUser.roles = currentUser?.roles?.[0];
      setProfile(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    methods.reset(profile); // Set form values after profile data is fetched
  }, [methods, profile]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <ProfileTextField
                name="name"
                value={profile?.name || ''}
                onChange={handleInputChange}
                label="Full Name"
              />
              <ProfileTextField
                name="email"
                value={profile?.email || ''}
                onChange={handleInputChange}
                label="Email Address"
                disabled
              />
              <ProfileTextField
                name="phone"
                value={profile?.phone || ''}
                onChange={handleInputChange}
                label="Phone Number"
              />
              <ProfileTextField
                name="affiliation"
                value={profile?.affiliation || ''}
                onChange={handleInputChange}
                label="Organization"
              />
              <ProfileTextField
                name="position"
                value={profile?.position || ''}
                onChange={handleInputChange}
                label="Position"
              />
              <Select
                value={profile?.roles || ''}
                name="roles"
                displayEmpty
                fullWidth
                required
              >
                {ROLES.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
