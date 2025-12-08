import { createTheme } from "@mui/material/styles";


 const modeTheme = localStorage.getItem("Theme") || "light";


const theme =  createTheme({
  palette: {
    mode: modeTheme === "light" ? "light" : "dark",
    ...(modeTheme === "light"
      ? {
          primary: {
            main: "#eb7600ff",
            light: "#eb7600d4",
            dark: "#000000ff",
          },
          secondary: { main: "#f0f0f0ff" },
          success: { main: "#22C55E" },
          error: { main: "#f55137b1" },
          warning: { main: "#F59E0B" },
          background: {
            default: "#ffffffff",
            paper: "#f2f2f2ff",
            
          },
          text: {
            primary: "#0F172A",
            secondary: "#475569",
          },
        }
      : {
          primary: {
            main: "#eb7600ff",
            light: "rgba(46, 46, 46, 1)",
            dark: "#7d7d7dff",
          },
          secondary: { main: "rgba(32, 32, 32, 1)" },
          success: { main: "#22C55E" },
          error: { main: "#FF6B6B" },
          warning: { main: "#F59E0B" },
          background: {
            default: "rgba(35, 35, 35, 1)",
            paper: "#1E1E1E",
          },
          text: {
            primary: "#ffffffff",
            secondary: "#d7d7d7ff",
          },
        }),
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    h4: { fontSize: "1.4rem", fontWeight: 600 },
    h5: { fontSize: "1.2rem", fontWeight: 600 },
    h6: { fontSize: "1rem", fontWeight: 600 },

    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.9rem" },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12, // arrondi global
  },

  components: {
    MuiButton: {
      
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "2px solid #eb7600ff",
          padding: "8px 18px",
          textTransform: "none",

          // backgroundColor:"red",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            backgroundColor: "#eb7600ff",
            color: "white",
          },
          "&:hover *": {
            fill: "white"
          }
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 8,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          }
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&:hover": {
            backgroundColor: "rgba(79, 70, 229, 0.08)",
          }
        }
      }
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.85rem",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
