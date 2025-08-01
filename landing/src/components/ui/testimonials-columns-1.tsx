"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm shadow-lg max-w-xs w-full" key={i}>
                  <div className="text-white/90 text-sm leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border border-white/[0.12]"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-white/60 text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "This platform transformed my startup idea into a comprehensive business plan in minutes. The AI insights were incredibly accurate and actionable.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Startup Founder",
  },
  {
    text: "I launched my e-commerce business using the roadmap generated here. The financial projections were spot-on and helped me secure funding.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Rodriguez",
    role: "E-commerce Entrepreneur",
  },

  {
    text: "From idea to MVP launch in 30 days. The step-by-step execution plan was exactly what I needed to turn my vision into reality.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "Tech Startup CEO",
  },
  {
    text: "The AI advisor helped me pivot my business model and find a more profitable niche. Revenue increased 300% in just 3 months.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Jessica Park",
    role: "Business Owner",
  },
  {
    text: "I was struggling with scaling my consulting business. The growth strategies suggested here doubled my client base in 2 months.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Alex Thompson",
    role: "Business Consultant",
  },
  {
    text: "The financial modeling feature helped me understand my unit economics better. Now I make data-driven decisions every day.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Rachel Green",
    role: "SaaS Founder",
  },
  {
    text: "This tool turned my side project into a real business. The market validation insights gave me confidence to quit my job.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
    name: "Michael Brown",
    role: "Indie Maker",
  },
  {
    text: "The competitor analysis was incredibly detailed. I found gaps in the market I never would have discovered on my own.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Zhang",
    role: "Marketing Director",
  },
];

export { testimonials };