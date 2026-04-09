import React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";

interface FooterProps {
  copyrightText: string;
  showFramerCredit: boolean;
}

export default function Footer({
  copyrightText = "© 2024 Jules Doe. All rights reserved.",
  showFramerCredit = true
}: FooterProps) {
  const { colors } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{
      padding: "48px 0",
      borderTop: `1px solid ${colors.border}`,
      backgroundColor: colors.background
    }}>
      <Container style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px"
      }}>

        <div style={{ color: colors.muted, fontSize: "14px" }}>
          {copyrightText}
          {showFramerCredit && (
             <span style={{ marginLeft: "16px", opacity: 0.7 }}>
               Built with <a href="https://framer.com" style={{ color: "inherit", textDecoration: "underline" }}>Framer</a>
             </span>
          )}
        </div>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3, color: colors.text }}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.muted,
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.2s"
          }}
        >
          Back to top ↑
        </motion.button>

      </Container>
    </footer>
  );
}

addPropertyControls(Footer, {
  copyrightText: { type: ControlType.String, title: "Copyright Text", defaultValue: "© 2024 Jules Doe. All rights reserved." },
  showFramerCredit: { type: ControlType.Boolean, title: "Show Framer Credit", defaultValue: true }
});
