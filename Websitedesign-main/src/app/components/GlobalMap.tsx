import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, X, Cpu, Wifi, HardDrive } from "lucide-react";
import { spring, scaleIn } from "../lib/animations";

// Defined outside the component so the array reference is stable and never
// triggers unnecessary re-runs of the useEffect that depends on it.
const LOCATIONS = [
  {
    id: "de",
    name: "Frankfurt, Germany",
    coords: [50.1109, 8.6821] as [number, number],
    ping: "14ms",
    cpu: "Ryzen 9 7950X",
    ram: "DDR5 ECC",
    operational: false,
  },
  {
    id: "in",
    name: "Mumbai, India",
    coords: [19.076, 72.8777] as [number, number],
    ping: "28ms",
    cpu: "EPYC 9654",
    ram: "DDR5 ECC",
    operational: true,
  },
  {
    id: "us",
    name: "New York, USA",
    coords: [40.7128, -74.006] as [number, number],
    ping: "18ms",
    cpu: "Core i9-13900K",
    ram: "DDR5 ECC",
    operational: false,
  },
  {
    id: "sg",
    name: "Singapore",
    coords: [1.3521, 103.8198] as [number, number],
    ping: "22ms",
    cpu: "Ryzen 9 7950X",
    ram: "DDR5 ECC",
    operational: true,
  },
  {
    id: "au",
    name: "Sydney, Australia",
    coords: [-33.8688, 151.2093] as [number, number],
    ping: "35ms",
    cpu: "EPYC 9654",
    ram: "DDR5 ECC",
    operational: false,
  },
];

export function GlobalMap({ showHeader = true }: { showHeader?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Refs for tracking animation and interaction state without re-rendering
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const targetRRef = useRef(0); // Target rotation offset based on mouse
  const currentRRef = useRef(0); // Current smoothed rotation offset

  // Focus on a specific location
  const [focusLocation, setFocusLocation] = useState<string | null>(null);

  const activeLoc = LOCATIONS.find((l) => l.id === focusLocation);

  useEffect(() => {
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        widthRef.current = width;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 8,
      baseColor: [0.1, 0.1, 0.15],
      markerColor: [0.1, 0.8, 0.8],
      glowColor: [0.1, 0.1, 0.15],
      opacity: 0.9,
      markers: LOCATIONS.map((l) => ({
        location: l.coords,
        size: l.operational ? 0.06 : 0.03,
      })),
      onRender: (state) => {
        // Smooth interpolation
        const dist = targetRRef.current - currentRRef.current;
        currentRRef.current += dist * 0.05;

        // Auto-rotation (only when nothing is focused)
        if (!focusLocation) {
          phiRef.current += 0.002;
        }

        // Apply combined rotation
        state.phi = phiRef.current + currentRRef.current;

        // Keep canvas sized correctly after any resize
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // LOCATIONS is module-level constant — safe to omit; focusLocation controls
    // auto-rotation behaviour so it must stay in the dep array.
  }, [focusLocation]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 → 1
    // Map mouse X to a rotation offset in the range [-1, 1] radians
    targetRRef.current = (x - 0.5) * 2;
  };

  const handleMouseLeave = () => {
    targetRRef.current = 0;
  };

  const handleLocationClick = (locId: string) => {
    setFocusLocation(locId);
  };

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto ${showHeader ? "py-20 px-6" : ""}`}
    >
      {showHeader && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-4">
            Global Server Locations
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Strategically placed servers worldwide for minimal latency and
            maximum performance.
          </p>
        </div>
      )}

      <div
        className={`relative aspect-[16/9] w-full bg-[#0F0F0F] rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex items-center justify-center ${!showHeader ? "bg-transparent border-none shadow-none aspect-square" : ""}`}
      >
        {/* Interaction Layer */}
        <div
          className="absolute inset-0 z-10 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* Cobe Globe */}
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "800px",
            aspectRatio: "1",
          }}
          className="opacity-80 transition-opacity duration-1000 ease-in-out"
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-teal-500/5 via-transparent to-transparent pointer-events-none" />

        {/* Location Selection Overlay (Bottom) */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 flex-wrap px-4 pointer-events-none">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleLocationClick(loc.id)}
              className={`pointer-events-auto px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all flex items-center gap-2 ${focusLocation === loc.id ? "bg-teal-500 text-black border-teal-500" : "bg-black/60 text-white/70 border-white/10 hover:bg-white/20 hover:text-white"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${loc.operational ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}
              />
              {loc.name.split(",")[0]}
            </button>
          ))}
        </div>

        {/* Active Location Card */}
        <AnimatePresence>
          {activeLoc && (
            <motion.div
              {...scaleIn}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={spring.snappy}
              className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] bg-[#161616]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusLocation(null);
                }}
                className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shrink-0">
                  <MapPin className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {activeLoc.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {activeLoc.operational ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-green-400 font-medium">
                          Operational
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] text-amber-400 font-medium">
                          Coming Soon
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {activeLoc.operational && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-white/60">
                      <Wifi className="w-3.5 h-3.5" />
                      <span>Ping</span>
                    </div>
                    <span className="text-white font-mono">
                      {activeLoc.ping}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-white/60">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>CPU</span>
                    </div>
                    <span className="text-white font-medium truncate ml-2">
                      {activeLoc.cpu}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-white/60">
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>RAM</span>
                    </div>
                    <span className="text-white font-medium">
                      {activeLoc.ram}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
