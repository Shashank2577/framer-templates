import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"

export default function Footer(props) {
    const { columns, copyright, socialLinks, variant } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const footerStyle = {
        backgroundColor: "#050508", // Slightly darker than background
        padding: "80px 0 40px 0",
        fontFamily: theme.typography.fontFamily,
        borderTop: `1px solid ${theme.colors.muted}20`,
    }

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: variant === "Mobile" ? "1fr" : variant === "Tablet" ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: "48px",
        marginBottom: "80px",
    }

    const columnTitleStyle = {
        color: theme.colors.text,
        fontSize: "16px",
        fontWeight: 600,
        marginBottom: "24px",
    }

    const linkListStyle = {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
    }

    const linkStyle = {
        color: theme.colors.muted,
        textDecoration: "none",
        fontSize: "15px",
        transition: "color 0.2s",
    }

    const bottomBarStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "32px",
        borderTop: `1px solid ${theme.colors.muted}20`,
        flexWrap: "wrap" as const,
        gap: "24px",
    }

    const copyrightStyle = {
        color: theme.colors.muted,
        fontSize: "14px",
        margin: 0,
    }

    const socialContainerStyle = {
        display: "flex",
        gap: "16px",
    }

    const socialIconStyle = {
        color: theme.colors.muted,
        fontSize: "20px",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: `${theme.colors.muted}10`,
        transition: "all 0.2s",
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    }

    return (
        <footer style={footerStyle}>
            <Container>
                <motion.div
                    style={gridStyle}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    {columns.map((col, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <h4 style={columnTitleStyle}>{col.title}</h4>
                            <ul style={linkListStyle}>
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <motion.a
                                            href={link.url}
                                            style={linkStyle}
                                            whileHover={!isCanvas ? { color: theme.colors.primary, x: 2 } : {}}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            {link.label}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <div style={bottomBarStyle}>
                    <p style={copyrightStyle}>{copyright}</p>
                    <div style={socialContainerStyle}>
                        {socialLinks.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.url}
                                style={socialIconStyle}
                                whileHover={!isCanvas ? {
                                    y: -4,
                                    color: theme.colors.primary,
                                    backgroundColor: `${theme.colors.primary}20`
                                } : {}}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                title={social.platform}
                            >
                                {/* Fallback to platform initial if no icon provided */}
                                {social.icon || social.platform.charAt(0)}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    )
}

Footer.defaultProps = {
    variant: "Desktop",
    columns: [
        {
            title: "Product",
            links: [
                { label: "Features", url: "#" },
                { label: "Integrations", url: "#" },
                { label: "Pricing", url: "#" },
                { label: "Changelog", url: "#" },
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About Us", url: "#" },
                { label: "Careers", url: "#" },
                { label: "Blog", url: "#" },
                { label: "Contact", url: "#" },
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "Community", url: "#" },
                { label: "Help Center", url: "#" },
                { label: "API Documentation", url: "#" },
                { label: "Status", url: "#" },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", url: "#" },
                { label: "Terms of Service", url: "#" },
                { label: "Cookie Policy", url: "#" },
            ]
        }
    ],
    copyright: "© 2024 Nexus Inc. All rights reserved.",
    socialLinks: [
        { platform: "Twitter", url: "#", icon: "𝕏" },
        { platform: "GitHub", url: "#", icon: "GH" },
        { platform: "LinkedIn", url: "#", icon: "in" },
        { platform: "Discord", url: "#", icon: "D" },
    ]
}

addPropertyControls(Footer, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    columns: {
        type: ControlType.Array,
        title: "Columns",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String },
                links: {
                    type: ControlType.Array,
                    control: {
                        type: ControlType.Object,
                        controls: {
                            label: { type: ControlType.String },
                            url: { type: ControlType.String }
                        }
                    }
                }
            }
        }
    },
    copyright: { type: ControlType.String, title: "Copyright Text" },
    socialLinks: {
        type: ControlType.Array,
        title: "Social Links",
        control: {
            type: ControlType.Object,
            controls: {
                platform: { type: ControlType.String },
                url: { type: ControlType.String },
                icon: { type: ControlType.String, title: "Icon (Emoji/Text)" }
            }
        }
    }
})
