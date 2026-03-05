import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingVideoProps {
  isVisible: boolean;
  message?: string;
  onComplete?: () => void;
}

export default function LoadingVideo({
  isVisible,
  message = "Processing...",
  onComplete,
}: LoadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Video unavailable or autoplay blocked – CSS fallback is already visible
      });
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative flex flex-col items-center"
          >
            {/* Ambient glow behind the card */}
            <div className="absolute inset-0 scale-150 bg-teal-500/20 blur-3xl rounded-full animate-pulse pointer-events-none" />

            {/* Card */}
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-teal-500/30 shadow-2xl shadow-teal-500/10 bg-[#080808] flex items-center justify-center">
              {/* CSS spinner — always rendered, hidden once video is ready */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  videoReady ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Outer ring */}
                <div className="absolute w-32 h-32 rounded-full border-2 border-teal-500/10" />
                {/* Spinning arc */}
                <div className="absolute w-32 h-32 rounded-full border-2 border-transparent border-t-teal-400 animate-spin" />
                {/* Inner pulsing dot */}
                <motion.div
                  animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 rounded-full bg-teal-500/30 border border-teal-400/50"
                />
              </div>

              {/* Video — fades in on top once it has loaded data */}
              <video
                ref={videoRef}
                src="/loading-animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoReady(true)}
                onError={() => setVideoReady(false)}
                onEnded={onComplete}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  videoReady ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Message */}
            <div className="mt-8 text-center">
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-white text-base font-semibold mb-3 tracking-wide"
              >
                {message}
              </motion.p>

              {/* Animated dots */}
              <div className="flex items-center justify-center gap-1.5">
                {[0, 0.18, 0.36].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.25, 1, 0.25],
                      scale: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-teal-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
