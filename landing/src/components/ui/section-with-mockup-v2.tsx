// components/SectionWithMockup.tsx
'use client';

import React from "react";
import { motion, cubicBezier } from "framer-motion";

interface SectionWithMockupV2Props {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    primaryComponent?: React.ReactNode;
    secondaryImageSrc?: string;
    reverseLayout?: boolean;
}

const SectionWithMockupV2: React.FC<SectionWithMockupV2Props> = ({
    title,
    description,
    primaryComponent,
    secondaryImageSrc,
    reverseLayout = false,
}) => {

    const containerVariants = {
        hidden: {},
        visible: {
             transition: {
                staggerChildren: 0.2,
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.4,0,0.2,1) } },
    };

    const layoutClasses = reverseLayout
        ? "md:grid-cols-2 md:grid-flow-col-dense"
        : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";


    return (
        <section className="relative py-24 md:py-48 bg-black overflow-hidden">
            <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
                <motion.div
                     className={`grid grid-cols-1 gap-16 md:gap-28 w-full items-center ${layoutClasses}`}
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
                        variants={itemVariants}
                    >
                         <div className="space-y-2 md:space-y-1">
                            <h2 className="text-white text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                                {title}
                            </h2>
                        </div>

                        <p className="text-[#868f97] text-sm md:text-[15px] leading-6">
                            {description}
                        </p>
                         {/* Optional: Add a button or link here */}
                         {/* <div>
                            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">Learn More</button>
                         </div> */}
                    </motion.div>

                    {/* App mockup/Image Content */}
                    <motion.div
                        className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
                        variants={itemVariants}
                    >
                        {/* Decorative Background Element */}
                        {secondaryImageSrc && (
                            <motion.div
                                 className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0`}
                                 style={{
                                    top: reverseLayout ? 'auto' : '10%',
                                    bottom: reverseLayout ? '10%' : 'auto',
                                    left: reverseLayout ? 'auto' : '-20%',
                                    right: reverseLayout ? '-20%' : 'auto',
                                    transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                                    filter: 'blur(2px)',
                                    opacity: 0.3
                                }}
                                initial={{ y: reverseLayout ? 0 : 0 }}
                                whileInView={{ y: reverseLayout ? -20 : -30 }}
                                transition={{ duration: 1.2, ease: cubicBezier(0.4,0,0.2,1) }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <div
                                    className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                                    style={{
                                        backgroundImage: `url(${secondaryImageSrc})`,
                                    }}
                                />
                            </motion.div>
                        )}

                        {/* Main Mockup Card */}
                        <motion.div
                            className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                            initial={{ y: reverseLayout ? 0 : 0 }}
                            whileInView={{ y: reverseLayout ? 20 : 30 }}
                             transition={{ duration: 1.2, ease: cubicBezier(0.4,0,0.2,1), delay: 0.1 }}
                             viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="p-0 h-full">
                                {primaryComponent || (
                                    <div className="w-full h-full bg-[#1a1a1a] rounded-[32px] flex items-center justify-center">
                                        <p className="text-white/60">Component Preview</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative bottom gradient */}
            <div
                className="absolute w-full h-px bottom-0 left-0 z-0"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
                }}
            />
        </section>
    );
};


export default SectionWithMockupV2;