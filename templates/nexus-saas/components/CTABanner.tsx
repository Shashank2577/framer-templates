import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"
import Button from "./shared/Button"

export default function CTABanner(props) {
    const { headline, subtitle, ctaLabel, ctaLink, variant } = props
    const { scrollYProgress } = useScroll()
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    // Subtle background shift tied to scroll
    const bgPosition = useTransform(scrollYProgress, [0, 1], ["0% 0%", "100% 100%"])

    const sectionStyle = {
        padding: "120px 0",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
    }

    const bannerStyle = {
        background: `linear-gradient(135deg, ${theme.colors.primary}, rgba(124, 58, 237, 0.8))`,
        borderRadius: "24px",
        padding: "80px 40px",
        textAlign: "center" as const,
        position: "relative" as const,
        overflow: "hidden",
        boxShadow: `0 20px 40px ${theme.colors.primary}30`,
    }

    const patternOverlayStyle = {
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.5,
    }

    const contentStyle = {
        position: "relative" as const,
        zIndex: 1,
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "24px",
    }

    const headlineStyle = {
        ...theme.typography.headings.h2,
        color: "#ffffff",
        margin: 0,
    }

    const subtitleStyle = {
        ...theme.typography.body,
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: "18px",
        margin: 0,
    }

    return (
        <section style={sectionStyle}>
            <Container>
                <motion.div
                    style={bannerStyle}
                    initial={isCanvas ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    <motion.div
                        style={isCanvas ? { ...patternOverlayStyle, backgroundPosition: "0% 0%" } : { ...patternOverlayStyle, backgroundPosition: bgPosition }}
                    />

                    <div style={contentStyle}>
                        <h2 style={headlineStyle}>{headline}</h2>
                        <p style={subtitleStyle}>{subtitle}</p>
                        <div style={{ marginTop: "16px" }}>
                            <Button
                                label={ctaLabel}
                                link={ctaLink}
                                variant="secondary"
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: theme.colors.primary,
                                    border: "none",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}

CTABanner.defaultProps = {
    variant: "Desktop",
    headline: "Ready to scale your business?",
    subtitle: "Join thousands of teams already using Nexus to build better products, faster.",
    ctaLabel: "Get Started for Free",
    ctaLink: "#get-started",
}

addPropertyControls(CTABanner, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    headline: { type: ControlType.String, title: "Headline" },
    subtitle: { type: ControlType.String, title: "Subtitle", displayTextArea: true },
    ctaLabel: { type: ControlType.String, title: "CTA Label" },
    ctaLink: { type: ControlType.String, title: "CTA Link" },
})
