import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"
import SectionHeader from "./shared/SectionHeader"

export default function Testimonials(props) {
    const { title, subtitle, testimonials, variant } = props
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    })

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const isMobile = variant === "Mobile" || variant === "Tablet"

    const sectionStyle = {
        padding: "120px 0",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
    }

    const gridStyle = {
        display: isMobile ? "flex" : "grid",
        gridTemplateColumns: isMobile ? "none" : "repeat(3, 1fr)",
        gap: theme.spacing.gridGap,
        marginTop: "64px",
        overflowX: isMobile ? "auto" as const : "visible",
        scrollSnapType: isMobile ? "x mandatory" : "none",
        paddingBottom: isMobile ? "24px" : "0",
    }

    const cardContainerStyle = {
        flex: isMobile ? "0 0 85%" : "auto",
        scrollSnapAlign: isMobile ? "center" : "none",
    }

    const cardStyle = {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.cards,
        padding: "32px",
        border: `1px solid ${theme.colors.muted}20`,
        position: "relative" as const,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column" as const,
        height: "100%",
    }

    const quoteStyle = {
        ...theme.typography.body,
        color: theme.colors.text,
        fontStyle: "italic",
        marginBottom: "24px",
        flexGrow: 1,
    }

    const authorStyle = {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    }

    const avatarStyle = {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        objectFit: "cover" as const,
    }

    const nameStyle = {
        fontWeight: 600,
        color: theme.colors.text,
        margin: 0,
    }

    const roleStyle = {
        color: theme.colors.muted,
        fontSize: "14px",
        margin: 0,
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }

    return (
        <section style={sectionStyle} ref={ref}>
            <Container>
                <SectionHeader title={title} subtitle={subtitle} />

                <motion.div
                    style={gridStyle}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {testimonials.map((test, i) => (
                        <div key={i} style={cardContainerStyle}>
                            <motion.div
                                style={cardStyle}
                                variants={itemVariants}
                                whileHover={!isCanvas ? { scale: 1.02 } : {}}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Animated left border */}
                                <motion.div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        width: "4px",
                                        backgroundColor: theme.colors.primary,
                                        height: isCanvas ? "100%" : useTransform(scrollYProgress, [0.3, 0.7], ["0%", "100%"]),
                                    }}
                                />

                                <p style={quoteStyle}>"{test.quote}"</p>

                                <div style={authorStyle}>
                                    <img src={test.avatarUrl} alt={test.name} style={avatarStyle} />
                                    <div>
                                        <p style={nameStyle}>{test.name}</p>
                                        <p style={roleStyle}>{test.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

Testimonials.defaultProps = {
    variant: "Desktop",
    title: "Loved by teams worldwide",
    subtitle: "Don't just take our word for it. See what our customers have to say.",
    testimonials: [
        {
            quote: "Nexus completely transformed how we analyze user data. We can now make decisions in minutes instead of days.",
            name: "Sarah Jenkins",
            role: "Product Lead at TechFlow",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
        },
        {
            quote: "The ease of use combined with powerful enterprise features makes this a no-brainer for any growing team.",
            name: "Marcus Chen",
            role: "CTO at StartUp Inc",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        },
        {
            quote: "We've seen a 40% increase in team productivity since switching. The automation workflows are a game changer.",
            name: "Elena Rodriguez",
            role: "Operations Manager at ScaleUp",
            avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
        }
    ]
}

addPropertyControls(Testimonials, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    title: { type: ControlType.String, title: "Title" },
    subtitle: { type: ControlType.String, title: "Subtitle" },
    testimonials: {
        type: ControlType.Array,
        title: "Testimonials",
        control: {
            type: ControlType.Object,
            controls: {
                quote: { type: ControlType.String, displayTextArea: true },
                name: { type: ControlType.String },
                role: { type: ControlType.String },
                avatarUrl: { type: ControlType.Image }
            }
        }
    }
})
