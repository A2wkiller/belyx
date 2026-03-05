import React from 'react';
import { clsx } from "clsx";
import { Zap, Shield, Clock, Headset, Cpu, Globe } from "lucide-react";
import { GlobalMap } from "./GlobalMap";

function Globe3D() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Replace SVG globe with Cobe globe for actual world map */}
            <div className="w-full h-full scale-125 md:scale-150">
                <GlobalMap showHeader={false} />
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description, featured = false }: any) {
    return (
        <div className="relative group">
            {/* Corner Decorations (Only for Featured) */}
            {featured && (
                <>
                    {/* Top-left star */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 z-10">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-teal-400 blur-md opacity-60" />
                            <svg viewBox="0 0 24 24" fill="none" className="relative w-full h-full">
                                <path
                                    d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                                    fill="#14b8a6"
                                    stroke="#14b8a6"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Top-right star */}
                    <div className="absolute -top-3 -right-3 w-6 h-6 z-10">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-teal-400 blur-md opacity-60" />
                            <svg viewBox="0 0 24 24" fill="none" className="relative w-full h-full">
                                <path
                                    d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                                    fill="#14b8a6"
                                    stroke="#14b8a6"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Bottom-left star */}
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 z-10">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-teal-400 blur-md opacity-60" />
                            <svg viewBox="0 0 24 24" fill="none" className="relative w-full h-full">
                                <path
                                    d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                                    fill="#14b8a6"
                                    stroke="#14b8a6"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Bottom-right star */}
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 z-10">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-teal-400 blur-md opacity-60" />
                            <svg viewBox="0 0 24 24" fill="none" className="relative w-full h-full">
                                <path
                                    d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                                    fill="#14b8a6"
                                    stroke="#14b8a6"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    </div>
                </>
            )}

            {/* Card Container */}
            <div
                className={clsx(
                    "relative p-8 rounded-3xl transition-all duration-300 h-full",
                    featured
                        ? "bg-gradient-to-br from-teal-950/30 via-teal-900/20 to-teal-950/30 backdrop-blur-xl border-2 border-teal-500/50 shadow-xl shadow-teal-500/20"
                        : "bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-teal-500/30 hover:bg-white/[0.07]"
                )}
            >
                {/* Icon Container */}
                <div
                    className={clsx(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                        featured
                            ? "bg-teal-500/20 border-2 border-teal-400/50"
                            : "bg-white/5 border border-white/10 group-hover:bg-teal-500/10 group-hover:border-teal-500/30"
                    )}
                >
                    <Icon
                        className={clsx(
                            "w-7 h-7 transition-colors",
                            featured ? "text-teal-400" : "text-white/70 group-hover:text-teal-400"
                        )}
                    />
                </div>

                {/* Title */}
                <h3
                    className={clsx(
                        "text-xl font-bold mb-3 transition-colors",
                        featured ? "text-white" : "text-white/90 group-hover:text-white"
                    )}
                >
                    {title}
                </h3>

                {/* Description */}
                <p className={clsx(
                    "text-sm leading-relaxed",
                    featured ? "text-white/70" : "text-white/60"
                )}>
                    {description}
                </p>

                {/* Glass reflection effect */}
                {featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
                )}
            </div>
        </div>
    );
}

export function GlobalServersSection() {
    return (
        <>
            {/* Global Server Locations Section */}
            <div className="relative py-32 px-6 overflow-hidden bg-black">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.03),transparent_50%)]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-white/95 mb-6 tracking-tight">
                            Global Server Locations
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto tracking-wide">
                            Strategically placed servers worldwide for minimal latency and maximum performance.
                        </p>
                    </div>

                    {/* Globe Container - NO BACKGROUND CARD */}
                    <div className="relative w-full max-w-5xl mx-auto aspect-square md:aspect-video lg:aspect-[21/9] mb-20 flex justify-center items-center">
                        {/* Subtle glow behind globe */}
                        <div className="absolute inset-0 bg-teal-500/10 blur-[120px] rounded-full" />

                        {/* Globe */}
                        <div className="relative w-full max-w-xl aspect-square">
                            <Globe3D />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards Section */}
            <div className="relative py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={Zap}
                            title="Instant Setup"
                            description="Get your server up and running in seconds. No complex configurations."
                            featured={false}
                        />

                        <FeatureCard
                            icon={Shield}
                            title="DDoS Protection"
                            description="Enterprise-grade protection keeps your server safe from malicious attacks."
                            featured={true}
                        />

                        <FeatureCard
                            icon={Clock}
                            title="99.9% Uptime"
                            description="Our redundant infrastructure ensures your server stays online."
                            featured={false}
                        />

                        <FeatureCard
                            icon={Headset}
                            title="24/7 Support"
                            description="Expert support team available round the clock to help with any issues."
                            featured={false}
                        />

                        <FeatureCard
                            icon={Cpu}
                            title="Powerful Hardware"
                            description="High-performance NVMe SSDs and latest CPUs for lag-free gaming."
                            featured={false}
                        />

                        <FeatureCard
                            icon={Globe}
                            title="Global Locations"
                            description="Multiple data centers worldwide to ensure low latency for all players."
                            featured={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
