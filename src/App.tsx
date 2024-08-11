import { ThemeProvider, createTheme } from "@mui/material";
import { MarketPlacePage } from "pages/market-place";

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          width: "100%",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid #3A3841",
        },

        icon: {
          color: "white",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "text", color: "primary" },
          style: {
            backgroundColor: "var(--primary-color)",
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "capitalize",
            borderRadius: "4px",
            ":hover": {
              backgroundColor: "var(--primary-color)",
              opacity: 0.8,
            },
          },
        },
      ],
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          backgroundColor: "var(--primary-color)",
        },
        root: {
          color: "var(--primary-color)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MarketPlacePage />
    </ThemeProvider>
  );
}

export default App;
