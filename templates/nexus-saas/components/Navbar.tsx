import React, { useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Button from "./shared/Button"

export default function Navbar(props) {
    const { logoText, links, ctaLabel, ctaLink, variant } = props
    const { scrollY } = useScroll()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const isMobile = variant === "Mobile"

    const backgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.8])
    const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"])
    const borderOpacity = useTransform(scrollY, [0, 50], [0, 1])
    const bgColor = useTransform(backgroundOpacity, (v) => `rgba(10, 10, 15, ${v})`)
    const borderBottom = useTransform(borderOpacity, (v) => `1px solid rgba(113, 113, 122, ${v * 0.2})`)

    const navStyle = {
        position: isCanvas ? ("relative" as const) : ("fixed" as const),
        top: 0,
        left: 0,
        right: 0,
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 1000,
        fontFamily: theme.typography.fontFamily,
        backgroundColor: isCanvas ? theme.colors.background : undefined,
    }

    const linkStyle = {
        color: theme.colors.text,
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: 500,
        margin: "0 16px",
        opacity: 0.8,
        transition: "opacity 0.2s",
    }

    const mobileMenuStyle = {
        position: isCanvas ? ("absolute" as const) : ("fixed" as const),
        top: "72px",
        left: 0,
        right: 0,
        backgroundColor: theme.colors.surface,
        padding: "24px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
        borderBottom: `1px solid ${theme.colors.muted}40`,
        zIndex: 999,
    }

    return (
        <>
            <motion.nav
                style={isCanvas ? navStyle : {
                    ...navStyle,
                    backgroundColor: bgColor,
                    backdropFilter: backdropBlur,
                    borderBottom,
                }}
            >
                <div style={{ fontWeight: 700, fontSize: "20px", color: theme.colors.text }}>
                    {logoText}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    {!isMobile && (
                        <div style={{ display: "flex", gap: "24px" }}>
                            {links.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.url}
                                    style={linkStyle}
                                    whileHover={!isCanvas ? { opacity: 1, color: theme.colors.primary } : {}}
                                >
                                    {link.title}
                                </motion.a>
                            ))}
                        </div>
                    )}

                    {!isMobile && (
                        <div>
                            <Button label={ctaLabel} link={ctaLink} variant="primary" />
                        </div>
                    )}

                    {isMobile && (
                        <button
                            style={{ background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            ☰
                        </button>
                    )}
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && isMobile && (
                    <motion.div
                        style={mobileMenuStyle}
                        initial={isCanvas ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {links.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                style={{ ...linkStyle, margin: 0, padding: "12px 0", borderBottom: `1px solid ${theme.colors.muted}20` }}
                            >
                                {link.title}
                            </a>
                        ))}
                        <div style={{ marginTop: "16px" }}>
                            <Button label={ctaLabel} link={ctaLink} variant="primary" style={{ width: "100%" }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

Navbar.defaultProps = {
    variant: "Desktop",
    logoText: "Nexus",
    links: [
        { title: "Features", url: "#features" },
        { title: "Pricing", url: "#pricing" },
        { title: "FAQ", url: "#faq" },
    ],
    ctaLabel: "Get Started",
    ctaLink: "#get-started",
}

addPropertyControls(Navbar, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    logoText: {
        title: "Logo Text",
        type: ControlType.String,
        defaultValue: "Nexus",
    },
    links: {
        title: "Links",
        type: ControlType.Array,
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String },
                url: { type: ControlType.String },
            },
        },
        defaultValue: [
            { title: "Features", url: "#features" },
            { title: "Pricing", url: "#pricing" },
            { title: "FAQ", url: "#faq" },
        ],
    },
    ctaLabel: {
        title: "CTA Label",
        type: ControlType.String,
        defaultValue: "Get Started",
    },
    ctaLink: {
        title: "CTA Link",
        type: ControlType.String,
        defaultValue: "#get-started",
    },
})
