import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./shared/ThemeProvider";
import { ProjectData } from "./ProjectGrid";

interface ProjectDetailProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { colors } = useTheme();

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{ overflow: "hidden", marginTop: "40px" }}
        >
          <div style={{
            backgroundColor: colors.surface,
            padding: "40px",
            borderRadius: "8px",
            position: "relative",
            border: `1px solid ${colors.border}`
          }}>

            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: colors.text,
                cursor: "pointer",
                zIndex: 10,
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: colors.background, // make it visible over image
              }}
            >
              ✕
            </motion.button>

            <motion.img
              layoutId={`project-image-${project.id}`}
              src={project.imageUrl}
              alt={project.title}
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "40px",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "48px",
                margin: 0,
                color: colors.text,
              }}>
                {project.title}
              </h2>

              <div style={{ display: "flex", gap: "24px", color: colors.muted, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <span>Role: {project.role}</span>
                <span>Date: {project.date}</span>
                <span>Category: {project.category}</span>
              </div>

              <p style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: colors.text,
                margin: 0,
              }}>
                {project.description}
              </p>

              {/* Mock Gallery Horizontal Scroll */}
              <div style={{ marginTop: "40px" }}>
                 <h3 style={{ fontSize: "20px", fontFamily: "'Playfair Display', serif", marginBottom: "16px", color: colors.text }}>Process Gallery</h3>
                 <motion.div
                    drag="x"
                    dragConstraints={{ left: -500, right: 0 }}
                    style={{ display: "flex", gap: "16px", cursor: "grab" }}
                 >
                    {[1,2,3].map((i) => (
                      <img
                        key={i}
                        src={`https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=400&auto=format&fit=crop&sig=${i}`}
                        alt="Gallery detail"
                        style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "8px", pointerEvents: "none" }}
                      />
                    ))}
                 </motion.div>
                 <p style={{ fontSize: "12px", color: colors.muted, marginTop: "8px", textAlign: "right" }}>Swipe to view →</p>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
