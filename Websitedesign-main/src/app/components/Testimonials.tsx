import { Star } from "lucide-react";
import { motion } from "motion/react";

const marqueeTransition = { repeat: Infinity, ease: "linear" as const, duration: 28 };

const reviews = [
  {
    text: "The support team is quite good, solved all my issues within minutes. 10/10 would recommend.",
    author: "Fuhad",
    role: "Enigma Owner",
    initial: "F"
  },
  {
    text: "Minecraft server completely changed how awesome our Minecraft server is. Zero lag, fast panel, and easy payment mod. Minutes support actively understands hosting. WATCH IT LIVE.",
    author: "Jaelyn Singh",
    role: "Minecraft Server Host",
    initial: "J",
    featured: true
  },
  {
    text: "Hosting provider with amazing control panel, zero issues. And my players are incredibly happy with the regular performance.",
    author: "Ananya Mishra",
    role: "Community Manager",
    initial: "A"
  },
];

export function Testimonials() {
  return (
    <div className="py-20 px-6 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-teal-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Reputable Servers.
        </h2>
        <p className="text-white/60 mb-16 max-w-2xl mx-auto">
          See what our community has to say about their experience with BelyxHost.
        </p>

        {/* Marquee Container */}
        <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex gap-6 w-max will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={marqueeTransition}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6">
                {reviews.map((review, i) => (
                  <motion.div 
                      key={`${setIndex}-${i}`}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`w-[350px] md:w-[400px] p-8 rounded-3xl border text-left relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-300 flex-shrink-0 ${review.featured ? 'bg-[#111] border-teal-500/20 shadow-2xl' : 'bg-[#0A0A0A] border-white/5 opacity-80 hover:opacity-100'}`}
                  >
                    <div className="flex gap-1 mb-6 text-teal-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 mb-8 text-sm leading-relaxed min-h-[80px]">"{review.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${review.featured ? 'bg-teal-500 text-black' : 'bg-white/10'}`}>
                        {review.initial}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{review.author}</p>
                        <p className="text-white/40 text-xs">{review.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Pagination Dots - Removed as it's now an infinite scroll */}
      </div>
    </div>
  );
}