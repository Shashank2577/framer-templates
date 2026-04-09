import React from "react"
import { addPropertyControls, ControlType } from "framer"
import { theme } from "./theme"

export default function Container(props) {
    const { children, style, ...rest } = props

    const containerStyle = {
        maxWidth: theme.spacing.contentMaxWidth,
        margin: "0 auto",
        padding: "0 24px",
        width: "100%",
        boxSizing: "border-box" as const,
        ...style,
    }

    return (
        <div style={containerStyle} {...rest}>
            {children}
        </div>
    )
}

addPropertyControls(Container, {
    children: {
        type: ControlType.ComponentInstance,
    },
})
