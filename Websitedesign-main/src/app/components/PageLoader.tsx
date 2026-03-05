import { motion, AnimatePresence } from "motion/react";

interface PageLoaderProps {
  isVisible: boolean;
}

export default function PageLoader({ isVisible }: PageLoaderProps) {
  return (
    <>
      <style>{`
        #pl-bounce {
          animation: pl-bounce 4s ease-in-out infinite;
          translate: 0px 36px;
        }
        #pl-bounce2 {
          animation: pl-bounce2 4s ease-in-out infinite;
          translate: 0px 46px;
          animation-delay: 0.5s;
        }
        .pl-particles {
          animation: pl-particles 4s ease-in-out infinite;
        }
        .pl-anim-stop {
          animation: pl-umbral 4s infinite;
        }
        @keyframes pl-bounce {
          0%, 100% { translate: 0px 36px; }
          50%       { translate: 0px 46px; }
        }
        @keyframes pl-bounce2 {
          0%, 100% { translate: 0px 46px; }
          50%       { translate: 0px 56px; }
        }
        @keyframes pl-umbral {
          0%   { stop-color: #d3a5102e; }
          50%  { stop-color: rgba(211,165,16,0.519); }
          100% { stop-color: #d3a5102e; }
        }
        @keyframes pl-particles {
          0%, 100% { translate: 0px 16px; }
          50%       { translate: 0px 6px; }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Ambient glow */}
              <div
                className="absolute w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(211,164,16,0.18) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
              />

              {/* Diamond SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="180"
                width="180"
                viewBox="0 0 200 200"
                className="relative z-10 drop-shadow-2xl"
              >
                <g style={{ order: -1 }}>
                  {/* Animated outline rings */}
                  <polygon
                    id="pl-bounce"
                    transform="rotate(45 100 100)"
                    strokeWidth="1"
                    stroke="#d3a410"
                    fill="none"
                    points="70,70 148,50 130,130 50,150"
                  />
                  <polygon
                    id="pl-bounce2"
                    transform="rotate(45 100 100)"
                    strokeWidth="1"
                    stroke="#d3a410"
                    fill="none"
                    points="70,70 148,50 130,130 50,150"
                  />

                  {/* Main dark back face */}
                  <polygon
                    transform="rotate(45 100 100)"
                    strokeWidth="2"
                    stroke=""
                    fill="#414750"
                    points="70,70 150,50 130,130 50,150"
                  />

                  {/* Centre face with gradient */}
                  <defs>
                    <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="pl-grad1">
                      <stop style={{ stopColor: "#1e2026", stopOpacity: 1 }} offset="20%" />
                      <stop style={{ stopColor: "#414750", stopOpacity: 1 }} offset="60%" />
                    </linearGradient>
                  </defs>
                  <polygon
                    strokeWidth="2"
                    stroke=""
                    fill="url(#pl-grad1)"
                    points="100,70 150,100 100,130 50,100"
                  />

                  {/* Left bottom face */}
                  <polygon
                    transform="translate(20, 31)"
                    strokeWidth="2"
                    stroke=""
                    fill="#b7870f"
                    points="80,50 80,75 80,99 40,75"
                  />

                  {/* Left shimmer face */}
                  <defs>
                    <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="pl-grad2">
                      <stop style={{ stopColor: "#d3a51000", stopOpacity: 1 }} offset="20%" />
                      <stop className="pl-anim-stop" style={{ stopColor: "#d3a51054", stopOpacity: 1 }} offset="100%" />
                    </linearGradient>
                  </defs>
                  <polygon
                    transform="translate(20, 31)"
                    strokeWidth="2"
                    stroke=""
                    fill="url(#pl-grad2)"
                    points="40,-40 80,-40 80,99 40,75"
                  />

                  {/* Right bottom face */}
                  <polygon
                    transform="rotate(180 100 100) translate(20, 20)"
                    strokeWidth="2"
                    stroke=""
                    fill="#d3a410"
                    points="80,50 80,75 80,99 40,75"
                  />

                  {/* Right shimmer face */}
                  <defs>
                    <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="pl-grad3">
                      <stop style={{ stopColor: "#d3a51000", stopOpacity: 1 }} offset="20%" />
                      <stop className="pl-anim-stop" style={{ stopColor: "#d3a51054", stopOpacity: 1 }} offset="100%" />
                    </linearGradient>
                  </defs>
                  <polygon
                    transform="rotate(0 100 100) translate(60, 20)"
                    strokeWidth="2"
                    stroke=""
                    fill="url(#pl-grad3)"
                    points="40,-40 80,-40 80,85 40,110.2"
                  />

                  {/* Sparkle particles */}
                  <polygon
                    className="pl-particles"
                    transform="rotate(45 100 100) translate(80, 95)"
                    strokeWidth="2"
                    stroke=""
                    fill="#ffe4a1"
                    points="5,0 5,5 0,5 0,0"
                  />
                  <polygon
                    className="pl-particles"
                    transform="rotate(45 100 100) translate(80, 55)"
                    strokeWidth="2"
                    stroke=""
                    fill="#ccb069"
                    points="6,0 6,6 0,6 0,0"
                  />
                  <polygon
                    className="pl-particles"
                    transform="rotate(45 100 100) translate(70, 80)"
                    strokeWidth="2"
                    stroke=""
                    fill="#fff"
                    points="2,0 2,2 0,2 0,0"
                  />

                  {/* Bottom shadow face */}
                  <polygon
                    strokeWidth="2"
                    stroke=""
                    fill="#292d34"
                    points="29.5,99.8 100,142 100,172 29.5,130"
                  />
                  <polygon
                    transform="translate(50, 92)"
                    strokeWidth="2"
                    stroke=""
                    fill="#1f2127"
                    points="50,50 120.5,8 120.5,35 50,80"
                  />
                </g>
              </svg>

              {/* Label */}
              <div className="flex flex-col items-center gap-3 relative z-10">
                <p className="text-white/70 text-sm font-semibold tracking-widest uppercase">
                  Loading
                </p>
                {/* Animated gold dots */}
                <div className="flex items-center gap-1.5">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
                      style={{ backgroundColor: "#d3a410" }}
                      className="w-1.5 h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
