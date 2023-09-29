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

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    formState: { isSubmitting }
  } = methods;

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
                label="Username"
                placeholder='Enter your username'
              />

              <ProfileTextField
                name="location"
                label="Metamask wallet"
                placeholder='Enter your metamask wallet'
              />
            </Box>

            {/* <Stack alignItems="flex-start" sx={{ mt: 3 }}>
              <Button variant="contained" style={{width: '300px', background: '#474747'}}>
                Update profile
              </Button>
            </Stack> */}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
