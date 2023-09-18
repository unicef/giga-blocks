// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '@layouts/login';
// routes
import { PATH_AUTH } from '@routes/paths';
//
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Visualize the ecosystem">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4" color="white">
          LSO Partners Visualizations
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2" color="white">
            Already have an account?
          </Typography>
          <Link
            component={NextLink}
            href={PATH_AUTH.login}
            style={{ textDecoration: 'none' }}
            variant="subtitle2"
          >
            <Typography color="#f7931e" fontSize={14}>
              Sign in
            </Typography>
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{ color: 'white', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link
          component={NextLink}
          href="https://waya-energy.com/terms-condition/"
          underline="always"
          style={{ color: 'white', textDecorationColor: 'white' }}
          target="_blank"
        >
          Terms of Service
        </Link>
        {' and '}
        <Link
          underline="always"
          href="https://waya-energy.com/privacy-policy/"
          component={NextLink}
          style={{ color: 'white', textDecorationColor: 'white' }}
          target="_blank"
        >
          Privacy Policy
        </Link>
        .
      </Typography>
    </LoginLayout>
  );
}
