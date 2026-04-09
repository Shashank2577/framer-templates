import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";
import { SectionLabel } from "./shared/SectionLabel";
import { Button } from "./shared/Button";

interface AboutProps {
  portraitUrl: string;
  bioText: string;
  skills: string[];
  resumeFileUrl: string;
  resumeButtonLabel: string;
}

export default function About({
  portraitUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=800&auto=format&fit=crop",
  bioText = "I'm a multidisciplinary designer and developer with a passion for creating functional, beautiful digital products. With over a decade of experience, I've had the pleasure of working with both ambitious startups and established brands. My approach is rooted in simplicity, motion, and intentional typography.",
  skills = ["React", "TypeScript", "Framer Motion", "UI/UX Design", "Creative Direction", "Typography"],
  resumeFileUrl = "#",
  resumeButtonLabel = "Download Resume"
}: AboutProps) {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["0 1", "1.2 1"]
  });

  const portraitScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" style={{ padding: "160px 0" }}>
      <Container>
        <SectionLabel number="02." title="About" />

        <div style={{
          display: "flex",
          gap: "80px",
          flexWrap: "wrap",
        }}>
          {/* Left Column - Portrait */}
          <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
             <motion.img
              ref={portraitRef}
              src={portraitUrl}
              alt="Portrait"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                scale: portraitScale,
                opacity: portraitOpacity,
                filter: "grayscale(100%)", // Keep black & white aesthetic
              }}
            />
          </div>

          {/* Right Column - Bio & Skills */}
          <div style={{ flex: "1 1 calc(60% - 80px)", minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               style={{
                fontSize: "24px",
                lineHeight: 1.6,
                color: colors.text,
                marginBottom: "48px",
                fontFamily: "'Playfair Display', serif"
               }}
            >
              {bioText}
            </motion.p>

            <div style={{ marginBottom: "48px" }}>
              <h4 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: colors.muted, marginBottom: "16px" }}>Core Competencies</h4>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04 } }
                }}
                style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
              >
                {skills.map(skill => (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    style={{
                      padding: "8px 16px",
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      fontSize: "14px",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div>
              <Button as="a" href={resumeFileUrl}>{resumeButtonLabel}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

addPropertyControls(About, {
  portraitUrl: { type: ControlType.Image, title: "Portrait Image" },
  bioText: { type: ControlType.String, displayTextArea: true, title: "Bio Text" },
  skills: { type: ControlType.Array, control: { type: ControlType.String }, title: "Skills" },
  resumeFileUrl: { type: ControlType.File, title: "Resume File", allowedFileTypes: ["pdf"] },
  resumeButtonLabel: { type: ControlType.String, title: "Resume Button Label" },
});
