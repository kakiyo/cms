import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    couponStatus: {
      open: string;
      stop: string;
      end: string;
      deleted: string;
    };
  }
  interface Palette {
    couponStatus: {
      open: string;
      stop: string;
      end: string;
      deleted: string;
    };
  }
}

export const rootTheme = createTheme({
  palette: {
    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },
    couponStatus: {
      open: "#0236fd",
      stop: "red",
      end: "dimgray",
      deleted: "black",
    },
    error: {
      main: "#EB5055",
    },
    text: {
      primary: "#3C3C5A",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari 対応 */,
          },
          msOverflowStyle: "none" /* IE, Edge 対応 */,
          scrollbarWidth: "none" /* Firefox 対応 */,
        },
        elevation1: {
          boxShadow: "0px 0px 10px rgba(60, 60, 90, 0.1)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected,&.Mui-selected:hover": {
            backgroundColor: process.env.NEXT_PUBLIC_COLOR,
            color: "white",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 800,
          padding: "8px",
          whiteSpace: "pre-wrap",
          height: "fit-content",
        },
      },
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
  },
});
