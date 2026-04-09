import React, { ReactNode } from "react";
import { themeTokens } from "./theme";

export const Container = ({ children, style = {} }: { children: ReactNode; style?: React.CSSProperties }) => {
  return (
    <div style={{
      maxWidth: themeTokens.spacing.maxWidth,
      margin: "0 auto",
      padding: "0 24px",
      width: "100%",
      boxSizing: "border-box",
      ...style
    }}>
      {children}
    </div>
  );
};
