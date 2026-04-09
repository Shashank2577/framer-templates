import React from "react";
import { useTheme } from "./ThemeProvider";
import { themeTokens } from "./theme";

export const SectionLabel = ({ number, title }: { number: string; title: string }) => {
  const { colors } = useTheme();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "48px",
      fontFamily: themeTokens.typography.headings,
    }}>
      <span style={{ color: colors.accent, fontSize: "24px", fontWeight: 700 }}>
        {number}
      </span>
      <h2 style={{ fontSize: "32px", fontWeight: 700, margin: 0, color: colors.text }}>
        {title}
      </h2>
    </div>
  );
};
