import GlobalServerLocations from './GlobalServerLocations';
import { FeaturesGrid } from './FeatureCard';

export default function ServerFeaturesSection() {
    return (
        <div className="bg-[#0A0A0A] py-24 relative overflow-hidden" id="locations">
            {/* Background noise texture */}
            <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                {/* Global Server Locations with 3D Globe */}
                <GlobalServerLocations />

                {/* Feature Cards with Glass Morphism */}
                <div className="mt-24 w-full">
                    <FeaturesGrid />
                </div>
            </div>
        </div>
    );
}
