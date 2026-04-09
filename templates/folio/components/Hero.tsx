import React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";

interface HeroProps {
  displayName: string;
  tagline: string;
  showScrollIndicator: boolean;
}

export default function Hero({
  displayName = "Creative Developer & Designer",
  tagline = "Building minimal, motion-driven digital experiences.",
  showScrollIndicator = true
}: HeroProps) {
  const { colors } = useTheme();

  // Split name for typewriter effect
  const characters = Array.from(displayName);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      paddingTop: "64px", // offset for nav
      backgroundColor: colors.background,
      backgroundImage: "url('https://images.unsplash.com/photo-1621245842813-f61d2d385f0c?q=80&w=400&auto=format&fit=crop')",
      backgroundBlendMode: "overlay",
      backgroundSize: "200px", // tiny tiled noise
      backgroundRepeat: "repeat",
      opacity: 0.98, // simulate slight overlay
    }}>
      <Container>
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 100px)", // Massive headline
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 24px 0",
            color: colors.text,
            letterSpacing: "-0.02em",
            maxWidth: "900px",
          }}
        >
          {characters.map((char, index) => (
            <motion.span key={index} variants={childVariants} style={{ display: "inline-block", whiteSpace: "pre" }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: characters.length * 0.05 + 0.3, duration: 0.8 }}
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: colors.muted,
            maxWidth: "600px",
            margin: 0,
          }}
        >
          {tagline}
        </motion.p>
      </Container>

      {showScrollIndicator && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: colors.muted }}>Scroll</span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0L6 14M6 14L1 9M6 14L11 9" stroke={colors.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}
    </section>
  );
}

addPropertyControls(Hero, {
  displayName: {
    type: ControlType.String,
    title: "Display Name",
    defaultValue: "Jules Doe",
  },
  tagline: {
    type: ControlType.String,
    title: "Tagline",
    defaultValue: "Building minimal, motion-driven digital experiences.",
  },
  showScrollIndicator: {
    type: ControlType.Boolean,
    title: "Scroll Indicator",
    defaultValue: true,
  },
});
