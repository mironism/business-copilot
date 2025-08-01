"use client";
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, testimonials } from "./testimonials-columns-1";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 5);
const thirdColumn = testimonials.slice(5, 8);

const TestimonialsSection = () => {
  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden">
      <div className="container max-w-7xl z-10 mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-white/[0.12] bg-white/[0.03] py-2 px-4 rounded-lg backdrop-blur-sm">
              <span className="text-white/70 text-sm font-medium">Testimonials</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-6 text-center text-white">
            What our users say
          </h2>
          <p className="text-center mt-4 opacity-75 text-white/60 text-lg max-w-md">
            See how entrepreneurs are building successful businesses with our platform.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
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

export default TestimonialsSection;