import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid} from '@mui/material';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import { useUserGetById } from '@hooks/user/useUser';
import { useEffect } from 'react';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
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

export default function UserNewEditForm({id}:Props) {

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


  const { data, refetch } = useUserGetById(id);

  useEffect(() => {
    refetch()
  }, [id])

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

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
                name="email"
                label="Email"
                placeholder='Enter your username'
                value={data?.email || ""}
                disabled
              />

            <ProfileTextField
                name="name"
                label="Username"
                placeholder='Enter your username'
                value={data?.name || ""}
                disabled
              />

              <ProfileTextField
                name="wallet"
                label="Metamask wallet"
                placeholder='Enter your metamask wallet'
                value={data?.walletAddress || ""}
                disabled
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
