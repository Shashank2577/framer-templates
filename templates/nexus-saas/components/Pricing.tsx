import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"
import SectionHeader from "./shared/SectionHeader"
import Button from "./shared/Button"

export default function Pricing(props) {
    const { title, subtitle, monthlyLabel, annualLabel, tiers, variant } = props
    const [isAnnual, setIsAnnual] = useState(false)

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const isMobile = variant === "Tablet" || variant === "Mobile"

    const sectionStyle = {
        padding: "120px 0",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
    }

    const toggleContainerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        margin: "48px 0 64px 0",
    }

    const toggleWrapperStyle = {
        display: "flex",
        backgroundColor: theme.colors.surface,
        borderRadius: "100px",
        padding: "4px",
        position: "relative" as const,
        border: `1px solid ${theme.colors.muted}30`,
    }

    const toggleButtonStyle = (isActive) => ({
        padding: "8px 24px",
        borderRadius: "100px",
        border: "none",
        background: "transparent",
        color: isActive ? "#ffffff" : theme.colors.muted,
        fontWeight: 600,
        fontSize: "14px",
        cursor: "pointer",
        position: "relative" as const,
        zIndex: 1,
        transition: "color 0.2s",
    })

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? "48px" : "32px",
        alignItems: "center",
        maxWidth: isMobile ? "500px" : "none",
        margin: isMobile ? "0 auto" : "0",
    }

    const getCardStyle = (isHighlighted) => ({
        backgroundColor: theme.colors.surface,
        borderRadius: "24px",
        padding: "40px",
        border: isHighlighted ? `2px solid ${theme.colors.primary}` : `1px solid ${theme.colors.muted}30`,
        position: "relative" as const,
        display: "flex",
        flexDirection: "column" as const,
        transform: isHighlighted && !isMobile ? "scale(1.05)" : "none",
        boxShadow: isHighlighted ? `0 20px 40px ${theme.colors.primary}15` : "none",
    })

    const badgeStyle = {
        position: "absolute" as const,
        top: "-14px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: theme.colors.primary,
        color: "#fff",
        padding: "4px 16px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
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
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    }

    return (
        <section style={sectionStyle}>
            <Container>
                <SectionHeader title={title} subtitle={subtitle} />

                {/* Toggle */}
                <div style={toggleContainerStyle}>
                    <span style={{ color: theme.colors.text, fontWeight: 500 }}>{monthlyLabel}</span>
                    <div style={toggleWrapperStyle}>
                        <button
                            style={toggleButtonStyle(!isAnnual)}
                            onClick={() => setIsAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button
                            style={toggleButtonStyle(isAnnual)}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annual
                        </button>
                        {/* Highlight Pill */}
                        <motion.div
                            layoutId="pricing-highlight"
                            style={{
                                position: "absolute",
                                top: 4,
                                bottom: 4,
                                left: isAnnual ? "50%" : 4,
                                width: "calc(50% - 4px)",
                                backgroundColor: theme.colors.primary,
                                borderRadius: "100px",
                                zIndex: 0,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    </div>
                    <span style={{ color: theme.colors.text, fontWeight: 500 }}>{annualLabel}</span>
                </div>

                {/* Pricing Grid */}
                <motion.div
                    style={gridStyle}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            style={getCardStyle(tier.isHighlighted)}
                            whileHover={!isCanvas && !isMobile ? { scale: tier.isHighlighted ? 1.07 : 1.03 } : (!isCanvas ? { scale: 1.02 } : {})}
                            variants={itemVariants}
                        >
                            {tier.isHighlighted && <div style={badgeStyle}>Most Popular</div>}

                            <h3 style={{ margin: "0 0 16px 0", color: theme.colors.text, fontSize: "24px" }}>
                                {tier.name}
                            </h3>

                            <div style={{ display: "flex", alignItems: "baseline", marginBottom: "32px", height: "60px" }}>
                                <span style={{ fontSize: "24px", color: theme.colors.text }}>$</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={isAnnual ? "annual" : "monthly"}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ fontSize: "48px", fontWeight: 700, color: theme.colors.text }}
                                    >
                                        {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                                    </motion.span>
                                </AnimatePresence>
                                <span style={{ color: theme.colors.muted, marginLeft: "8px" }}>/mo</span>
                            </div>

                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", flexGrow: 1 }}>
                                {tier.features.map((feat, j) => (
                                    <li key={j} style={{ display: "flex", gap: "12px", marginBottom: "16px", color: theme.colors.text }}>
                                        <span style={{ color: theme.colors.secondary }}>✓</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                label={tier.ctaLabel}
                                variant={tier.isHighlighted ? "primary" : "secondary"}
                                style={{ width: "100%" }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

Pricing.defaultProps = {
    variant: "Desktop",
    title: "Simple, transparent pricing",
    subtitle: "Choose the plan that best fits your needs. No hidden fees.",
    monthlyLabel: "Monthly",
    annualLabel: "Annual (Save 20%)",
    tiers: [
        {
            name: "Basic",
            monthlyPrice: "29",
            annualPrice: "24",
            features: ["Up to 5 users", "Basic analytics", "24hr support response", "Custom domains"],
            ctaLabel: "Start Free Trial",
            isHighlighted: false
        },
        {
            name: "Pro",
            monthlyPrice: "79",
            annualPrice: "64",
            features: ["Unlimited users", "Advanced analytics", "1hr support response", "Custom domains", "API access"],
            ctaLabel: "Get Started",
            isHighlighted: true
        },
        {
            name: "Enterprise",
            monthlyPrice: "299",
            annualPrice: "249",
            features: ["Everything in Pro", "Dedicated success manager", "SSO integration", "Custom SLAs", "On-premise option"],
            ctaLabel: "Contact Sales",
            isHighlighted: false
        }
    ]
}

addPropertyControls(Pricing, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    title: { type: ControlType.String, title: "Title" },
    subtitle: { type: ControlType.String, title: "Subtitle" },
    monthlyLabel: { type: ControlType.String, title: "Monthly Label" },
    annualLabel: { type: ControlType.String, title: "Annual Label" },
    tiers: {
        type: ControlType.Array,
        title: "Tiers",
        control: {
            type: ControlType.Object,
            controls: {
                name: { type: ControlType.String },
                monthlyPrice: { type: ControlType.String },
                annualPrice: { type: ControlType.String },
                features: { type: ControlType.Array, control: { type: ControlType.String } },
                ctaLabel: { type: ControlType.String },
                isHighlighted: { type: ControlType.Boolean }
            }
        }
    }
})
