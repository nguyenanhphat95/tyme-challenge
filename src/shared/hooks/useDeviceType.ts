import { useMediaQuery, useTheme } from "@mui/material";

export const useDeviceType = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return { isMobile, isTablet };
};
