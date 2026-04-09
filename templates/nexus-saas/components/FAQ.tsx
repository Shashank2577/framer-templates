import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { theme } from "./shared/theme"
import Container from "./shared/Container"
import SectionHeader from "./shared/SectionHeader"

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div style={{ borderBottom: `1px solid ${theme.colors.muted}30` }}>
            <button
                onClick={onClick}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    color: theme.colors.text,
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: theme.typography.fontFamily,
                }}
            >
                {question}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ color: theme.colors.muted }}
                >
                    ▼
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{
                            paddingBottom: "24px",
                            margin: 0,
                            color: theme.colors.muted,
                            fontFamily: theme.typography.fontFamily,
                            lineHeight: 1.6
                        }}>
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQ(props) {
    const { title, subtitle, items, variant } = props
    const [openIndex, setOpenIndex] = useState(0)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const sectionStyle = {
        padding: "120px 0",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
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
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }

    return (
        <section style={sectionStyle}>
            <Container style={{ maxWidth: "800px" }}>
                <SectionHeader title={title} subtitle={subtitle} />

                <motion.div
                    style={{ marginTop: "64px" }}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {items.map((item, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <FAQItem
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === i}
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

FAQ.defaultProps = {
    variant: "Desktop",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about the product and billing.",
    items: [
        {
            question: "Is there a free trial available?",
            answer: "Yes, you can try us for free for 14 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
        },
        {
            question: "Can I change my plan later?",
            answer: "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you."
        },
        {
            question: "What is your cancellation policy?",
            answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid."
        },
        {
            question: "Can other info be added to an invoice?",
            answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually."
        },
        {
            question: "How does billing work?",
            answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces."
        },
        {
            question: "How do I change my account email?",
            answer: "You can change the email address associated with your account by going to framer.com/accounts/settings from your laptop or desktop."
        }
    ]
}

addPropertyControls(FAQ, {
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["Desktop", "Tablet", "Mobile"],
        defaultValue: "Desktop",
    },
    title: { type: ControlType.String, title: "Title" },
    subtitle: { type: ControlType.String, title: "Subtitle" },
    items: {
        type: ControlType.Array,
        title: "FAQ Items",
        control: {
            type: ControlType.Object,
            controls: {
                question: { type: ControlType.String },
                answer: { type: ControlType.String, displayTextArea: true }
            }
        }
    }
})
