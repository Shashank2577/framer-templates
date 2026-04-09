import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Button from "./shared/Button"
import Container from "./shared/Container"

export default function Hero(props) {
    const { overline, headline, body, primaryCta, secondaryCta, heroImageUrl, variant } = props
    const { scrollY } = useScroll()

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const isMobile = variant === "Tablet" || variant === "Mobile"

    // Background glow transform
    const glowY = useTransform(scrollY, [0, 500], [0, 100])
    const glowOpacity = useTransform(scrollY, [0, 500], [0.15, 0])

    const sectionStyle = {
        minHeight: isCanvas ? "600px" : "calc(100vh - 72px)",
        paddingTop: "120px",
        paddingBottom: "80px",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        position: "relative" as const,
        overflow: "hidden",
        fontFamily: theme.typography.fontFamily,
    }

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "60% 40%",
        gap: "48px",
        alignItems: "center",
        textAlign: isMobile ? ("center" as const) : ("left" as const),
    }

    const textColumnStyle = {
        display: "flex",
        flexDirection: "column" as const,
        gap: "24px",
        alignItems: isMobile ? ("center" as const) : ("flex-start" as const),
    }

    const overlineStyle = {
        color: theme.colors.secondary,
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
        fontSize: "14px",
    }

    const headlineStyle = {
        ...theme.typography.headings.h1,
        color: theme.colors.text,
        margin: 0,
    }

    const bodyStyle = {
        ...theme.typography.body,
        color: theme.colors.muted,
        fontSize: "18px",
        maxWidth: "540px",
        margin: 0,
    }

    const buttonGroupStyle = {
        display: "flex",
        gap: "16px",
        marginTop: "16px",
        flexWrap: "wrap" as const,
        justifyContent: isMobile ? ("center" as const) : ("flex-start" as const),
    }

    const imageContainerStyle = {
        position: "relative" as const,
        width: "100%",
        paddingTop: "100%", // 1:1 aspect ratio
    }

    const imageStyle = {
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain" as const,
    }

    const glowStyle = {
        position: "absolute" as const,
        top: "20%",
        right: "-10%",
        width: "60%",
        height: "60%",
        background: `radial-gradient(circle, ${theme.colors.primary} 0%, transparent 70%)`,
        filter: "blur(100px)",
        zIndex: 0,
        pointerEvents: "none" as const,
        opacity: isCanvas ? 0.15 : undefined, // fallback for canvas
    }

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }

    return (
        <section style={sectionStyle}>
            {!isCanvas && (
                <motion.div
                    style={{
                        ...glowStyle,
                        y: glowY,
                        opacity: glowOpacity
                    }}
                />
            )}
            {isCanvas && <div style={glowStyle} />}

            <Container style={{ zIndex: 1, position: "relative" }}>
                <div style={gridStyle}>
                    <motion.div
                        style={textColumnStyle}
                        initial={isCanvas ? "visible" : "hidden"}
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.12 } }
                        }}
                    >
                        <motion.div variants={textVariants} style={overlineStyle}>
                            {overline}
                        </motion.div>
                        <motion.h1 variants={textVariants} style={headlineStyle}>
                            {headline}
                        </motion.h1>
                        <motion.p variants={textVariants} style={bodyStyle}>
                            {body}
                        </motion.p>
                        <motion.div variants={textVariants} style={buttonGroupStyle}>
                            <Button label={primaryCta} variant="primary" />
                            <Button label={secondaryCta} variant="secondary" />
                        </motion.div>
                    </motion.div>

                    <div style={imageContainerStyle}>
                        <motion.img
                            src={heroImageUrl}
                            alt="Hero illustration"
                            style={imageStyle}
                            animate={isCanvas ? {} : { y: [0, -15, 0] }}
                            transition={isCanvas ? {} : {
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}

Hero.defaultProps = {
    variant: "Desktop",
    overline: "NEW: Nexus Analytics 2.0",
    headline: "Build better products with actionable insights.",
    body: "Nexus gives you the tools to understand your users, optimize flows, and grow your business faster than ever.",
    primaryCta: "Start Free Trial",
    secondaryCta: "Book Demo",
    heroImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", // Placeholder
}

addPropertyControls(Hero, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    overline: { type: ControlType.String, title: "Overline" },
    headline: { type: ControlType.String, title: "Headline", displayTextArea: true },
    body: { type: ControlType.String, title: "Body", displayTextArea: true },
    primaryCta: { type: ControlType.String, title: "Primary CTA" },
    secondaryCta: { type: ControlType.String, title: "Secondary CTA" },
    heroImageUrl: { type: ControlType.Image, title: "Hero Image" },
})
