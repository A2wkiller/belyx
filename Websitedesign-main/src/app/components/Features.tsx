import { Rocket, Shield, Clock, Headphones, Cpu, Globe } from "lucide-react";
import { motion } from "motion/react";
import { viewportDefaults, spring } from "../lib/animations";

const features = [
  {
    icon: Rocket,
    title: "Instant Setup",
    desc: "Get your server up and running in seconds. No complex configurations.",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    desc: "Enterprise-grade protection keeps your server safe from malicious attacks.",
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    desc: "Our redundant infrastructure ensures your server stays online.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Expert support team available round the clock to help with any issues.",
  },
  {
    icon: Cpu,
    title: "Powerful Hardware",
    desc: "High-performance NVMe SSDs and latest CPUs for lag-free gaming.",
  },
  {
    icon: Globe,
    title: "Global Locations",
    desc: "Multiple data centers worldwide to ensure low latency for all players.",
  },
];

export function Features() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportDefaults}
            transition={{ ...spring.snappy, delay: i * 0.06 }}
            className={`relative p-5 rounded-2xl border transition-all duration-300 group flex items-start gap-4 ${
              feature.title === "DDoS Protection"
                ? "bg-teal-500/5 border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.1)]" 
                : "bg-white/5 border-white/5 hover:border-teal-500/30 hover:bg-white/10"
            }`}
          >
            {feature.title === "DDoS Protection" && (
              <>
                 <svg viewBox="0 0 24 24" fill="currentColor" className="absolute -top-3 -left-3 w-6 h-6 text-teal-400 animate-pulse"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
                 <svg viewBox="0 0 24 24" fill="currentColor" className="absolute -top-2 -right-2 w-4 h-4 text-teal-400 animate-pulse delay-75"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
                 <svg viewBox="0 0 24 24" fill="currentColor" className="absolute -bottom-3 -right-3 w-5 h-5 text-teal-400 animate-pulse delay-150"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
                 <svg viewBox="0 0 24 24" fill="currentColor" className="absolute -bottom-2 -left-2 w-3 h-3 text-teal-400 animate-pulse delay-300"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
              </>
            )}

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              feature.title === "DDoS Protection" 
                ? "bg-teal-500/10 text-teal-400" 
                : "bg-white/5 text-white/40 group-hover:text-teal-400 group-hover:bg-teal-500/10"
            }`}>
              <feature.icon className="w-6 h-6" />
            </div>
            
            <div>
              <h3 className={`text-lg font-bold mb-2 transition-colors ${
                feature.title === "DDoS Protection" ? "text-white" : "text-white group-hover:text-teal-400"
              }`}>
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
