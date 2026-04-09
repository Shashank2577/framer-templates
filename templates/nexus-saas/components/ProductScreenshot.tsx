import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"

export default function ProductScreenshot(props) {
    const { screenshotUrl, captionTitle, captionSubtitle, variant } = props
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    })

    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    // Tilt effect flattening as we scroll down
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
    const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.5])

    const sectionStyle = {
        padding: "120px 0",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
        overflow: "hidden",
    }

    const headerStyle = {
        textAlign: "center" as const,
        marginBottom: "64px",
    }

    const titleStyle = {
        ...theme.typography.headings.h2,
        color: theme.colors.text,
        margin: "0 0 16px 0",
    }

    const subtitleStyle = {
        ...theme.typography.body,
        color: theme.colors.muted,
        fontSize: "18px",
        margin: 0,
    }

    const mockupContainerStyle = {
        perspective: "1200px",
        maxWidth: "1000px",
        margin: "0 auto",
    }

    const browserFrameStyle = {
        backgroundColor: theme.colors.surface,
        borderRadius: "16px",
        border: `1px solid ${theme.colors.muted}30`,
        overflow: "hidden",
        transformOrigin: "center top",
    }

    const browserHeaderStyle = {
        height: "40px",
        backgroundColor: `${theme.colors.surface}`,
        borderBottom: `1px solid ${theme.colors.muted}30`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "8px",
    }

    const dotStyle = {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
    }

    return (
        <section style={sectionStyle} ref={ref}>
            <Container>
                <motion.div style={isCanvas ? headerStyle : { ...headerStyle, opacity }}>
                    <h2 style={titleStyle}>{captionTitle}</h2>
                    <p style={subtitleStyle}>{captionSubtitle}</p>
                </motion.div>

                <div style={mockupContainerStyle}>
                    <motion.div
                        style={isCanvas ? browserFrameStyle : {
                            ...browserFrameStyle,
                            rotateX,
                            scale,
                            boxShadow: useTransform(shadowOpacity, (v) => `0 40px 80px -20px rgba(124, 58, 237, ${v})`)
                        }}
                    >
                        {/* Browser Chrome */}
                        <div style={browserHeaderStyle}>
                            <div style={{ ...dotStyle, backgroundColor: "#ff5f56" }} />
                            <div style={{ ...dotStyle, backgroundColor: "#ffbd2e" }} />
                            <div style={{ ...dotStyle, backgroundColor: "#27c93f" }} />
                        </div>

                        {/* Screenshot */}
                        <img
                            src={screenshotUrl}
                            alt="Product Interface"
                            style={{ width: "100%", display: "block" }}
                        />
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}

ProductScreenshot.defaultProps = {
    variant: "Desktop",
    screenshotUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    captionTitle: "A beautiful interface for complex data",
    captionSubtitle: "Designed to help you focus on what matters most.",
}

addPropertyControls(ProductScreenshot, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    screenshotUrl: { type: ControlType.Image, title: "Screenshot" },
    captionTitle: { type: ControlType.String, title: "Caption Title" },
    captionSubtitle: { type: ControlType.String, title: "Caption Subtitle" },
})
