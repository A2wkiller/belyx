import { Zap, Shield, Clock, Headset, Cpu, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { ElementType } from 'react';

function FeatureCard({ icon: Icon, title, description, isHighlighted = false }: { icon: ElementType, title: string, description: string, isHighlighted?: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={clsx(
                "relative group overflow-hidden rounded-2xl p-6",
                "backdrop-blur-xl bg-gradient-to-br",
                isHighlighted
                    ? "from-teal-500/10 to-teal-600/5 border-2 border-teal-500/30"
                    : "from-white/5 to-white/[0.02] border border-white/10"
            )}
        >
            {/* Highlighted card sparkle effects */}
            {isHighlighted && (
                <>
                    {/* Top-left sparkle */}
                    <div className="absolute top-0 left-0 w-2 h-2">
                        <div className="absolute top-0 left-0 w-full h-full bg-teal-400 rounded-full animate-ping" />
                        <div className="absolute top-0 left-0 w-full h-full bg-teal-400 rounded-full" />
                    </div>

                    {/* Top-right sparkle */}
                    <div className="absolute top-0 right-0 w-2 h-2">
                        <div className="absolute top-0 right-0 w-full h-full bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                        <div className="absolute top-0 right-0 w-full h-full bg-teal-400 rounded-full" />
                    </div>

                    {/* Bottom-left sparkle */}
                    <div className="absolute bottom-0 left-0 w-2 h-2">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
                        <div className="absolute bottom-0 left-0 w-full h-full bg-teal-400 rounded-full" />
                    </div>

                    {/* Bottom-right sparkle */}
                    <div className="absolute bottom-0 right-0 w-2 h-2">
                        <div className="absolute bottom-0 right-0 w-full h-full bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.9s' }} />
                        <div className="absolute bottom-0 right-0 w-full h-full bg-teal-400 rounded-full" />
                    </div>
                </>
            )}

            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-600/0 group-hover:from-teal-500/5 group-hover:to-teal-600/10 transition-all duration-500" />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon Container */}
                <div className={clsx(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                    "transition-all duration-300",
                    isHighlighted
                        ? "bg-teal-500/20 border border-teal-500/30 group-hover:bg-teal-500 group-hover:border-teal-400"
                        : "bg-white/5 border border-white/10 group-hover:bg-teal-500/20 group-hover:border-teal-500/30"
                )}>
                    <Icon className={clsx(
                        "w-7 h-7 transition-all duration-300",
                        isHighlighted
                            ? "text-teal-400 group-hover:text-white"
                            : "text-white/70 group-hover:text-teal-400"
                    )} />
                </div>

                {/* Title */}
                <h3 className={clsx(
                    "text-xl font-bold mb-2",
                    isHighlighted ? "text-teal-300" : "text-white"
                )}>
                    {title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
        </motion.div>
    );
}

export function FeaturesGrid() {
    const features = [
        {
            icon: Zap,
            title: "Instant Setup",
            description: "Get your server up and running in seconds. No complex configurations.",
            highlighted: false,
        },
        {
            icon: Shield,
            title: "DDoS Protection",
            description: "Enterprise-grade protection keeps your server safe from malicious attacks.",
            highlighted: true, // This one is highlighted
        },
        {
            icon: Clock,
            title: "99.9% Uptime",
            description: "Our redundant infrastructure ensures your server stays online.",
            highlighted: false,
        },
        {
            icon: Headset,
            title: "24/7 Support",
            description: "Expert support team available round the clock to help with any issues.",
            highlighted: false,
        },
        {
            icon: Cpu,
            title: "Powerful Hardware",
            description: "High-performance NVMe SSDs and latest CPUs for lag-free gaming.",
            highlighted: false,
        },
        {
            icon: Globe,
            title: "Global Locations",
            description: "Multiple data centers worldwide to ensure low latency for all players.",
            highlighted: false,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    isHighlighted={feature.highlighted}
                />
            ))}
        </div>
    );
}
