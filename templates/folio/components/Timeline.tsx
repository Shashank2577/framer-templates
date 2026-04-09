import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";
import { SectionLabel } from "./shared/SectionLabel";

interface TimelineEntry {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
  layoutVariant: "Desktop" | "Tablet" | "Mobile";
}

export default function Timeline({ entries = defaultEntries, layoutVariant = "Desktop" }: TimelineProps) {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const isMobile = layoutVariant === "Mobile";

  return (
    <section style={{ padding: "160px 0", position: "relative" }}>
      <Container>
        <SectionLabel number="03." title="Experience" />

        <div ref={containerRef} style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>

          {/* Timeline Line (SVG draw) */}
          <div
             style={{
               position: "absolute",
               left: isMobile ? "0" : "50%",
               transform: isMobile ? "none" : "translateX(-50%)",
               top: "0",
               bottom: "0",
               width: "2px",
               zIndex: 0
             }}
          >
            <svg style={{ width: "2px", height: "100%" }} preserveAspectRatio="none">
              {/* Background line */}
              <line x1="1" y1="0" x2="1" y2="100%" stroke={colors.border} strokeWidth="2" strokeDasharray="4 4" />
              {/* Drawn line */}
              <motion.line
                x1="1" y1="0" x2="1" y2="100%"
                stroke={colors.accent}
                strokeWidth="2"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            style={{
               display: "flex",
               flexDirection: "column",
               gap: "64px",
               paddingLeft: isMobile ? "48px" : "0"
            }}
          >
            {entries.map((entry, index) => {
              const isLeft = !isMobile && index % 2 === 0;
              const isRight = !isMobile && index % 2 !== 0;

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: isLeft ? -30 : 30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { type: "spring", stiffness: 100, damping: 15 }
                    }
                  }}
                  style={{
                     position: "relative",
                     zIndex: 1,
                     width: isMobile ? "100%" : "50%",
                     alignSelf: isRight ? "flex-end" : "flex-start",
                     paddingRight: isLeft ? "48px" : "0",
                     paddingLeft: isRight ? "48px" : "0",
                  }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    variants={{
                      hidden: { scale: 0 },
                      visible: { scale: 1, transition: { type: "spring" } }
                    }}
                    style={{
                      position: "absolute",
                      left: isMobile ? "-53px" : (isLeft ? "100%" : "0"),
                      transform: isMobile ? "none" : "translate(-50%, 0)",
                      top: "8px",
                      width: "12px",
                      height: "12px",
                      backgroundColor: colors.accent,
                      borderRadius: "50%",
                    }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h3 style={{ margin: 0, fontSize: "24px", fontFamily: "'Playfair Display', serif", color: colors.text }}>{entry.role}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "16px" }}>
                       <span style={{ fontSize: "17px", fontWeight: 500, color: colors.text }}>{entry.company}</span>
                       <span style={{ fontSize: "14px", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{entry.startDate} — {entry.endDate}</span>
                    </div>
                    <p style={{ margin: "16px 0 0 0", fontSize: "16px", lineHeight: 1.6, color: colors.muted }}>
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

const defaultEntries: TimelineEntry[] = [
  {
    role: "Senior Designer",
    company: "DesignCo",
    startDate: "2021",
    endDate: "Present",
    description: "Leading design systems and product vision for enterprise clients."
  },
  {
    role: "Product Designer",
    company: "StartupX",
    startDate: "2018",
    endDate: "2021",
    description: "Designed core mobile application and established brand guidelines."
  },
  {
    role: "Junior Designer",
    company: "Agency Y",
    startDate: "2016",
    endDate: "2018",
    description: "Created marketing materials and website prototypes."
  }
];

addPropertyControls(Timeline, {
  entries: {
    type: ControlType.Array,
    control: {
      type: ControlType.Object,
      controls: {
        role: { type: ControlType.String },
        company: { type: ControlType.String },
        startDate: { type: ControlType.String },
        endDate: { type: ControlType.String },
        description: { type: ControlType.String, displayTextArea: true }
      }
    },
    defaultValue: defaultEntries,
  },
  layoutVariant: {
    type: ControlType.Enum,
    options: ["Desktop", "Tablet", "Mobile"],
    defaultValue: "Desktop",
    title: "Layout Variant"
  }
});
