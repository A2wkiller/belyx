import { assets } from "../assets";
import { Features } from "../components/Features";
import ServerFeaturesSection from "../components/ServerFeaturesSection";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import { motion, AnimatePresence } from "motion/react";
import { Search, Shield, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { spring, fadeUp, viewportDefaults } from "../lib/animations";
import { CountdownTimer } from "../components/ui/CountdownTimer";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import HeroSection from "../components/ui/glassmorphism-trust-hero";
import { FocusRail, type FocusRailItem } from "../components/ui/focus-rail";

const POPULAR_GAMES_ITEMS: FocusRailItem[] = [
  {
    id: "Minecraft",
    title: "Minecraft",
    description: "Build, explore, and survive in your own custom blocky world.",
    meta: "1M+ Players • Sandbox",
    imageSrc: "/img1/minecraft.png",
    href: "/games/Minecraft",
  },
  {
    id: "Rust",
    title: "Rust",
    description: "Survive the harsh wilderness and other players in this brutal multiplayer game.",
    meta: "50k+ Players • Survival",
    imageSrc: "/img1/rust.jpg",
    href: "/games/Rust",
  },
  {
    id: "ARK",
    title: "ARK: Survival Evolved",
    description: "Tame dinosaurs and conquer the prehistoric lands with your tribe.",
    meta: "25k+ Players • Survival",
    imageSrc: "/img1/ark.png",
    href: "/games/ARK",
  },
  {
    id: "CS2",
    title: "Counter-Strike 2",
    description: "Experience the next era of competitive tactical shooters.",
    meta: "100k+ Players • FPS",
    imageSrc: "/img1/cs2.png",
    href: "/games/CS2",
  },
  {
    id: "Valheim",
    title: "Valheim",
    description: "A brutal exploration and survival game for 1-10 players set in a procedurally-generated purgatory.",
    meta: "40k+ Players • RPG",
    imageSrc: "/img1/velhemi.png",
    href: "/games/Valheim",
  },
  {
    id: "GarrysMod",
    title: "Garry's Mod",
    description: "A physics sandbox. There aren't any predefined aims or goals. We give you the tools and leave you to play.",
    meta: "30k+ Players • Sandbox",
    imageSrc: "/img1/garry mod.png",
    href: "/games/GarrysMod",
  },
  {
    id: "Hytale",
    title: "Hytale",
    description: "Embark on a journey of adventure and creativity! Hytale combines the scope of a sandbox with the depth of a roleplaying game.",
    meta: "Coming Soon • RPG",
    imageSrc: "/img1/hytale.png",
    href: "/games/Hytale",
  }
];

const games = [
  { id: "Rust", name: "Rust", img: assets.imgRust, players: "50k+" },
  { id: "Minecraft", name: "Minecraft", img: assets.imgMinecraft, players: "1M+" },
  { id: "ARK", name: "Ark: SE", img: assets.imgArk, players: "25k+" },
  { id: "Valheim", name: "Valheim", img: assets.imgValheim, players: "40k+" },
  { id: "GarrysMod", name: "Garry's Mod", img: assets.imgGarrysMod, players: "30k+" },
  { id: "CS2", name: "Counter-Strike 2", img: assets.imgCs2, players: "100k+" },
  { id: "Hytale", name: "Hytale", img: assets.imgHytale, players: "Coming Soon" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="bg-[#0A0A0A]">

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/10 via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">

          <HeroSection />
        </div>
      </section>

      {/* Popular Games Rail */}
      <section className="w-full flex flex-col items-center justify-center py-20 bg-[#0A0A0A]" id="games">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Popular Games</h2>
          <p className="text-white/50 text-lg">Navigate the rail to explore our most popular hosting options.</p>
        </div>

        <FocusRail
          items={POPULAR_GAMES_ITEMS}
          autoPlay={false}
          loop={true}
        />
      </section>

      <ServerFeaturesSection />

      {/* FAQ */}
      <FAQ />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-teal-900/20 to-blue-900/20 border border-white/10 p-12 md:p-20 relative overflow-hidden text-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Make The Switch</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              Join thousands of gamers who switched to faster, more reliable hosting. Experience the difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="text-right">
                <p className="text-white font-bold text-lg">SAVE 10%</p>
                <p className="text-white/40 text-xs uppercase tracking-wider">Use Code: WELCOME10</p>
              </div>
              <div className="h-12 w-px bg-white/10 hidden sm:block" />
              <CountdownTimer labelSize="text-xs" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
