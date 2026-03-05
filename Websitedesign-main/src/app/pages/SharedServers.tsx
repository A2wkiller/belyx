import { motion } from "motion/react";
import { Check, Shield, Zap, Globe, Clock, Headset, ChevronDown, ChevronRight, Server } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/moving-border";

import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";

export default function SharedServers() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");
  const [selectedPlanType, setSelectedPlanType] = useState<"budget" | "performance" | "enterprise">("performance");
  const [selectedCPU, setSelectedCPU] = useState<"all" | "amd" | "intel">("all");

  const plans = [
    {
      name: "Platinum 4 vCore / 8 GB",
      price: "299.00",
      cores: "4 vCPU Cores",
      ram: "8 GB DDR4 RAM",
      storage: "80 GB NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      popular: false
    },
    {
      name: "Platinum 6 vCore / 16 GB",
      price: "499.00",
      cores: "6 vCPU Cores",
      ram: "16 GB DDR4 RAM",
      storage: "150 GB NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      popular: false
    },
    {
      name: "Platinum 6 vCore / 24 GB",
      price: "799.00",
      cores: "6 vCPU Cores",
      ram: "24 GB DDR4 RAM",
      storage: "300 GB NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      popular: false
    },
    {
      name: "Platinum 8 vCore / 32 GB",
      price: "999.00",
      cores: "8 vCPU Cores",
      ram: "32 GB DDR4 RAM",
      storage: "200 GB NVMe SSD",
      bandwidth: "Unmetered Bandwidth",
      popular: true
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Instant Setup",
      desc: "Get your server up and running in seconds. No complicated configurations."
    },
    {
      icon: Shield,
      title: "DDoS Protection",
      desc: "Enterprise protection keeps your server online and secure against any attack."
    },
    {
      icon: Check, // Using Check as placeholder for Uptime icon if not exact match
      title: "99.9% Uptime",
      desc: "Our redundant infrastructure ensures your server stays online."
    },
    {
      icon: Headset,
      title: "24/7 Support",
      desc: "Expert support team available around the clock to help with any issues."
    },
    {
      icon: Zap, // Powerful Hardware
      title: "Powerful Hardware",
      desc: "High-performance NVMe SSDs and latest-gen CPUs for lag-free gaming."
    },
    {
      icon: Globe,
      title: "Global Locations",
      desc: "Multiple data centers worldwide to ensure low latency for all players."
    }
  ];

  const comparisonData = [
    { provider: "BelyxHost", price: "₹50/GB", processor: "AMD EPYC 9000", storage: "NVMe SSD", support: true, ddos: true, highlight: true },
    { provider: "OVH Cloud", price: "₹110/GB", processor: "AMD EPYC", storage: "NVMe SSD", support: true, ddos: true },
    { provider: "Sharkweb", price: "₹80/GB", processor: "Intel Xeon Gold", storage: "SATA SSD", support: false, ddos: true },
    { provider: "Pterodactyl", price: "₹60/GB", processor: "Unknown Intel", storage: "SATA SSD", support: false, ddos: false },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-teal-400 mb-4" />
          {/* Design has a logo at top, using Shield as placeholder or just text */}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          VPS HOSTING PLANS
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto mb-12 text-lg">
          High-performance virtual private servers with full root access, SSD storage, and instant deployment.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          {/* Plan Type Tabs */}
          <div className="bg-white/5 p-1 rounded-full flex items-center">
            <button
              onClick={() => setSelectedPlanType("budget")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedPlanType === "budget" ? "bg-teal-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
            >
              Budget
            </button>
            <button
              onClick={() => setSelectedPlanType("performance")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedPlanType === "performance" ? "bg-teal-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
            >
              Performance
            </button>
            <button
              onClick={() => setSelectedPlanType("enterprise")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedPlanType === "enterprise" ? "bg-teal-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
            >
              Enterprise
            </button>
          </div>

          {/* CPU Filter */}
          <div className="bg-white/5 p-1 rounded-full flex items-center">
            <button
              onClick={() => setSelectedCPU("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCPU === "all" ? "bg-teal-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCPU("amd")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCPU === "amd" ? "bg-teal-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
            >
              AMD
            </button>
            <button
              onClick={() => setSelectedCPU("intel")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCPU === "intel" ? "bg-teal-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
            >
              Intel
            </button>
          </div>

          {/* Currency/Billing */}
          <div className="bg-white/5 p-1 rounded-full flex items-center gap-2 px-4">
            <span className="text-white/60 text-sm">INR</span>
            <ChevronDown className="w-3 h-3 text-white/60" />
          </div>

          <div className="bg-white/5 p-1 rounded-full flex items-center gap-2 px-4">
            <span className="text-white/60 text-sm">Monthly</span>
            <ChevronDown className="w-3 h-3 text-white/60" />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-[#0F0F0F] rounded-3xl border ${plan.popular ? 'border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.1)]' : 'border-white/5'} p-6 md:p-8 text-left hover:border-teal-500/30 transition-colors group`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}

              <h3 className="text-white font-bold text-lg mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                <span className="text-white/40 text-sm">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Server className="w-4 h-4 text-teal-500" />
                  {plan.cores}
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Zap className="w-4 h-4 text-teal-500" />
                  {plan.ram}
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <HardDriveIcon className="w-4 h-4 text-teal-500" />
                  {plan.storage}
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Globe className="w-4 h-4 text-teal-500" />
                  {plan.bandwidth}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-white/40 text-xs">Supported OS</span>
                <div className="flex -space-x-2">
                  {/* OS Icons placeholders */}
                  <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-white/10" />
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-white/10" />
                  <div className="w-5 h-5 rounded-full bg-red-500/20 border border-white/10" />
                </div>
              </div>

              <Button
                duration={plan.popular ? 2000 : 4000}
                className={`transition-all ${plan.popular ? 'bg-teal-500 hover:bg-teal-400 text-black font-bold' : 'bg-[#111] text-white hover:bg-white/10 font-bold'}`}
                borderClassName={plan.popular ? 'bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]' : 'bg-[radial-gradient(var(--color-zinc-500)_40%,transparent_60%)]'}
                containerClassName="w-full mt-6 h-12 text-sm"
              >
                Buy now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* OS Logos Strip */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20 opacity-40 grayscale">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500" />
            <span className="text-white font-medium">Ubuntu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-600" />
            <span className="text-white font-medium">Debian</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500" />
            <span className="text-white font-medium">CentOS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-400" />
            <span className="text-white font-medium">Fedora</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-300" />
            <span className="text-white font-medium">Windows</span>
          </div>
        </div>
      </section>



      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-[#0F0F0F] border border-white/5 p-8 rounded-3xl hover:border-teal-500/30 transition-all group">
              <feature.icon className="w-8 h-8 text-teal-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Unmatched Speed, Incredible Value.</h2>
            <p className="text-white/60">Experience powerhouse performance with our AMD Ryzen 9000™ servers.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/5 bg-[#0A0A0A]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-white/40 text-xs uppercase tracking-wider">
                  <th className="p-6 font-medium">Provider</th>
                  <th className="p-6 font-medium">Price</th>
                  <th className="p-6 font-medium">Processor</th>
                  <th className="p-6 font-medium">Storage</th>
                  <th className="p-6 font-medium text-center">24/7 Support</th>
                  <th className="p-6 font-medium text-center">DDoS Protection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, i) => (
                  <tr key={i} className={`group transition-colors ${row.highlight ? 'bg-teal-900/10 hover:bg-teal-900/20' : 'hover:bg-white/5'}`}>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        {row.highlight ? (
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-teal-400" />
                            <span className="text-white font-bold">{row.provider}</span>
                            <span className="bg-teal-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">BEST</span>
                          </div>
                        ) : (
                          <span className="text-white font-medium">{row.provider}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-white font-mono text-sm">{row.price}</td>
                    <td className="p-6 text-white/70 text-sm flex items-center gap-2">
                      {row.processor.includes("AMD") && <div className="w-4 h-4 bg-red-500 rounded-sm" />}
                      {row.processor.includes("Intel") && <div className="w-4 h-4 bg-blue-500 rounded-sm" />}
                      {row.processor}
                    </td>
                    <td className="p-6 text-white/70 text-sm">{row.storage}</td>
                    <td className="p-6 text-center">
                      {row.support ? <Check className="w-5 h-5 text-teal-500 mx-auto" /> : <div className="w-5 h-5 text-red-500 mx-auto font-bold">✕</div>}
                    </td>
                    <td className="p-6 text-center">
                      {row.ddos ? <Check className="w-5 h-5 text-teal-500 mx-auto" /> : <div className="w-5 h-5 text-red-500 mx-auto font-bold">✕</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <FAQ />
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">Reputable Servers.</h2>
          <p className="text-white/60 text-center mb-16">See what our community has to say about their experience with BelyxHost.</p>
          {/* Using a simpler grid version since the main Testimonials component might be a marquee now */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl">
              <div className="flex gap-1 text-teal-400 mb-4"><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /></div>
              <p className="text-white/80 text-sm mb-6">"The migration from another provider was effortless. Performance is stable even during peak hours."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">A</div>
                <div><p className="text-white text-sm font-bold">Ananya Verma</p><p className="text-white/40 text-xs">Community Manager</p></div>
              </div>
            </div>
            <div className="bg-[#111] border border-teal-500/20 p-8 rounded-3xl shadow-2xl relative">
              <div className="flex gap-1 text-teal-400 mb-4"><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /></div>
              <p className="text-white/80 text-sm mb-6">"Running a Minecraft discord server needs serious hardware. BelyxHost delivers consistent performance."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-black flex items-center justify-center font-bold">K</div>
                <div><p className="text-white text-sm font-bold">Kunal Varma</p><p className="text-white/40 text-xs">Discord Server Owner</p></div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl">
              <div className="flex gap-1 text-teal-400 mb-4"><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /><Check className="w-4 h-4" /></div>
              <p className="text-white/80 text-sm mb-6">"The panel has been running our Defense Clan for months now. Uptime has been solid. Wouldn't switch."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">P</div>
                <div><p className="text-white text-sm font-bold">Priya Sai</p><p className="text-white/40 text-xs">Rust Server Admin</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/10 pt-20">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white mb-4">Make The Switch</h2>
            <p className="text-white/60 max-w-md">Join thousands of gamers who switched to faster, more reliable hosting. Experience the difference today.</p>
          </div>

          <div className="text-right">
            <p className="text-white text-2xl font-bold">SAVE 10%</p>
            <p className="text-white/40 text-sm uppercase tracking-wider mb-2">USE COUPON CODE</p>
            <div className="bg-white/10 px-4 py-2 rounded text-white font-mono tracking-widest inline-block">WELCOME10</div>
            <div className="flex gap-4 font-mono text-2xl font-bold text-white mt-6 justify-end">
              <div>00<span className="text-[10px] font-sans text-white/40 block text-center mt-1">Day</span></div>
              <div>:</div>
              <div>14<span className="text-[10px] font-sans text-white/40 block text-center mt-1">Hrs</span></div>
              <div>:</div>
              <div>44<span className="text-[10px] font-sans text-white/40 block text-center mt-1">Min</span></div>
              <div>:</div>
              <div>06<span className="text-[10px] font-sans text-white/40 block text-center mt-1">Sec</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HardDriveIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="12" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" x2="6.01" y1="16" y2="16" />
      <line x1="10" x2="10.01" y1="16" y2="16" />
    </svg>
  )
}