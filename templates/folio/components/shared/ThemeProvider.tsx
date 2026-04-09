import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { RenderTarget, addPropertyControls, ControlType } from "framer";
import { themeTokens } from "./theme";

export type Theme = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  border: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children?: ReactNode;
  defaultTheme?: Theme;
  lightBackground?: string;
  lightSurface?: string;
  lightText?: string;
  lightMuted?: string;
  lightAccent?: string;
  lightBorder?: string;
  darkBackground?: string;
  darkSurface?: string;
  darkText?: string;
  darkMuted?: string;
  darkAccent?: string;
  darkBorder?: string;
}

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
  lightBackground = themeTokens.light.background,
  lightSurface = themeTokens.light.surface,
  lightText = themeTokens.light.text,
  lightMuted = themeTokens.light.muted,
  lightAccent = themeTokens.light.accent,
  lightBorder = themeTokens.light.border,
  darkBackground = themeTokens.dark.background,
  darkSurface = themeTokens.dark.surface,
  darkText = themeTokens.dark.text,
  darkMuted = themeTokens.dark.muted,
  darkAccent = themeTokens.dark.accent,
  darkBorder = themeTokens.dark.border,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Only attempt localStorage if we are in an actual browser environment, not Framer's static preview
    if (RenderTarget.current() === RenderTarget.canvas) {
        setTheme(defaultTheme);
        return;
    }

    const saved = localStorage.getItem("folio-theme") as Theme | null;
    if (saved && (saved === "light" || saved === "dark")) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, [defaultTheme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      if (RenderTarget.current() !== RenderTarget.canvas) {
         localStorage.setItem("folio-theme", nextTheme);
      }
      return nextTheme;
    });
  };

  const lightColors: ThemeColors = {
      background: lightBackground,
      surface: lightSurface,
      text: lightText,
      muted: lightMuted,
      accent: lightAccent,
      border: lightBorder
  };

  const darkColors: ThemeColors = {
      background: darkBackground,
      surface: darkSurface,
      text: darkText,
      muted: darkMuted,
      accent: darkAccent,
      border: darkBorder
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <div
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          minHeight: "100vh",
          transition: "background-color 0.3s ease, color 0.3s ease",
          fontFamily: themeTokens.typography.body,
          width: "100%",
          height: "100%"
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback for independent code components used outside of ThemeProvider in canvas
    return {
       theme: "light",
       toggleTheme: () => {},
       colors: themeTokens.light
    };
  }
  return context;
};

addPropertyControls(ThemeProvider, {
    defaultTheme: {
        type: ControlType.Enum,
        options: ["light", "dark"],
        defaultValue: "light",
        title: "Default Theme"
    },
    lightBackground: { type: ControlType.Color, title: "Light BG", defaultValue: themeTokens.light.background },
    lightSurface: { type: ControlType.Color, title: "Light Surface", defaultValue: themeTokens.light.surface },
    lightText: { type: ControlType.Color, title: "Light Text", defaultValue: themeTokens.light.text },
    lightMuted: { type: ControlType.Color, title: "Light Muted", defaultValue: themeTokens.light.muted },
    lightAccent: { type: ControlType.Color, title: "Light Accent", defaultValue: themeTokens.light.accent },
    lightBorder: { type: ControlType.Color, title: "Light Border", defaultValue: themeTokens.light.border },
    darkBackground: { type: ControlType.Color, title: "Dark BG", defaultValue: themeTokens.dark.background },
    darkSurface: { type: ControlType.Color, title: "Dark Surface", defaultValue: themeTokens.dark.surface },
    darkText: { type: ControlType.Color, title: "Dark Text", defaultValue: themeTokens.dark.text },
    darkMuted: { type: ControlType.Color, title: "Dark Muted", defaultValue: themeTokens.dark.muted },
    darkAccent: { type: ControlType.Color, title: "Dark Accent", defaultValue: themeTokens.dark.accent },
    darkBorder: { type: ControlType.Color, title: "Dark Border", defaultValue: themeTokens.dark.border },
});
