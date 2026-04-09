import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"
import SectionHeader from "./shared/SectionHeader"

export default function FeaturesGrid(props) {
    const { title, subtitle, features, variant } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const sectionStyle = {
        padding: "120px 0",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
    }

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: variant === "Mobile" ? "1fr" : variant === "Tablet" ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        gap: theme.spacing.gridGap,
        marginTop: "64px",
    }

    const cardStyle = {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.cards,
        padding: "32px",
        border: `1px solid ${theme.colors.muted}20`,
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
    }

    const iconStyle = {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        backgroundColor: `${theme.colors.primary}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.colors.primary,
        fontSize: "24px",
        marginBottom: "8px",
    }

    const cardTitleStyle = {
        ...theme.typography.headings.h4,
        color: theme.colors.text,
        margin: 0,
    }

    const cardDescStyle = {
        ...theme.typography.body,
        color: theme.colors.muted,
        margin: 0,
        fontSize: "15px",
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }

    return (
        <section style={sectionStyle}>
            <Container>
                <SectionHeader title={title} subtitle={subtitle} />

                <motion.div
                    style={gridStyle}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            style={cardStyle}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: `0 20px 40px ${theme.colors.primary}15`,
                                borderColor: `${theme.colors.primary}40`
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <motion.div
                                style={iconStyle}
                                whileHover={{ rotate: 5, scale: 1.1 }}
                            >
                                {/* Render image or emoji for simplicity in this template */}
                                {feature.icon.includes('http') ? (
                                    <img src={feature.icon} alt="" style={{width: 24, height: 24}} />
                                ) : (
                                    <span>{feature.icon || "✨"}</span>
                                )}
                            </motion.div>
                            <h3 style={cardTitleStyle}>{feature.title}</h3>
                            <p style={cardDescStyle}>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

FeaturesGrid.defaultProps = {
    variant: "Desktop",
    title: "Everything you need to scale",
    subtitle: "Powerful features designed to help your team work faster, smarter, and more collaboratively.",
    features: [
        { icon: "⚡️", title: "Lightning Fast", description: "Built on modern architecture for ultimate speed and performance." },
        { icon: "🛡️", title: "Enterprise Security", description: "Bank-grade encryption and compliance built in by default." },
        { icon: "📊", title: "Advanced Analytics", description: "Deep insights into user behavior and product usage." },
        { icon: "🧩", title: "Seamless Integrations", description: "Connect with your favorite tools in just a few clicks." },
        { icon: "💬", title: "Real-time Collab", description: "Work together with your team in real-time, anywhere." },
        { icon: "⚙️", title: "Automated Workflows", description: "Save time by automating repetitive tasks and processes." },
    ]
}

addPropertyControls(FeaturesGrid, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    title: { type: ControlType.String, title: "Title" },
    subtitle: { type: ControlType.String, title: "Subtitle", displayTextArea: true },
    features: {
        type: ControlType.Array,
        title: "Features",
        control: {
            type: ControlType.Object,
            controls: {
                icon: { type: ControlType.String, title: "Icon (Emoji/URL)" },
                title: { type: ControlType.String, title: "Title" },
                description: { type: ControlType.String, title: "Description", displayTextArea: true },
            }
        }
    }
})
