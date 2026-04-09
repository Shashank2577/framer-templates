import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"
import { theme } from "./theme"

export default function SectionHeader(props) {
    const { title, subtitle, badgeText, align, ...rest } = props

    const containerStyle = {
        fontFamily: theme.typography.fontFamily,
        textAlign: align,
        maxWidth: "800px",
        margin: align === "center" ? "0 auto" : "0",
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
        alignItems: align === "center" ? "center" : "flex-start",
    }

    const badgeStyle = {
        display: "inline-block",
        padding: "4px 12px",
        backgroundColor: `${theme.colors.primary}20`,
        color: theme.colors.primary,
        borderRadius: "100px",
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
    }

    const titleStyle = {
        margin: 0,
        color: theme.colors.text,
        ...theme.typography.headings.h2,
    }

    const subtitleStyle = {
        margin: 0,
        color: theme.colors.muted,
        ...theme.typography.body,
        fontSize: "18px",
    }

    return (
        <motion.div
            style={containerStyle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
            {...rest}
        >
            {badgeText && (
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
                    }}
                    style={badgeStyle}
                >
                    {badgeText}
                </motion.div>
            )}
            <motion.h2
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
                }}
                style={titleStyle}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
                    }}
                    style={subtitleStyle}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}

SectionHeader.defaultProps = {
    title: "Section Title",
    subtitle: "A brief description of this section goes here.",
    badgeText: "",
    align: "center",
}

addPropertyControls(SectionHeader, {
    title: {
        title: "Title",
        type: ControlType.String,
        defaultValue: "Section Title",
    },
    subtitle: {
        title: "Subtitle",
        type: ControlType.String,
        defaultValue: "A brief description of this section goes here.",
        displayTextArea: true,
    },
    badgeText: {
        title: "Badge Text",
        type: ControlType.String,
        defaultValue: "",
    },
    align: {
        title: "Alignment",
        type: ControlType.Enum,
        options: ["left", "center", "right"],
        optionTitles: ["Left", "Center", "Right"],
        defaultValue: "center",
    },
})
