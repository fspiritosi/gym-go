import { createContext, useState, useMemo } from "react";
import {createTheme } from '@mui/material/styles';

//color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#d2d4d7",
          200: "#a5a9af",
          300: "#797f87",
          400: "#4c545f",
          500: "#1f2937",
          600: "#19212c",
          700: "#131921",
          800: "#0c1016",
          900: "#06080b",
          // 100: "#e0e0e0",
          // 200: "#c2c2c2",
          // 300: "#a3a3a3",
          // 400: "#858585",
          // 500: "#666666",
          // 600: "#525252",
          // 700: "#3d3d3d",
          // 800: "#292929",
          // 900: "#141414",
        },

        primary: {
          100: "#cdcdd0",
          200: "#9a9ca0",
          300: "#686a71",
          400: "#353941",
          500: "#030712",
          600: "#02060e",
          700: "#02040b",
          800: "#010307",
          900: "#010104",
          // 100: "#d0d1d5",
          // 200: "#a1a4ab",
          // 300: "#727681",
          // 400: "#1f2a40",
          // 500: "#141b2d",
          // 600: "#101624",
          // 700: "#0c101b",
          // 800: "#080b12",
          // 900: "#040509",
        },
        greenAccent: {
          100: "#edfad7",
          200: "#daf5ae",
          300: "#c8f086",
          400: "#b5eb5d",
          500: "#a3e635",
          600: "#82b82a",
          700: "#628a20",
          800: "#415c15",
          900: "#212e0b",
          // 100: "#dbf5ee",
          // 200: "#b7ebde",
          // 300: "#94e2cd",
          // 400: "#70d8bd",
          // 500: "#4cceac",
          // 600: "#3da58a",
          // 700: "#2e7c67",
          // 800: "#1e5245",
          // 900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#f3fce3",
          200: "#e7f8c7",
          300: "#dcf5aa",
          400: "#d0f18e",
          500: "#c4ee72",
          600: "#9dbe5b",
          700: "#768f44",
          800: "#4e5f2e",
          900: "#273017",
          // 100: "#e1e2fe",
          // 200: "#c3c6fd",
          // 300: "#a4a9fc",
          // 400: "#868dfb",
          // 500: "#6870fa",
          // 600: "#535ac8",
          // 700: "#3e4396",
          // 800: "#2a2d64",
          // 900: "#151632",
        },
      }
    : {
        grey: {
          // 200: "#292929",
          // 100: "#141414",
          // 300: "#3d3d3d",
          // 400: "#525252",
          // 500: "#666666",
          // 600: "#858585",
          // 700: "#a3a3a3",
          // 800: "#c2c2c2",
          // 900: "#e0e0e0",
          100: "#06080b",
          200: "#0c1016",
          300: "#131921",
          400: "#19212c",
          500: "#1f2937",
          600: "#4c545f",
          700: "#797f87",
          800: "#a5a9af",
          900: "#d2d4d7",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#434957",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#212e0b",
          200: "#415c15",
          300: "#628a20",
          400: "#82b82a",
          500: "#a3e635",
          600: "#b5eb5d",
          700: "#c8f086",
          800: "#daf5ae",
          900: "#edfad7",
          // 100: "#0f2922",
          // 200: "#1e5245",
          // 300: "#2e7c67",
          // 400: "#3da58a",
          // 500: "#4cceac",
          // 600: "#70d8bd",
          // 700: "#94e2cd",
          // 800: "#b7ebde",
          // 900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#273017",
          200: "#4e5f2e",
          300: "#768f44",
          400: "#9dbe5b",
          500: "#c4ee72",
          600: "#d0f18e",
          700: "#dcf5aa",
          800: "#e7f8c7",
          900: "#f3fce3",
          // 100: "#151632",
          // 200: "#2a2d64",
          // 300: "#3e4396",
          // 400: "#535ac8",
          // 500: "#6870fa",
          // 600: "#868dfb",
          // 700: "#a4a9fc",
          // 800: "#c3c6fd",
          // 900: "#e1e2fe",
        },
      }),
});

//mui thene setting

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              primary: {
                main: colors.primary[500],
              },
              secondary: {
                main: colors.greenAccent[500],
              },
              neutral: {
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[100],
              },
              background: {
                default: colors.primary[500],
              },
            }
          : {
              primary: {
                main: colors.primary[100],
              },
              secondary: {
                main: colors.greenAccent[500],
              },
              neutral: {
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[100],
              },
              background: {
                default: "#fcfcfc",
              },
            }),
      },
      typography: {
        fontFamily: ["Source Sans 3", "sans - serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Source Sans 3", "sans - serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Source Sans 3", "sans - serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Source Sans 3", "sans - serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Source Sans 3", "sans - serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Source Sans 3", "sans - serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Source Sans 3", "sans - serif"].join(","),
          fontSize: 14,
        },
      },
    };
}

//context for color mode

export const ColorModeContext = createContext({
    toogleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
      () => ({
        toogleColorMode: () =>
          setMode((prev) => (prev === "light" ? "dark" : "light")),
      }),
      []
    );
        const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);
        return [theme, colorMode];
}
