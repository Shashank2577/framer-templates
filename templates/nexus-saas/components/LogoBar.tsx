import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"

export default function LogoBar(props) {
    const { label, logos, variant } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const sectionStyle = {
        padding: "60px 0",
        backgroundColor: theme.colors.background,
        overflow: "hidden",
        fontFamily: theme.typography.fontFamily,
    }

    const labelStyle = {
        textAlign: "center" as const,
        color: theme.colors.muted,
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
        marginBottom: "32px",
    }

    const marqueeContainerStyle = {
        display: "flex",
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }

    const trackStyle = {
        display: "flex",
        gap: "64px",
        paddingRight: "64px",
        alignItems: "center",
    }

    const logoStyle = {
        height: "32px",
        objectFit: "contain" as const,
        opacity: 0.6,
        filter: "grayscale(100%)",
        transition: "all 0.3s ease",
    }

    // Duplicate logos to ensure seamless looping
    const extendedLogos = [...logos, ...logos]

    return (
        <section style={sectionStyle}>
            <Container>
                <div style={labelStyle}>{label}</div>
                <div style={marqueeContainerStyle}>
                    <motion.div
                        style={trackStyle}
                        animate={isCanvas ? {} : { x: ["0%", "-50%"] }}
                        transition={isCanvas ? {} : {
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20, // Adjust speed here
                        }}
                    >
                        {extendedLogos.map((logo, index) => (
                            <motion.img
                                key={index}
                                src={logo}
                                alt={`Logo ${index}`}
                                style={logoStyle}
                                whileHover={{
                                    filter: "grayscale(0%)",
                                    opacity: 1,
                                    scale: 1.05,
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}

LogoBar.defaultProps = {
    variant: "Desktop",
    label: "Trusted by innovative teams worldwide",
    logos: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&q=80&auto=format&fit=crop", // placeholder
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=128&q=80&auto=format&fit=crop", // placeholder
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055ce?w=128&q=80&auto=format&fit=crop", // placeholder
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=128&q=80&auto=format&fit=crop", // placeholder
        "https://images.unsplash.com/photo-1611162617221-55309673242f?w=128&q=80&auto=format&fit=crop", // placeholder
    ],
}

addPropertyControls(LogoBar, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    label: { type: ControlType.String, title: "Label" },
    logos: {
        type: ControlType.Array,
        control: { type: ControlType.Image },
        title: "Logos",
    },
})
