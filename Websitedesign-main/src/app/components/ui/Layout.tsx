import { Link, Outlet, useLocation } from "react-router";
import { assets } from "../../assets";
import { Menu, X, ChevronDown, ShoppingCart, Home, Gamepad2, Server } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { spring } from "../../lib/animations";
import { toast } from "sonner";
import { Toaster } from "./sonner";
import { AnimeNavBar } from "./anime-navbar";
import { Button } from "./moving-border";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const animeNavItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Games", url: "/games", icon: Gamepad2 },
    { name: "Shared", url: "/shared", icon: Server, comingSoon: true },
    { name: "Dedicated", url: "/dedicated", icon: Server, comingSoon: true },
  ];

  const links = [
    { name: "Dedicated Server", path: "/dedicated", comingSoon: true },
    { name: "Games", path: "/games" },
    { name: "Shared Servers", path: "/shared", comingSoon: true },
  ];

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Montserrat'] selection:bg-teal-500 selection:text-white">
      <AnimeNavBar items={animeNavItems} defaultActive="Home" />
      {/* Navbar */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled
            ? "glass-effect-nav"
            : "bg-[#0A0A0A]/50 backdrop-blur-md border-b border-transparent shadow-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img
              src={assets.imgBelyxHostLogo}
              alt="BelyxHost logo"
              className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-80"
              width="40"
              height="40"
              loading="eager"
              decoding="async"
            />
          </Link>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={spring.fast}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={spring.snappy}
              className="md:hidden bg-[#0D0D0D] border-t border-white/5 absolute w-full z-40 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {links.map((link, i) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...spring.snappy, delay: i * 0.04 }}
                    >
                      {link.comingSoon ? (
                        <div
                          onClick={() => {
                            toast.info(`${link.name} is coming soon!`);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white/40 cursor-pointer hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium">{link.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20">Soon</span>
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className={clsx(
                            "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200",
                            active
                              ? "bg-teal-500/10 text-teal-400"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />}
                          <span className="text-sm font-medium">{link.name}</span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                <div className="h-px bg-white/5 my-3" />

                <motion.div
                  className="flex flex-col gap-3 px-4"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring.snappy, delay: 0.15 }}
                >
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white font-medium"
                  >
                    <ShoppingCart className="w-4 h-4 text-teal-400" />
                    View Cart
                  </Link>
                  <Button
                    onClick={() => {
                      toast.info("Client area is coming soon!");
                      setIsMenuOpen(false);
                    }}
                    duration={3000}
                    className="bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 font-bold transition-all flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.15)]"
                    containerClassName="w-full h-12 text-sm"
                    borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
                  >
                    Client Area
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav >

      {/* Main Content */}
      < main className="pt-20 min-h-[calc(100vh-400px)]" >
        <Outlet />
      </main >

      {/* Footer */}
      < footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10" >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <img
                  src={assets.imgBelyxHostLogo}
                  alt="BelyxHost logo"
                  className="h-8 w-auto grayscale opacity-80"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-lg font-bold tracking-tight text-white/80">BelyxHost</span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                High-performance game hosting built by gamers, for gamers. Experience low latency, DDoS protection, and 24/7 support.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-4 h-4 bg-white/40 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Product</h3>
              <ul className="space-y-4 text-sm text-white/40">
                <li><Link to="/games" className="hover:text-teal-400 transition-colors">Game Servers</Link></li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors"
                  onClick={() => toast.info("Dedicated Servers are coming soon!")}
                >
                  <span>Dedicated Servers</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20">Soon</span>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors"
                  onClick={() => toast.info("VPS Hosting is coming soon!")}
                >
                  <span>VPS Hosting</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20">Soon</span>
                </li>
                <li><Link to="/locations" className="hover:text-teal-400 transition-colors">Global Locations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-white/40">
                <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors"
                  onClick={() => toast.info("Blog is coming soon!")}
                >
                  <span>Blog</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20">Coming Soon</span>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors"
                  onClick={() => toast.info("Partners program is coming soon!")}
                >
                  <span>Partners</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20">Coming Soon</span>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors"
                  onClick={() => toast.info("Careers page is coming soon!")}
                >
                  <span>Careers</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20">Coming Soon</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Legal</h3>
              <ul className="space-y-4 text-sm text-white/40">
                <li><Link to="/tos" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/aup" className="hover:text-teal-400 transition-colors">Acceptable Use Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/20">
            <p>&copy; {new Date().getFullYear()} BelyxHost. All rights reserved.</p>
            <p>Designed with ❤️ for Gamers</p>
          </div>
        </div>
      </footer >
      <Toaster richColors position="top-right" />
    </div >
  );
}
