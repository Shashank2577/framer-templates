import React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";

interface ContactProps {
  heading: string;
  email: string;
  socialLinks: { platform: string; url: string }[];
}

export default function Contact({
  heading = "Let's work together",
  email = "hello@julesdoe.com",
  socialLinks = [
    { platform: "Twitter", url: "#" },
    { platform: "LinkedIn", url: "#" },
    { platform: "Dribbble", url: "#" }
  ]
}: ContactProps) {
  const { colors } = useTheme();

  return (
    <section id="contact" style={{ padding: "160px 0" }}>
      <Container style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: colors.text,
            marginBottom: "48px"
          }}
        >
          {heading}
        </motion.h2>

        <motion.a
          href={`mailto:${email}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, color: colors.accent }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            display: "inline-block",
            fontSize: "clamp(32px, 6vw, 72px)",
            fontWeight: 700,
            color: colors.text,
            textDecoration: "none",
            marginBottom: "64px",
            wordBreak: "break-all"
          }}
        >
          {email}
        </motion.a>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -3, color: colors.accent }}
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "color 0.2s"
              }}
            >
              {link.platform}
            </motion.a>
          ))}
        </motion.div>

      </Container>
    </section>
  );
}

addPropertyControls(Contact, {
  heading: { type: ControlType.String, title: "Heading", defaultValue: "Let's work together" },
  email: { type: ControlType.String, title: "Email", defaultValue: "hello@julesdoe.com" },
  socialLinks: {
    type: ControlType.Array,
    control: {
      type: ControlType.Object,
      controls: {
        platform: { type: ControlType.String },
        url: { type: ControlType.String }
      }
    },
    defaultValue: [
      { platform: "Twitter", url: "#" },
      { platform: "LinkedIn", url: "#" },
      { platform: "Dribbble", url: "#" }
    ]
  }
});
