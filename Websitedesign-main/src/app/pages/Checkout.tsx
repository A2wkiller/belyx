import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  CreditCard,
  ChevronRight,
  Check,
  ArrowLeft,
  ShoppingCart,
  Zap,
  Headset,
  Lock,
  CheckCircle2,
  Sparkles,
  Package,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { spring, fadeUp } from "../lib/animations";
import { toast } from "sonner";
import LoadingVideo from "../components/LoadingVideo";

interface CartItem {
  id: string;
  name: string;
  price: string;
  gameId: string;
  ram?: string;
  cpu?: string;
  storage?: string;
  players?: string;
  tier?: string;
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
}

// ─── Order Success Screen ───────────────────────────────────────────────────
function OrderSuccess({ total }: { total: number }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring.gentle}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 280,
            damping: 22,
          }}
          className="relative w-36 h-36 mx-auto mb-10"
        >
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-teal-500/15 border border-teal-500/30" />
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-600/30 to-teal-400/20 border-2 border-teal-500/60 shadow-2xl shadow-teal-500/20">
            <CheckCircle2 className="w-16 h-16 text-teal-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, ...spring.gentle }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-white/50 text-lg mb-8 leading-relaxed">
            Your server is being provisioned. You'll receive login details via
            email within a few minutes.
          </p>
        </motion.div>

        {/* Summary pill */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, ...spring.gentle }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 font-semibold mb-10"
        >
          <Sparkles className="w-5 h-5" />₹{total.toFixed(2)} / month — Server
          active shortly
        </motion.div>

        {/* Feature checklist */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, ...spring.gentle }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-8 mb-8 text-left"
        >
          {[
            "Instant server provisioning underway",
            "Email confirmation sent",
            "DDoS protection active by default",
            "24/7 support available from day one",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08, ...spring.gentle }}
              className="flex items-center gap-3 py-2.5 border-b border-white/[0.06] last:border-0"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="text-white/70 text-sm">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, ...spring.gentle }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            to="/"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/games"
            className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 font-semibold transition-all"
          >
            Browse More Servers
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Checkout ──────────────────────────────────────────────────────────
export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("belyx_cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      if (items.length === 0) {
        toast.info("Your cart is empty. Add a plan first.");
        navigate("/games");
      }
    } else {
      toast.info("Your cart is empty. Add a plan first.");
      navigate("/games");
    }
  }, [navigate]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price),
    0,
  );

  const handlePayment = () => {
    if (cartItems.length === 0) return;
    setLoading(true);

    // Simulated Cashfree gateway handoff — replace with real integration
    setTimeout(() => {
      setLoading(false);
      toast.success("Redirecting to Cashfree Secure Gateway...");
      // In production:
      // window.location.href = cashfreePaymentUrl;

      // Demo: mark as complete
      localStorage.removeItem("belyx_cart");
      setOrderComplete(true);
    }, 3000);
  };

  if (orderComplete) {
    return <OrderSuccess total={totalPrice} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 relative">
      <LoadingVideo isVisible={loading} message="Processing your payment..." />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back link */}
        <motion.div {...fadeUp} transition={spring.gentle}>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, ...spring.gentle }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Checkout
          </h1>
          <p className="text-white/50 text-lg">
            You're one step away from your high-performance server.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left column: Order review ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Order Items Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...spring.gentle }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl overflow-hidden"
            >
              {/* Card header */}
              <div className="px-8 py-5 border-b border-white/[0.07] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-teal-400" />
                </div>
                <h2 className="text-lg font-bold text-white">Order Review</h2>
                <span className="ml-auto text-sm text-white/30 font-medium">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-white/[0.06]">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + index * 0.05,
                      ...spring.gentle,
                    }}
                    className="px-8 py-5 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Package className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-0.5 capitalize">
                        {item.gameId} Server
                        {item.tier ? ` · ${item.tier}` : ""}
                      </p>
                      {item.ram && (
                        <p className="text-white/25 text-[11px] mt-1 font-mono">
                          {item.ram} · {item.cpu} · {item.storage}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-bold">{item.price}</p>
                      <p className="text-white/30 text-xs">/month</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Totals footer */}
              <div className="px-8 py-5 bg-white/[0.02] border-t border-white/[0.07] space-y-2.5">
                <div className="flex justify-between text-sm text-white/50">
                  <span>
                    Subtotal ({cartItems.length} item
                    {cartItems.length !== 1 ? "s" : ""})
                  </span>
                  <span className="tabular-nums">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>Tax (0%)</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/[0.08]">
                  <span>Total due today</span>
                  <span className="text-teal-400 tabular-nums">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Features & Inclusions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, ...spring.gentle }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-8"
            >
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-5">
                What's included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Zap, text: "Instant Provisioning" },
                  { icon: Shield, text: "Enterprise DDoS Protection" },
                  { icon: Headset, text: "24/7 Premium Support" },
                  { icon: Lock, text: "Secure Encrypted Backups" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-white/60 text-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security notice */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, ...spring.gentle }}
              className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-teal-500/[0.05] border border-teal-500/20"
            >
              <Shield className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <p className="text-white/50 text-sm leading-relaxed">
                Your payment is secured with enterprise-grade TLS encryption. We
                never store card details — all transactions are handled by
                Cashfree's PCI-DSS certified gateway.
              </p>
            </motion.div>
          </div>

          {/* ── Right column: Payment ── */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, ...spring.gentle }}
              className="sticky top-28 space-y-5"
            >
              {/* Payment Method Card */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

                {/* Dot-grid */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-teal-400" />
                    </div>
                    <h2 className="text-lg font-bold text-white">
                      Payment Method
                    </h2>
                    <div className="ml-auto flex items-center gap-1.5 text-white/30 text-xs">
                      <Lock className="w-3 h-3" />
                      Secure
                    </div>
                  </div>

                  {/* Selected gateway pill */}
                  <div className="p-4 rounded-2xl border border-teal-500/40 bg-teal-500/[0.08] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <span className="font-black text-white text-xs tracking-wider">
                          UPI
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Cashfree Payments
                        </p>
                        <p className="text-white/35 text-[11px] uppercase tracking-wider mt-0.5">
                          UPI · Cards · Netbanking · Wallets
                        </p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-[3px] border-teal-400 flex-shrink-0" />
                  </div>

                  {/* Total summary */}
                  <div className="flex items-end justify-between mb-7 px-1">
                    <div>
                      <p className="text-white/40 text-sm">Amount due</p>
                      <p className="text-white/30 text-xs mt-0.5">
                        Billed monthly
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white tabular-nums">
                        ₹{totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayment}
                    disabled={loading || cartItems.length === 0}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 flex items-center justify-center gap-2 group/pay"
                  >
                    <Lock className="w-4 h-4" />
                    Pay ₹{totalPrice.toFixed(2)}
                    <ChevronRight className="w-5 h-5 group-hover/pay:translate-x-0.5 transition-transform" />
                  </button>

                  <p className="text-white/20 text-[11px] text-center mt-4 leading-relaxed px-2">
                    By clicking "Pay" you agree to our{" "}
                    <Link
                      to="/terms"
                      className="underline underline-offset-2 hover:text-white/40 transition-colors"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="underline underline-offset-2 hover:text-white/40 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    . Subscriptions can be cancelled anytime.
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {["VISA", "UPI", "RUPAY"].map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center justify-center p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm"
                  >
                    <span className="text-white/20 font-black text-xs tracking-wider">
                      {brand}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cancel note */}
              <p className="text-white/20 text-xs text-center px-4">
                Cancel or upgrade anytime from your account dashboard. No
                lock-in contracts.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
