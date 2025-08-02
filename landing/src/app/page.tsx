"use client";

import { motion } from "framer-motion";
import { FileText, TrendingUp, Target, DollarSign, MessageSquare, Lightbulb, ArrowRight, Sparkles } from "lucide-react";

import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";
import SectionWithMockup from "@/components/ui/section-with-mockup";
import SectionWithMockupV2 from "@/components/ui/section-with-mockup-v2";
import AIChatMockup from "@/components/ui/ai-chat-mockup";
import TestimonialsSection from "@/components/ui/testimonials-section";
import { PricingDemo } from '@/components/ui/pricing-demo';
import { Footer } from '@/components/ui/footer-section';


import { cn } from "@/lib/utils";



function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
  return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}



interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    delay?: number;
}

function FeatureCard({ icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className="relative group"
        >
            <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300">
                <div className={cn(
                    "w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
                    gradient
                )}>
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/60 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Logo (mobile) and Navigation links (desktop) */}
                    <div className="flex items-center">
                        {/* Mobile logo */}
                        <div className="md:hidden">
                            <Sparkles className="size-6 text-white" />
                        </div>
                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="#features" className="text-white/70 hover:text-white transition-colors text-sm font-light">
                                Features
                            </a>
                            <a href="#pricing" className="text-white/70 hover:text-white transition-colors text-sm font-light">
                                Pricing
                            </a>
                            <a href="#advisor" className="text-white/70 hover:text-white transition-colors text-sm font-light whitespace-nowrap">
                                AI Advisor
                            </a>
                            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-light">
                                Community
                            </a>
                        </div>
                    </div>

                    {/* Right side - Action buttons */}
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <button className="text-white/70 hover:text-white transition-colors text-xs md:text-sm font-light px-2 md:px-4 py-2">
                            Log in
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white text-black px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>Get Started</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function BusinessLandingPage() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            icon: <FileText className="w-6 h-6 text-white" />,
            title: "Implementation Document",
            description: "Detailed technical specifications and implementation roadmap for your business idea.",
            gradient: "bg-gradient-to-br from-blue-500/20 to-blue-600/20"
        },
        {
            icon: <Target className="w-6 h-6 text-white" />,
            title: "Marketing Strategy",
            description: "Step-by-step marketing plan with target audience analysis and campaign strategies.",
            gradient: "bg-gradient-to-br from-green-500/20 to-green-600/20"
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            title: "Business Plan",
            description: "Comprehensive business plan with market analysis, financial projections, and growth strategies.",
            gradient: "bg-gradient-to-br from-purple-500/20 to-purple-600/20"
        },
        {
            icon: <DollarSign className="w-6 h-6 text-white" />,
            title: "Monetization Strategy",
            description: "Revenue models and monetization strategies tailored to your specific business idea.",
            gradient: "bg-gradient-to-br from-orange-500/20 to-orange-600/20"
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-white" />,
            title: "Business Copilot AI",
            description: "Chat with your dedicated AI agent to refine and enhance your business documentation.",
            gradient: "bg-gradient-to-br from-rose-500/20 to-rose-600/20"
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-white" />,
            title: "Innovation Insights",
            description: "AI-powered insights and recommendations to optimize your business strategy.",
            gradient: "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20"
        }
    ];

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303]">
            <Navigation />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-purple-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-cyan-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 pt-32">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
                        >
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-white/60 tracking-wide">
                                AI-Powered Business Documentation
                            </span>
                        </motion.div>

                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                    Instantly Validate & Plan
                                </span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white/90 to-purple-300">
                                    Your Business Idea
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <p className="text-lg md:text-xl text-white/60 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                            Get everything you need: business plan, PRD, market research, and growth strategy. Done for you in minutes.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <AnimatedAIChat />
                        </motion.div>

                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/[0.08] border border-green-400/[0.15] mt-10"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm text-green-400 font-medium tracking-wide">
                                Helped 350+ Founders
                            </span>
                        </motion.div>
                    </div>


                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export default function Demo() {
    return (
        <>
            <BusinessLandingPage />
            <SectionWithMockup
                title={
                    <>
                        Strategic Clarity
                        <br />
                        from Day One.
                    </>
                }
                description={
                    <>
                        Transform raw ideas into structured, data-backed business plans.
                        <br />
                        With market insights, financial projections, and execution roadmaps,
                        <br />
                        your next move is always informed.
                    </>
                }
                primaryImageSrc=""
                secondaryImageSrc=""
            />
            
            {/* AI Chat Advisor Section */}
            <SectionWithMockupV2
                title={
                    <>
                        Your Personal
                        <br />
                        Business Advisor.
                    </>
                }
                description={
                    <>
                        Ask real questions. Get practical answers.
                        <br />
                        Whether you&apos;re figuring out how to grow faster, price better, or fix a funnel,
                        <br />
                        your advisor helps you break down the problem and move forward fast.
                    </>
                }
                primaryComponent={<AIChatMockup />}
                reverseLayout={true}
            />
            
            <TestimonialsSection />
            
            <PricingDemo />
            
            <Footer />
        </>
    );
}