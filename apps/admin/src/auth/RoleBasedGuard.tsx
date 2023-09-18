import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  // Logic here to get the current user role
  const { user } = useAuthContext();

  const currentRole = user?.roles[0];

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph sx={{ textAlign: 'left' }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary', textAlign: 'left' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            <ForbiddenIllustration sx={{ height: 300, my: { xs: 5, sm: 10 } }} />
          </div>
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
