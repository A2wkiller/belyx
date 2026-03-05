import { useState, useEffect, useRef } from "react";
import { assets } from "../assets";
import { GlobalMap } from "../components/GlobalMap";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import {
  Check,
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  Shield,
  Globe,
  Headset,
  ChevronDown,
  ChevronUp,
  Users,
  Wrench,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { spring } from "../lib/animations";
import { useParams, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";

// Import Assets
import imgMinecraftBg from "@/assets/e5c968a58f45453295ad7a7c62e3e2f86b0a2410.png";
import imgMinecraftChar from "@/assets/a152bda96d5c532467d9d67bab5147033a068957.png";
import imgMinecraftIcon from "@/assets/0c0f675c0f288901b7ba38bd8c7e4c12a9287a84.png";
import imgMinecraftPricingIcon from "@/assets/1bd2706a2cae8bc4b83b67be24ead2aea5edd13b.png";

import imgArkBg from "@/assets/ed20c023643af742a4779d1d702a15ecad5221be.png";
import imgArkChar from "@/assets/83eb5048dcf5c24d217b0229f22e11435f0efd75.png";
import imgArkIcon from "@/assets/a6380ed7923373c70790a9bd9c19d23698c9769f.png";
import imgArkPricingIcon from "@/assets/57d153381d6c8978989e9e59494fa2b4625bbe61.png";

import imgHytaleBg from "@/assets/b300a862ad5004e30466f6b55f8cf41a972c15d6.png";
import imgHytaleChar from "@/assets/69f648bc647c0625f843e44be9e8564f22ad27b5.png";
import imgHytaleIcon from "@/assets/f8a73630a828371b55cb47c704c6c84b5e6031ca.png";
import imgHytalePricingIcon from "@/assets/6e961948fc1856b917e44a6b39328008fbc6449e.png";

import imgCs2Bg from "@/assets/009d88ff4ead575b381cf22ed903e3663684f638.png";
import imgCs2Icon from "@/assets/c82ff8fbe9fc26401e78bc69f98e3fd9d3442d77.png";

import imgGarrysModIcon from "@/assets/5772eaa1b74aafcbf91af901345f72098fd056f8.png";
import imgGarrysModBg from "@/assets/3e16f6bf7ae00f262f7683f2e9dbd0df2943bbaf.png";
const imgConsole = "/img1/panel.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import svgPaths from "../../imports/svg-1rflh19blp";

type Plan = {
  name: string;
  price: string;
  ram: string;
  cpu: string;
  storage: string;
  players: string;
};

type GameData = {
  id: string;
  name: string;
  bgImage: string;
  videoSrc?: string;
  charImage: string;
  icon: string;
  pricingIcon: string;
  startingPrice: string;
  starterPlans?: Plan[];
  standardPlans: Plan[];
  premiumPlans?: Plan[];
};

const games: Record<string, GameData> = {
  Minecraft: {
    id: "Minecraft",
    name: "Minecraft",
    bgImage: imgMinecraftBg,
    videoSrc: "/vid/minecraft.mp4",
    charImage: imgMinecraftChar,
    icon: imgMinecraftIcon,
    pricingIcon: imgMinecraftPricingIcon,
    startingPrice: "₹40.00/month",
    starterPlans: [
      {
        name: "Dirt",
        price: "₹40.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "Stone",
        price: "₹80.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
      {
        name: "Iron",
        price: "₹120.00",
        ram: "6 GB RAM",
        cpu: "200% CPU",
        storage: "40 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "Coal",
        price: "₹160.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Copper",
        price: "₹240.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
      {
        name: "Gold",
        price: "₹320.00",
        ram: "16 GB RAM",
        cpu: "350% CPU",
        storage: "55 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "Redstone",
        price: "₹480.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "Diamond",
        price: "₹640.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
      {
        name: "Netherite",
        price: "₹960.00",
        ram: "48 GB RAM",
        cpu: "600% CPU",
        storage: "70 GB SSD",
        players: "Premium",
      },
    ],
  },
  ARK: {
    id: "ARK",
    name: "ARK",
    bgImage: imgArkBg,
    videoSrc: "/vid/ark.mp4",
    charImage: imgArkChar,
    icon: imgArkIcon,
    pricingIcon: imgArkPricingIcon,
    startingPrice: "₹80.00/month",
    starterPlans: [
      {
        name: "Alpha",
        price: "₹90.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "Beta",
        price: "₹180.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "Gamma",
        price: "₹360.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Delta",
        price: "₹540.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "Epsilon",
        price: "₹1080.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "Zeta",
        price: "₹1440.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
    ],
  },
  Hytale: {
    id: "Hytale",
    name: "Hytale",
    bgImage: imgHytaleBg,
    videoSrc: "/vid/hytale.mp4",
    charImage: imgHytaleChar,
    icon: imgHytaleIcon,
    pricingIcon: imgHytalePricingIcon,
    startingPrice: "₹90.00/month",
    starterPlans: [
      {
        name: "Adventure",
        price: "₹90.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "Explorer",
        price: "₹180.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "Builder",
        price: "₹360.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Creator",
        price: "₹540.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "Master",
        price: "₹1080.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "Legend",
        price: "₹1440.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
    ],
  },
  GarrysMod: {
    id: "GarrysMod",
    name: "Garry's Mod",
    bgImage: assets.imgGarrysMod,
    // No garrysmod.mp4 available – will fall back to static image
    charImage: imgGarrysModIcon,
    icon: imgGarrysModIcon,
    pricingIcon: imgGarrysModIcon,
    startingPrice: "₹90.00/month",
    starterPlans: [
      {
        name: "Sandbox",
        price: "₹90.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "TTT",
        price: "₹180.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "DarkRP",
        price: "₹360.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Prop Hunt",
        price: "₹540.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "Jailbreak",
        price: "₹1080.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "Deathrun",
        price: "₹1440.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
    ],
  },
  CS2: {
    id: "CS2",
    name: "CS2",
    bgImage: assets.imgCsgo,
    videoSrc: "/vid/cs2.mp4",
    charImage: imgCs2Icon, // Using icon as fallback/placeholder for char image
    icon: imgCs2Icon,
    pricingIcon: imgCs2Icon,
    startingPrice: "₹90.00/month",
    starterPlans: [
      {
        name: "Casual",
        price: "₹90.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "Premier",
        price: "₹180.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "Tournament",
        price: "₹360.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Pro",
        price: "₹540.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "Elite",
        price: "₹1080.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "Ultimate",
        price: "₹1440.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
    ],
  },
  Rust: {
    id: "Rust",
    name: "Rust",
    bgImage: assets.imgRust, // Using Rust banner
    videoSrc: "/vid/rust.mp4",
    charImage: assets.imgRust, // Using icon/banner as placeholder
    icon: assets.imgRust,
    pricingIcon: assets.imgRust,
    startingPrice: "₹90.00/month",
    starterPlans: [
      {
        name: "Small",
        price: "₹90.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "Medium",
        price: "₹180.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "Large",
        price: "₹360.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Extra Large",
        price: "₹540.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "X-Large",
        price: "₹1080.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "XX-Large",
        price: "₹1440.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
    ],
  },
  Valheim: {
    id: "Valheim",
    name: "Valheim",
    bgImage: assets.imgValheim, // Using Valheim banner
    videoSrc: "/vid/valheim.mp4",
    charImage: assets.imgValheim, // Using Valheim icon/banner
    icon: assets.imgValheim,
    pricingIcon: assets.imgValheim,
    startingPrice: "₹90.00/month",
    starterPlans: [
      {
        name: "Spark",
        price: "₹90.00",
        ram: "2 GB RAM",
        cpu: "100% CPU",
        storage: "20 GB SSD",
        players: "Starter",
      },
      {
        name: "Blaze",
        price: "₹180.00",
        ram: "4 GB RAM",
        cpu: "150% CPU",
        storage: "30 GB SSD",
        players: "Starter",
      },
    ],
    standardPlans: [
      {
        name: "Inferno",
        price: "₹360.00",
        ram: "8 GB RAM",
        cpu: "250% CPU",
        storage: "45 GB SSD",
        players: "Standard",
      },
      {
        name: "Volcano",
        price: "₹540.00",
        ram: "12 GB RAM",
        cpu: "300% CPU",
        storage: "50 GB SSD",
        players: "Standard",
      },
    ],
    premiumPlans: [
      {
        name: "Infinity",
        price: "₹1080.00",
        ram: "24 GB RAM",
        cpu: "400% CPU",
        storage: "60 GB SSD",
        players: "Premium",
      },
      {
        name: "Omega",
        price: "₹1440.00",
        ram: "32 GB RAM",
        cpu: "450% CPU",
        storage: "65 GB SSD",
        players: "Premium",
      },
    ],
  },
};

const gameList = [
  { id: "Minecraft", name: "Minecraft", icon: imgMinecraftIcon },
  { id: "ARK", name: "ARK", icon: imgArkIcon },
  { id: "CS2", name: "CS2", icon: imgCs2Icon },
  { id: "GarrysMod", name: "Garry's Mod", icon: imgGarrysModIcon },
  { id: "Hytale", name: "Hytale", icon: imgHytaleIcon },
  { id: "Rust", name: "Rust", icon: assets.imgRust },
  { id: "Valheim", name: "Valheim", icon: assets.imgValheim },
];

export default function GameHosting() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("Minecraft");

  useEffect(() => {
    if (gameId && games[gameId]) {
      setSelectedGame(gameId);
    }
  }, [gameId]);
  const [billingCycle, setBillingCycle] = useState<"Mo" | "3Mo" | "Yr">("Mo");
  const [planTier, setPlanTier] = useState<"Starter" | "Standard" | "Premium">(
    "Standard",
  );

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const currentGame = games[selectedGame] || games["Minecraft"];

  // Reset and play video whenever the selected game changes
  useEffect(() => {
    setVideoLoaded(false);
    setVideoError(false);
    if (videoRef.current && currentGame.videoSrc) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, [currentGame.id]);

  // Effective tier: fall back to Standard if selected tier has no plans
  const effectiveTier =
    (planTier === "Starter" && !currentGame.starterPlans) ||
    (planTier === "Premium" && !currentGame.premiumPlans)
      ? "Standard"
      : planTier;

  // Determine which plans to show
  const currentPlans =
    effectiveTier === "Starter"
      ? currentGame.starterPlans || currentGame.standardPlans
      : effectiveTier === "Premium"
        ? currentGame.premiumPlans || currentGame.standardPlans
        : currentGame.standardPlans;

  // Calculate starting price dynamically based on first plan of selected tier
  const handleAddToCart = (plan: Plan) => {
    try {
      const cartItem = {
        id: crypto.randomUUID(),
        name: `${currentGame.name} — ${plan.name}`,
        price: plan.price,
        gameId: currentGame.id,
        ram: plan.ram,
        cpu: plan.cpu,
        storage: plan.storage,
        tier: effectiveTier,
      };
      const existingCart = JSON.parse(
        localStorage.getItem("belyx_cart") || "[]",
      );
      localStorage.setItem(
        "belyx_cart",
        JSON.stringify([...existingCart, cartItem]),
      );
      toast.success(`${plan.name} added to cart!`, {
        description: `${currentGame.name} · ${plan.ram} · ${plan.price}/mo`,
        action: {
          label: "View Cart",
          onClick: () => navigate("/cart"),
        },
      });
    } catch {
      toast.error("Failed to add item to cart.");
    }
  };

  const displayStartingPrice =
    currentPlans.length > 0
      ? `Starting from ${currentPlans[0].price}/month`
      : currentGame.startingPrice;

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              GAME SERVER HOSTING
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              High-performance game servers with instant setup, DDoS protection,
              and powerful hardware for lag-free gaming.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-1 bg-teal-500/5 backdrop-blur-sm p-1 rounded-full border border-teal-500/10 mb-8 relative z-10">
            {["Mo", "3Mo", "Yr"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle as any)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all relative",
                  billingCycle === cycle
                    ? "text-white"
                    : "text-white/60 hover:text-white",
                )}
              >
                {billingCycle === cycle && (
                  <motion.div
                    layoutId="billingCycle"
                    className="absolute inset-0 bg-teal-600 rounded-full shadow-lg shadow-teal-500/20"
                    transition={spring.bouncy}
                  />
                )}
                <span className="relative z-10">{cycle}</span>
              </button>
            ))}
          </div>

          {/* Game Banner Card */}
          <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl group mb-8">
            <div className="relative aspect-[21/9] md:aspect-[21/6]">
              {/* Video background (if available and no error) */}
              {currentGame.videoSrc && !videoError ? (
                <>
                  <video
                    ref={videoRef}
                    key={currentGame.id}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster={currentGame.bgImage}
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoError(true)}
                    className={clsx(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                      videoLoaded ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <source src={currentGame.videoSrc} type="video/mp4" />
                  </video>
                  {/* Fallback image shown while video is loading */}
                  {!videoLoaded && (
                    <ImageWithFallback
                      src={currentGame.bgImage}
                      alt={`${currentGame.name} banner`}
                      decoding="async"
                      fetchPriority="high"
                      sizes="(min-width:1024px) 60vw, 100vw"
                      width="1600"
                      height="600"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </>
              ) : (
                /* Static image fallback – no video or video errored */
                <ImageWithFallback
                  src={currentGame.bgImage}
                  alt={`${currentGame.name} banner`}
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width:1024px) 60vw, 100vw"
                  width="1600"
                  height="600"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Live indicator shown when video is playing */}
              {videoLoaded && currentGame.videoSrc && !videoError && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-medium flex items-center gap-2 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>LIVE</span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center px-8 md:px-16">
                <div className="flex items-center gap-6 max-w-3xl">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 p-3 flex-shrink-0">
                    <ImageWithFallback
                      src={currentGame.icon}
                      alt={`${currentGame.name} icon`}
                      loading="lazy"
                      decoding="async"
                      width="96"
                      height="96"
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                      {currentGame.name}
                    </h2>
                    <p className="text-teal-400 font-semibold text-lg md:text-xl">
                      {displayStartingPrice}
                    </p>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {(["Starter", "Standard", "Premium"] as const).map(
                        (tier) => {
                          const isDisabled =
                            (tier === "Starter" && !currentGame.starterPlans) ||
                            (tier === "Premium" && !currentGame.premiumPlans);
                          const isActive = effectiveTier === tier;
                          return (
                            <button
                              key={tier}
                              onClick={() => !isDisabled && setPlanTier(tier)}
                              disabled={isDisabled}
                              className={clsx(
                                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-sm border",
                                isActive
                                  ? "bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-500/30"
                                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white",
                                isDisabled &&
                                  "opacity-30 cursor-not-allowed hover:bg-white/5 hover:text-white/70",
                              )}
                            >
                              {tier}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Selector List */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
            {gameList.map((game) => (
              <button
                key={game.id}
                onClick={() => games[game.id] && setSelectedGame(game.id)}
                className={clsx(
                  "flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300",
                  selectedGame === game.id
                    ? "bg-teal-600 border-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                    : "bg-teal-500/5 border-teal-500/10 text-white/60 hover:bg-teal-500/10 hover:border-teal-500/30 hover:text-white",
                )}
              >
                <ImageWithFallback
                  src={game.icon}
                  alt={`${game.name} icon`}
                  loading="lazy"
                  decoding="async"
                  width="20"
                  height="20"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-medium">{game.name}</span>
              </button>
            ))}
          </div>

          {/* Pricing Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mt-20">
            {currentPlans.slice(0, 3).map((plan, index) => {
              // Determine if this is the popular plan
              // For Minecraft: Gold. For Garry's Mod: TTT. CS2: Premier. Others: 2nd plan.
              const isPopular =
                selectedGame === "Minecraft"
                  ? plan.name === "Gold"
                  : selectedGame === "GarrysMod"
                    ? plan.name === "TTT"
                    : selectedGame === "CS2"
                      ? plan.name === "Premier"
                      : index === 1;

              return (
                <motion.div
                  key={`${plan.name}-${planTier}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={clsx(
                    "relative rounded-3xl border transition-all duration-300 group",
                    isPopular
                      ? "bg-gradient-to-br from-teal-950/40 to-[#0a0a0a] border-teal-500/50 shadow-xl shadow-teal-500/10"
                      : "bg-gradient-to-br from-[#111] to-[#0a0a0a] border-white/10 hover:border-teal-500/30",
                  )}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-6 overflow-hidden rounded-3xl">
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-4 -top-4 opacity-[0.03] transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <ImageWithFallback
                        src={currentGame.icon}
                        alt=""
                        role="presentation"
                        aria-hidden="true"
                        className="w-36 h-36 grayscale"
                      />
                    </div>

                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                          <ImageWithFallback
                            src={currentGame.pricingIcon}
                            alt={`${currentGame.name} icon`}
                            loading="lazy"
                            decoding="async"
                            className="w-5 h-5 object-contain opacity-80"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {plan.name}
                          </h3>
                          <p className="text-white/40 text-xs">
                            {currentGame.name} Server
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 relative z-10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white">
                          {plan.price}
                        </span>
                        <span className="text-white/40 font-medium text-sm">
                          /month
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                          <MemoryStick className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-xs font-medium text-white/80">
                          {plan.ram}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-xs font-medium text-white/80">
                          {plan.cpu}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                          <HardDrive className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-xs font-medium text-white/80">
                          {plan.storage}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                          <Users className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-xs font-medium text-white/80">
                          {plan.players}
                        </span>
                      </div>
                    </div>

                    <InteractiveHoverButton
                      text="Order Now"
                      onClick={() => handleAddToCart(plan)}
                      className="w-full bg-teal-500 text-black border-teal-600 hover:bg-teal-600"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Features Strip */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 w-full max-w-5xl">
            <FeaturePill
              icon={Zap}
              title="Instant Setup"
              subtitle="Ready in seconds"
            />
            <FeaturePill
              icon={Shield}
              title="DDoS Protection"
              subtitle="Enterprise-grade"
            />
            <FeaturePill
              icon={Wrench}
              title="Mod Support"
              subtitle="Easy installation"
            />
            <FeaturePill
              icon={Headset}
              title="24/7 Support"
              subtitle="Always here to help"
            />
          </div>
        </div>
      </div>

      {/* Control Panel Section */}
      <div className="py-24 bg-[#0F0F0F] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Control Panel
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Manage your game server without hassle. Our custom-built control
              panel powered by Pterodactyl gives you full control over your
              server files, plugins, and settings right at your fingertips.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Instant Deploy", desc: "Server ready in seconds" },
                {
                  title: "One-Click Install",
                  desc: "Mods & plugins made easy",
                },
                { title: "Real-Time Stats", desc: "Monitor performance live" },
                { title: "Secure Access", desc: "2FA & sub-user management" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-black/20 p-4 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors group"
                >
                  <h4 className="text-teal-400 font-bold mb-1 group-hover:text-teal-300">
                    {item.title}
                  </h4>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button className="px-6 py-2 rounded-full bg-teal-600 text-white font-medium text-sm hover:bg-teal-500 transition-colors">
                Console
              </button>
              <button className="px-6 py-2 rounded-full bg-white/5 text-white/60 font-medium text-sm hover:text-white hover:bg-white/10 transition-colors">
                File Manager
              </button>
              <button className="px-6 py-2 rounded-full bg-white/5 text-white/60 font-medium text-sm hover:text-white hover:bg-white/10 transition-colors">
                Activity
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-teal-500/20 blur-3xl rounded-full opacity-20" />
            <ImageWithFallback
              src={imgConsole}
              alt="Control Panel"
              loading="lazy"
              decoding="async"
              className="relative w-full rounded-2xl border border-white/10 shadow-2xl bg-[#0a0a0a]"
            />
          </div>
        </div>
      </div>

      <GlobalMap />

      {/* Features Grid (Separate from Strip) */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Zap}
            title="Instant Setup"
            desc="Get your server running in seconds. Our automated system handles the deployment instantly after payment."
          />
          <FeatureCard
            icon={Shield}
            title="DDoS Protection"
            desc="Advanced mitigation strategies protect your server from attacks, ensuring maximum uptime."
          />
          <FeatureCard
            icon={Globe}
            title="99.9% Uptime"
            desc="Our robust infrastructure ensures your server stays online with a 99.9% uptime SLA guarantee."
          />
          <FeatureCard
            icon={Headset}
            title="24/7 Support"
            desc="Expert support team available around the clock to help with any issues or questions you may have."
          />
          <FeatureCard
            icon={Cpu}
            title="Powerful Hardware"
            desc="High-performance CPUs and NVMe SSDs ensure lag-free gaming experience for all players."
          />
          <FeatureCard
            icon={MapPin}
            title="Global Locations"
            desc="Multiple data centers worldwide to ensure low latency for all players, wherever they are."
          />
        </div>
      </div>

      <FAQ />
      <Testimonials />

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
              Make The Switch
            </h2>
            <p className="text-white/60 mb-8">
              Join thousands of gamers who switched to faster, more reliable
              hosting. Experience the difference today.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 backdrop-blur-md border border-teal-500/20 p-8 rounded-3xl text-center md:text-right">
            <p className="text-sm font-bold text-white mb-1">SAVE 10%</p>
            <p className="text-xs text-teal-400 mb-6 uppercase tracking-widest">
              USE COUPON CODE: WELCOME10
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-end text-white">
              <div className="text-center">
                <span className="text-3xl font-bold font-mono">00</span>
                <p className="text-[10px] text-white/40 uppercase">Days</p>
              </div>
              <span className="text-2xl text-white/20">:</span>
              <div className="text-center">
                <span className="text-3xl font-bold font-mono">14</span>
                <p className="text-[10px] text-white/40 uppercase">Hrs</p>
              </div>
              <span className="text-2xl text-white/20">:</span>
              <div className="text-center">
                <span className="text-3xl font-bold font-mono">45</span>
                <p className="text-[10px] text-white/40 uppercase">Min</p>
              </div>
              <span className="text-2xl text-white/20">:</span>
              <div className="text-center">
                <span className="text-3xl font-bold font-mono">08</span>
                <p className="text-[10px] text-white/40 uppercase">Sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturePill({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-teal-500/5 backdrop-blur-sm border border-teal-500/10 rounded-full pl-2 pr-6 py-2">
      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white leading-tight">{title}</h4>
        <p className="text-xs text-white/40">{subtitle}</p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-[#111] hover:border-teal-500/20 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-teal-500/5 flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500 group-hover:text-black transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
