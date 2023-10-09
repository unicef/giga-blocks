import { forwardRef } from "react";
// next
import NextLink from "next/link";
// @mui
import { Link, BoxProps, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  isMini?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, isMini, ...other }, ref) => {
    // OR using local (public folder)
    // -------------------------------------------------------
    const logo =
      isMini && isMini ? (
        // <Box
        //   component="img"
        //   src="/logo/logo-vertical.svg"
        //   sx={{ maxHeight: 80, objectFit: 'contain', cursor: 'pointer', ...sx }}
        // />
        <Typography
          variant="h5"
          sx={{ maxHeight: 80, objectFit: "contain", cursor: "pointer", ...sx, color: "#3D75A6" }}
        >
          GIGA
        </Typography>
      ) : (
        <Typography
          variant="h3"
          sx={{ maxHeight: 100, objectFit: "contain", cursor: "pointer", color: "black", ...sx }}
        >
          nft2.0
        </Typography>
        // <Box
        //   component="img"
        //   src="/logo/logo-horizontal.png"
        //   sx={{ maxHeight: 100, objectFit: 'contain', cursor: 'pointer', ...sx }}
        // />
      );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={NextLink} href="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
