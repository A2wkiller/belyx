import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';

const InteractiveGlobe = lazy(() => import('./InteractiveGlobe'));

export default function GlobalServerLocations() {
    const locations = ['Frankfurt', 'Mumbai', 'New York', 'Singapore', 'Sydney'];

    return (
        <div className="py-24 px-6 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Global Server Locations
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    Strategically placed servers worldwide for minimal latency and maximum performance.
                </p>
            </div>

            {/* Globe Container */}
            <div className="relative w-full max-w-5xl mx-auto">

                {/* Globe */}
                <div className="relative aspect-square mx-auto">
                    <Suspense fallback={
                        <div className="aspect-square mx-auto flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
                        </div>
                    }>
                        <InteractiveGlobe />
                    </Suspense>
                </div>

                {/* Location Pills Below Globe */}
                <div className="flex flex-wrap justify-center gap-3 mt-12">
                    {locations.map((location, index) => (
                        <motion.button
                            key={location}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium hover:bg-teal-600 hover:border-teal-500 hover:text-white transition-all duration-300 pointer-events-none"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                                {location}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}
