import { useForm } from 'react-hook-form';
import { Box, Card, Grid} from '@mui/material';
import FormProvider, { ProfileTextField } from '@components/hook-form';
import { useUserGetById } from '@hooks/user/useUser';
import { useEffect } from 'react';

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}

export default function UserNewEditForm({id}:Props) {

  const { data, refetch } = useUserGetById(id);

  useEffect(() => {
    refetch()
  }, [id])

  const methods = useForm();

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
