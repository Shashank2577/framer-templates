import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"
import { theme } from "./theme"

export default function Button(props) {
    const { label, variant, link, ...rest } = props

    const baseStyle = {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 600,
        fontSize: "16px",
        padding: "12px 24px",
        borderRadius: theme.borderRadius.buttons,
        cursor: "pointer",
        display: "inline-block",
        textDecoration: "none",
        textAlign: "center" as const,
        border: "none",
        outline: "none",
    }

    const variants = {
        primary: {
            backgroundColor: theme.colors.primary,
            color: "#ffffff",
        },
        secondary: {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.muted}40`,
        },
        ghost: {
            backgroundColor: "transparent",
            color: theme.colors.text,
        },
    }

    const style = { ...baseStyle, ...variants[variant] }

    const content = (
        <motion.button
            style={style}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            {...rest}
        >
            {label}
        </motion.button>
    )

    if (link) {
        return (
            <a href={link} style={{ textDecoration: "none" }}>
                {content}
            </a>
        )
    }

    return content
}

Button.defaultProps = {
    label: "Click me",
    variant: "primary",
}

addPropertyControls(Button, {
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Click me",
    },
    variant: {
        title: "Variant",
        type: ControlType.Enum,
        options: ["primary", "secondary", "ghost"],
        optionTitles: ["Primary", "Secondary", "Ghost"],
        defaultValue: "primary",
    },
    link: {
        title: "Link",
        type: ControlType.Link,
    },
})
