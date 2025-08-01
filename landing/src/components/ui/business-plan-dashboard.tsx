'use client';

import React from "react";
import { motion, cubicBezier } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calendar, BarChart3, PieChart } from "lucide-react";

const BusinessPlanDashboard = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const itemTransition = { duration: 0.5, ease: cubicBezier(0.4, 0, 0.2, 1) };

    return (
        <motion.div 
            className="w-full h-[405px] md:h-[637px] bg-[#0a0a0a] rounded-[32px] backdrop-blur-[15px] border border-white/10 overflow-hidden relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="p-6 h-full overflow-y-auto">
                {/* Header */}
                <motion.div variants={itemVariants} transition={itemTransition} className="mb-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Business Plan Overview</h3>
                    <p className="text-[#868f97] text-sm">AI-Powered Fitness App for Busy Professionals</p>
                </motion.div>

                {/* Key Metrics */}
                <motion.div variants={itemVariants} transition={itemTransition} className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#868f97] text-xs">Revenue Projection</span>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white text-lg font-semibold">$2.4M</span>
                            <span className="text-green-400 text-sm">+184%</span>
                        </div>
                    </div>
                    <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#868f97] text-xs">Market Size</span>
                            <Target className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white text-lg font-semibold">$96B</span>
                            <span className="text-blue-400 text-sm">TAM</span>
                        </div>
                    </div>
                </motion.div>

                {/* Revenue Breakdown */}
                <motion.div variants={itemVariants} transition={itemTransition} className="mb-6">
                    <h4 className="text-white text-sm font-medium mb-3">Revenue Streams</h4>
                    <div className="space-y-3">
                        {[
                            { name: "Premium Subscriptions", value: "$1.2M", percent: "+92%", color: "text-green-400" },
                            { name: "Corporate Packages", value: "$780K", percent: "+156%", color: "text-green-400" },
                            { name: "In-App Purchases", value: "$420K", percent: "+43%", color: "text-green-400" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-3 h-3 text-[#868f97]" />
                                    <span className="text-white text-xs">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-xs font-medium">{item.value}</span>
                                    <span className={`text-xs ${item.color}`}>{item.percent}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Key Milestones */}
                <motion.div variants={itemVariants} transition={itemTransition} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Key Milestones</h4>
                        <span className="text-[#868f97] text-xs">Next 12 months</span>
                    </div>
                    <div className="space-y-2">
                        {[
                            { milestone: "MVP Launch", status: "Q1 2024", progress: 85 },
                            { milestone: "Series A Funding", status: "Q2 2024", progress: 45 },
                            { milestone: "10K Users", status: "Q3 2024", progress: 25 },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-[#868f97]" />
                                    <span className="text-white text-xs">{item.milestone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                    <span className="text-[#868f97] text-xs w-12">{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Market Analysis */}
                <motion.div variants={itemVariants} transition={itemTransition} className="mb-4">
                    <h4 className="text-white text-sm font-medium mb-3">Market Analysis</h4>
                    <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
                        <div className="text-[#868f97] text-xs mb-3">
                            The fitness app market is experiencing unprecedented growth, driven by increased health consciousness and remote work trends.
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-white text-sm font-semibold">47%</div>
                                <div className="text-[#868f97] text-xs">Market Growth</div>
                            </div>
                            <div>
                                <div className="text-white text-sm font-semibold">2.3M</div>
                                <div className="text-[#868f97] text-xs">Target Users</div>
                            </div>
                            <div>
                                <div className="text-white text-sm font-semibold">$127</div>
                                <div className="text-[#868f97] text-xs">Avg. Revenue/User</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Next Actions */}
                <motion.div variants={itemVariants} transition={itemTransition}>
                    <h4 className="text-white text-sm font-medium mb-3">Immediate Actions</h4>
                    <div className="space-y-2">
                        {[
                            "Finalize MVP feature set and technical architecture",
                            "Secure initial funding round of $500K seed capital",
                            "Build core team: 2 developers, 1 designer, 1 marketer",
                        ].map((action, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                <span className="text-[#868f97] text-xs leading-relaxed">{action}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BusinessPlanDashboard;