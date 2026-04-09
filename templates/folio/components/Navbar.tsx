import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";

interface NavbarProps {
  name: string;
  links: string[];
  layoutVariant: "Desktop" | "Tablet" | "Mobile";
}

export default function Navbar({ name = "Jules Doe", links = ["Work", "About", "Contact"], layoutVariant = "Desktop" }: NavbarProps) {
  const { theme, toggleTheme, colors } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const nameScale = useTransform(scrollY, [0, 300], [1, 0.85]);

  const isMobile = layoutVariant === "Mobile" || layoutVariant === "Tablet";

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "24px 0",
      background: `linear-gradient(to bottom, ${colors.background} 0%, transparent 100%)`,
    }}>
      <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <motion.div style={{ scale: nameScale, transformOrigin: "left center" }}>
          <a href="#" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            color: colors.text,
            textDecoration: "none"
          }}>
            {name}
          </a>
        </motion.div>

        {!isMobile && (
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: colors.text,
                  textDecoration: "none",
                  fontSize: "17px",
                  fontWeight: 500,
                }}
              >
                {link}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  layoutId="theme-icon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        )}

        {isMobile && (
          <div style={{ display: "block" }}>
             <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: colors.text,
                fontSize: "24px",
              }}
            >
              ☰
            </button>
          </div>
        )}

      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "80%",
              maxWidth: "300px",
              backgroundColor: colors.surface,
              borderLeft: `1px solid ${colors.border}`,
              zIndex: 200,
              padding: "48px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                alignSelf: "flex-end",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: colors.text,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "48px" }}>
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: colors.text,
                    textDecoration: "none",
                    fontSize: "24px",
                    fontWeight: 500,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {link}
                </a>
              ))}
              <div style={{ marginTop: "24px" }}>
                 <button
                  onClick={toggleTheme}
                  style={{
                    background: "transparent",
                    border: `1px solid ${colors.border}`,
                    cursor: "pointer",
                    padding: "12px 24px",
                    color: colors.text,
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {theme === "light" ? "Switch to Dark Mode 🌙" : "Switch to Light Mode ☀️"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

addPropertyControls(Navbar, {
  name: {
    type: ControlType.String,
    title: "Name",
    defaultValue: "Jules Doe",
  },
  links: {
    type: ControlType.Array,
    control: { type: ControlType.String },
    title: "Links",
    defaultValue: ["Work", "About", "Contact"],
  },
  layoutVariant: {
    type: ControlType.Enum,
    options: ["Desktop", "Tablet", "Mobile"],
    defaultValue: "Desktop",
    title: "Layout Variant"
  }
});
