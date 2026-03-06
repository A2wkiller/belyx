import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { spring, viewportDefaults } from "../lib/animations";

const faqs = [
  {
    q: "What games do you support?",
    a: "We support hundreds of games including Minecraft, Rust, Ark, Valheim, and many more. Check our Games page for the full list.",
  },
  {
    q: "How quickly can I get my server up and running?",
    a: "Instantly! Our automated system provisions your server immediately after payment is confirmed.",
  },
  {
    q: "What kind of support do you offer?",
    a: "We offer 24/7 support via live chat, ticket system, and Discord. Our team is always ready to help.",
  },
  {
    q: "Can I upgrade my server later?",
    a: "Yes, you can upgrade or downgrade your server resources at any time through our control panel.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      <motion.div
        className="md:w-1/3"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportDefaults}
        transition={{ ...spring.gentle, delay: 0.05 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-white/60 mb-8">
          Everything you need to know about our game hosting services.
        </p>
        <a
          href="https://discord.gg/Cv3tTtwanC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-48 bg-teal-500/10 border border-teal-500/30 text-teal-400 hover:bg-teal-500/20 px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-all"
        >
          Contact Support
        </a>
      </motion.div>

      <div className="md:w-2/3 space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportDefaults}
            transition={{ ...spring.gentle, delay: i * 0.07 }}
            className="border border-white/10 rounded-xl bg-white/5 overflow-hidden hover:border-white/20 transition-colors duration-300"
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-medium text-white">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={spring.snappy}
              >
                <ChevronDown
                  className={`w-5 h-5 ${openIndex === i ? "text-teal-400" : "text-white/40"}`}
                />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring.smooth}
                >
                  <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
