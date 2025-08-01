'use client';

import React from "react";
import { TrendingUp, DollarSign, Users, Target, ShoppingCart, Zap } from "lucide-react";

const BackgroundDashboard = () => {
    return (
        <div className="w-full h-[405px] md:h-[637px] bg-[#0a0a0a] rounded-[32px] backdrop-blur-[15px] border border-white/8 overflow-hidden">
            <div className="p-6 h-full overflow-y-auto">
                {/* Header */}
                <div className="mb-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Market Analysis Report</h3>
                    <p className="text-[#868f97] text-sm">B2B SaaS Platform for Remote Teams</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#868f97] text-xs">Market Size</span>
                            <Target className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white text-lg font-semibold">$47B</span>
                            <span className="text-purple-400 text-sm">TAM</span>
                        </div>
                    </div>
                    <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#868f97] text-xs">ARR Target</span>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white text-lg font-semibold">$1.2M</span>
                            <span className="text-green-400 text-sm">Y1</span>
                        </div>
                    </div>
                </div>

                {/* Customer Segments */}
                <div className="mb-6">
                    <h4 className="text-white text-sm font-medium mb-3">Target Customers</h4>
                    <div className="space-y-3">
                        {[
                            { segment: "Remote Teams 50-200", revenue: "$8.5K MRR", growth: "+67%" },
                            { segment: "Startups & Scale-ups", revenue: "$4.2K MRR", growth: "+124%" },
                            { segment: "Enterprise Accounts", revenue: "$15K MRR", growth: "+89%" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Users className="w-3 h-3 text-[#868f97]" />
                                    <span className="text-white text-xs">{item.segment}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-xs font-medium">{item.revenue}</span>
                                    <span className="text-green-400 text-xs">{item.growth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Competitive Analysis */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white text-sm font-medium">Competitive Landscape</h4>
                        <span className="text-[#868f97] text-xs">Market share</span>
                    </div>
                    <div className="space-y-2">
                        {[
                            { competitor: "Slack", share: "34%", status: "Leader" },
                            { competitor: "Microsoft Teams", share: "28%", status: "Strong" },
                            { competitor: "Our Platform", share: "2%", status: "Emerging" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-3 h-3 text-[#868f97]" />
                                    <span className="text-white text-xs">{item.competitor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-xs">{item.share}</span>
                                    <span className="text-[#868f97] text-xs">{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Strategy */}
                <div className="mb-6">
                    <h4 className="text-white text-sm font-medium mb-3">Growth Strategy</h4>
                    <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
                        <div className="text-[#868f97] text-xs mb-3 text-center">
                            Focus on product-led growth with freemium model targeting remote teams experiencing collaboration challenges.
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-white text-sm font-semibold">156%</div>
                                <div className="text-[#868f97] text-xs">User Growth</div>
                            </div>
                            <div>
                                <div className="text-white text-sm font-semibold">$89</div>
                                <div className="text-[#868f97] text-xs">CAC</div>
                            </div>
                            <div>
                                <div className="text-white text-sm font-semibold">12mo</div>
                                <div className="text-[#868f97] text-xs">Payback</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Initiatives */}
                <div>
                    <h4 className="text-white text-sm font-medium mb-3">Strategic Initiatives</h4>
                    <div className="space-y-2">
                        {[
                            "Launch AI-powered workflow automation features",
                            "Expand integration marketplace with 50+ tools",
                            "Build enterprise-grade security and compliance",
                        ].map((initiative, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <Zap className="w-3 h-3 text-blue-400 mt-1 flex-shrink-0" />
                                <span className="text-[#868f97] text-xs leading-relaxed">{initiative}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackgroundDashboard;