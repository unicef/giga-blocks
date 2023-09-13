import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Grid, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import useUpdateProfile from '@hooks/useUpdateProfile';
import useUserProfile from '@hooks/useUserProfile';
import { useAuthContext } from 'src/auth/useAuthContext';
import { BACKEND_URL } from 'src/config-global';

type FormValuesProps = {
  name: string;
  email: string;
  position: string | null;
  affiliation: string | null;
};

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces'),
  email: Yup.string().email('Email must be a valid email address'),
  position: Yup.string().nullable(),
  affiliation: Yup.string().nullable(),
});

export default function AccountGeneral() {
  const { user, addUser } = useAuthContext();
  const API_URL = `${BACKEND_URL}/users/${user?.id}`;

  const { loading, updateProfile } = useUpdateProfile();
  const { userProfile } = useUserProfile(user?.id);

  const [profile, setProfile] = useState<FormValuesProps>({
    name: '',
    email: '',
    position: '',
    affiliation: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const payload = { name: data.name };
      await updateProfile({ API_URL, payload });
      addUser({ updatedProfile: data, ...profile });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

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
                label="Name"
                value={profile.name}
                onChange={handleInputChange}
              />

              <ProfileTextField name="email" label="Email Address" value={profile.email} disabled />

              {/* <ProfileTextField
                name="position"
                label="Position"
                value={profile.position}
                onChange={handleInputChange}
              />

              <ProfileTextField
                name="affiliation"
                label="Organization"
                value={profile.affiliation}
                onChange={handleInputChange}
              /> */}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
