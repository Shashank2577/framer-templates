import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useTheme } from "./shared/ThemeProvider";
import { Container } from "./shared/Container";
import { SectionLabel } from "./shared/SectionLabel";
import ProjectDetail from "./ProjectDetail";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  role: string;
  date: string;
}

interface ProjectGridProps {
  projects: ProjectData[];
  layoutVariant: "Desktop" | "Tablet" | "Mobile";
}

const ProjectCard = ({ project, onClick }: { project: ProjectData; onClick: () => void }) => {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"] // Trigger as it comes into view
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "relative",
        cursor: "pointer",
        clipPath,
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "20px", // space in masonry
      }}
      onClick={onClick}
      whileHover="hover"
      initial="rest"
    >
      <motion.img
        layoutId={`project-image-${project.id}`}
        src={project.imageUrl}
        alt={project.title}
        style={{
          width: "100%",
          display: "block",
          objectFit: "cover",
          aspectRatio: "3/4", // Masonry variation handled via grid layout in parent
        }}
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.05 }
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Overlay */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "32px",
        }}
      >
        <motion.div
          variants={{
            rest: { y: 20 },
            hover: { y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3 style={{
            color: "#fff",
            margin: "0 0 8px 0",
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px"
          }}>
            {project.title}
          </h3>
          <span style={{
            color: "#ccc",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}>
            {project.category}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectGrid({ projects = defaultProjects, layoutVariant = "Desktop" }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const columnCount = layoutVariant === "Mobile" ? 1 : 2;

  return (
    <section id="work" style={{ padding: "160px 0" }}>
      <Container>
        <SectionLabel number="01." title="Selected Work" />

        <div style={{
          display: "block",
          columnCount: columnCount,
          columnGap: "20px",
        }}>
          {projects.map((project) => (
            <div key={project.id} style={{ breakInside: "avoid" }}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </section>
  );
}

const defaultProjects: ProjectData[] = [
  {
    id: "p1",
    title: "Fintech App",
    category: "Product Design",
    imageUrl: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1200&auto=format&fit=crop",
    description: "A comprehensive redesign of a leading fintech application focusing on user experience and trust.",
    role: "Lead Designer",
    date: "2023"
  },
  {
    id: "p2",
    title: "Brand Identity",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format&fit=crop",
    description: "Modern brand identity for a sustainable fashion startup including logo, typography, and packaging.",
    role: "Art Director",
    date: "2023"
  },
  {
    id: "p3",
    title: "Editorial Website",
    category: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
    description: "An editorial platform design emphasizing typography and immersive reading experiences.",
    role: "UI/UX Designer",
    date: "2022"
  },
  {
    id: "p4",
    title: "Premium Packaging",
    category: "Packaging",
    imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
    description: "Packaging design for a luxury skincare line using sustainable materials and minimalist aesthetics.",
    role: "Designer",
    date: "2022"
  }
];

addPropertyControls(ProjectGrid, {
  projects: {
    type: ControlType.Array,
    control: {
      type: ControlType.Object,
      controls: {
        id: { type: ControlType.String },
        title: { type: ControlType.String },
        category: { type: ControlType.String },
        imageUrl: { type: ControlType.Image },
        description: { type: ControlType.String, displayTextArea: true },
        role: { type: ControlType.String },
        date: { type: ControlType.String }
      }
    },
    defaultValue: defaultProjects,
  },
  layoutVariant: {
    type: ControlType.Enum,
    options: ["Desktop", "Tablet", "Mobile"],
    defaultValue: "Desktop",
    title: "Layout Variant"
  }
});
