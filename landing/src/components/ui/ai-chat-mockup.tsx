'use client';

import React from 'react';
import { FileText, TrendingUp, Target, Users, BarChart, CheckCircle } from 'lucide-react';

const AIChatMockup = () => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-[32px] border border-white/[0.03] overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.03]">
        <h3 className="text-white text-lg md:text-xl font-semibold">AI Business Advisor</h3>
        <span className="text-white/60 text-xs md:text-sm">Growth Analysis</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* User Message 1 */}
        <div className="flex justify-end">
          <div className="bg-[#1a1a1a] border border-white/[0.08] text-white rounded-2xl rounded-br-lg px-4 py-3 max-w-[80%]">
            <p className="text-sm font-medium text-white/90">My SaaS growth rate has stagnated at 15% MoM for 3 months. How can I accelerate growth to 25%+ MoM?</p>
          </div>
        </div>

        {/* AI Response 1 */}
        <div className="flex justify-start">
          <div className="bg-[#1a1a1a] border border-white/[0.03] text-white rounded-2xl rounded-bl-lg px-4 py-4 max-w-[85%]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-white/70">AI Business Advisor</span>
            </div>
            <p className="text-sm text-white/90 mb-4">I&apos;ve analyzed your growth data and identified 4 high-impact strategies to reach 25%+ MoM growth:</p>
            
            {/* Quick Strategy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <div className="bg-[#0f0f0f] rounded-lg p-2 md:p-3 border border-white/[0.05]">
                <div className="flex items-center gap-1 md:gap-2">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs text-white font-medium">Product-Led Growth</span>
                </div>
                <p className="text-xs text-white/60 mt-1">+8% MoM potential</p>
              </div>
              <div className="bg-[#0f0f0f] rounded-lg p-2 md:p-3 border border-white/[0.05]">
                <div className="flex items-center gap-1 md:gap-2">
                  <Users className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs text-white font-medium">Referral Program</span>
                </div>
                <p className="text-xs text-white/60 mt-1">+5% MoM potential</p>
              </div>
              <div className="bg-[#0f0f0f] rounded-lg p-2 md:p-3 border border-white/[0.05]">
                <div className="flex items-center gap-1 md:gap-2">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs text-white font-medium">Expansion Revenue</span>
                </div>
                <p className="text-xs text-white/60 mt-1">+7% MoM potential</p>
              </div>
              <div className="bg-[#0f0f0f] rounded-lg p-2 md:p-3 border border-white/[0.05]">
                <div className="flex items-center gap-1 md:gap-2">
                  <BarChart className="w-3 h-3 md:w-4 md:h-4 text-orange-400 flex-shrink-0" />
                  <span className="text-xs text-white font-medium">Conversion Opt.</span>
                </div>
                <p className="text-xs text-white/60 mt-1">+4% MoM potential</p>
              </div>
            </div>

            <p className="text-sm text-white/90">Would you like me to create a detailed 90-day growth acceleration plan?</p>
          </div>
        </div>

        {/* User Message 2 */}
        <div className="flex justify-end">
          <div className="bg-[#1a1a1a] border border-white/[0.08] text-white rounded-2xl rounded-br-lg px-4 py-3 max-w-[80%]">
            <p className="text-sm font-medium text-white/90">Yes, create a comprehensive growth plan with specific tactics and timelines</p>
          </div>
        </div>

        {/* AI Response 2 - Document Generated */}
        <div className="flex justify-start">
          <div className="bg-[#1a1a1a] border border-white/[0.03] text-white rounded-2xl rounded-bl-lg px-4 py-4 max-w-[90%]">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Plan Generated Successfully</span>
            </div>
            
            {/* Document Preview */}
            <div className="bg-[#0f0f0f] rounded-xl p-4 border border-white/[0.05] mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm">Growth Acceleration Plan</h4>
                  <p className="text-white/70 text-xs">90-day roadmap to 25%+ MoM growth</p>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-[#0a0a0a] rounded-lg p-2 text-center">
                  <p className="text-white font-bold text-sm">15%</p>
                  <p className="text-white/60 text-xs">Current MoM</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-lg p-2 text-center">
                  <p className="text-white font-bold text-sm">27%</p>
                  <p className="text-white/60 text-xs">Target MoM</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-lg p-2 text-center">
                  <p className="text-white font-bold text-sm">90</p>
                  <p className="text-white/60 text-xs">Days</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs">24 pages • Just generated</span>
                <button className="bg-white/[0.08] hover:bg-white/[0.12] text-white px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1">
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">DL</span>
                </button>
              </div>
            </div>

            <p className="text-sm text-white/90">I&apos;ve also prepared implementation templates and weekly tracking dashboards. Ready to get started?</p>
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="flex justify-start">
          <div className="bg-[#1a1a1a] border border-white/[0.03] text-white rounded-2xl rounded-bl-lg px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Analyzing next steps</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatMockup;