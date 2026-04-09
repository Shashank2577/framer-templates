import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

export const Button = ({ children, onClick, href, as = "button" }: ButtonProps) => {
  const { colors } = useTheme();

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 32px",
    backgroundColor: "transparent",
    color: colors.text,
    border: `2px solid ${colors.text}`,
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: "0px", // sharp rectangles per spec
    transition: "background-color 0.2s, color 0.2s",
  };

  const whileHover = {
    backgroundColor: colors.text,
    color: colors.background,
  };

  const whileTap = {
    scale: 0.98,
  };

  if (as === "a") {
    return (
      <motion.a
        href={href}
        style={style}
        whileHover={whileHover}
        whileTap={whileTap}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      style={style}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.button>
  );
};
