import React from "react";
import {
    ArrowRight,
    Play,
    Target,
    Crown,
    Star,
} from "lucide-react";
import { assets } from "../../assets";
import { OptimizedImage } from "./OptimizedImage";
import { Button } from "./moving-border";

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

// --- MAIN COMPONENT ---
export default function HeroSection() {
    return (
        <div className="relative w-full text-white overflow-hidden font-sans">
            {/* 
        SCOPED ANIMATIONS 
      */}
            <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite; /* Slower for readability */
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">

                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

                        {/* Badge */}
                        <div className="animate-fade-in delay-100">
                            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-teal-500/20">
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                                    Premium Game Hosting
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
                            style={{
                                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
                            }}
                        >
                            Host Servers<br />
                            <span className="bg-gradient-to-br from-white via-white to-teal-400 bg-clip-text text-transparent">
                                Without Limits
                            </span><br />
                            or Downtime
                        </h1>

                        {/* Description */}
                        <p className="animate-fade-in delay-300 max-w-xl text-lg text-zinc-400 leading-relaxed">
                            Experience enterprise-grade hardware, superior DDoS protection, and an intuitive control panel designed specifically for gamers and server owners.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
                            <Button
                                containerClassName="h-14 w-40"
                                className="group inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-sm font-semibold text-zinc-950 transition-all"
                                borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
                                borderRadius="9999px"
                            >
                                View Plans
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                containerClassName="h-14 w-44"
                                className="group inline-flex items-center justify-center gap-2 border border-white/10 bg-[#111] text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20"
                                borderClassName="bg-[radial-gradient(var(--color-white)_40%,transparent_60%)]"
                                borderRadius="9999px"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                How It Works
                            </Button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-5 space-y-6 lg:mt-12">

                        {/* Stats Card */}
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 backdrop-blur-xl shadow-2xl">
                            {/* Card Glow Effect */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 ring-1 ring-teal-500/30">
                                        <Target className="h-6 w-6 text-teal-400" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold tracking-tight text-white">100+</div>
                                        <div className="text-sm text-zinc-400">Active Servers</div>
                                    </div>
                                </div>

                                {/* Progress Bar Section */}
                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Network Uptime</span>
                                        <span className="text-white font-medium">99.99%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                        <div className="h-full w-[99.99%] rounded-full bg-gradient-to-r from-teal-600 to-teal-400" />
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/10 mb-6" />

                                {/* Mini Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <StatItem value="1Tbps" label="Anti-DDoS" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="24/7" label="Support" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="<10ms" label="Latency" />
                                </div>

                                {/* Tag Pills */}
                                <div className="mt-8 flex flex-wrap gap-2">
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-[10px] font-medium tracking-wide text-teal-300">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                        </span>
                                        ALL SYSTEMS ONLINE
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                        <Crown className="w-3 h-3 text-yellow-500" />
                                        ENTERPRISE HARDWARE
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marquee Card */}
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] py-8 backdrop-blur-xl">
                            <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">Powered By Industry Leaders</h3>

                            <div
                                className="relative flex overflow-hidden"
                                style={{
                                    maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                                }}
                            >
                                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                                    {/* Double list for seamless loop */}
                                    {[...Array(2)].map((_, listIndex) => (
                                        <div key={listIndex} className="flex items-center gap-16 shrink-0">
                                            <OptimizedImage
                                                src={assets.imgPterodactyl}
                                                alt="Pterodactyl Panel - Enterprise game management"
                                                className="h-6 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                width="24"
                                                height="24"
                                            />
                                            <OptimizedImage
                                                src={assets.imgSamsung}
                                                alt="Samsung NVMe SSD - High-speed storage for lag-free gaming"
                                                className="h-5 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                width="20"
                                                height="20"
                                            />
                                            <OptimizedImage
                                                src={assets.imgHetzner}
                                                alt="Hetzner Online - Reliable global infrastructure"
                                                className="h-4 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                width="16"
                                                height="16"
                                            />
                                            <OptimizedImage
                                                src={assets.imgIntel}
                                                alt="Intel Xeon/Core CPUs - Powerful processing for game servers"
                                                className="h-8 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                width="32"
                                                height="32"
                                            />
                                            <OptimizedImage
                                                src={assets.imgNeoProtect}
                                                alt="NeoProtect DDoS Mitigation - Advanced protection for game servers"
                                                className="h-6 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                width="24"
                                                height="24"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
