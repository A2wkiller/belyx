import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ChevronLeft,
  Plus,
  Minus,
  Tag,
  Shield,
  Zap,
  Headset,
  Info,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { fadeUp, spring } from "../lib/animations";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import LoadingVideo from "../components/LoadingVideo";

interface CartItem {
  id: string;
  name: string;
  price: string;
  gameId: string;
  ram?: string;
  cpu?: string;
  storage?: string;
  tier?: string;
}

interface GroupedCartItem {
  key: string;
  name: string;
  price: string;
  gameId: string;
  ram?: string;
  cpu?: string;
  storage?: string;
  tier?: string;
  ids: string[];
  quantity: number;
}

const COUPON_CODES: Record<string, number> = {
  WELCOME10: 10,
  BELYX20: 20,
  SAVE15: 15,
};

function groupCartItems(items: CartItem[]): GroupedCartItem[] {
  const map = new Map<string, GroupedCartItem>();
  for (const item of items) {
    const key = `${item.gameId}::${item.name}::${item.price}`;
    if (map.has(key)) {
      const existing = map.get(key)!;
      existing.ids.push(item.id);
      existing.quantity += 1;
    } else {
      map.set(key, {
        key,
        name: item.name,
        price: item.price,
        gameId: item.gameId,
        ram: item.ram,
        cpu: item.cpu,
        storage: item.storage,
        tier: item.tier,
        ids: [item.id],
        quantity: 1,
      });
    }
  }
  return Array.from(map.values());
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("belyx_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("belyx_cart", JSON.stringify(items));
  };

  const removeGroup = (groupKey: string) => {
    const groups = groupCartItems(cartItems);
    const group = groups.find((g) => g.key === groupKey);
    if (!group) return;
    const updatedCart = cartItems.filter(
      (item) => !group.ids.includes(item.id),
    );
    saveCart(updatedCart);
    toast.success(`Removed "${group.name}" from cart`);
  };

  const decreaseQuantity = (groupKey: string) => {
    const groups = groupCartItems(cartItems);
    const group = groups.find((g) => g.key === groupKey);
    if (!group) return;
    if (group.quantity === 1) {
      removeGroup(groupKey);
      return;
    }
    // Remove only the last id from the group
    const lastId = group.ids[group.ids.length - 1];
    const updatedCart = cartItems.filter((item) => item.id !== lastId);
    saveCart(updatedCart);
  };

  const increaseQuantity = (groupKey: string) => {
    const groups = groupCartItems(cartItems);
    const group = groups.find((g) => g.key === groupKey);
    if (!group) return;
    const template = cartItems.find((item) => item.id === group.ids[0]);
    if (!template) return;
    const newItem: CartItem = { ...template, id: crypto.randomUUID() };
    saveCart([...cartItems, newItem]);
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPON_CODES[code] !== undefined) {
      setAppliedCoupon(code);
      setDiscount(COUPON_CODES[code]);
      setCouponError("");
      toast.success(`Coupon "${code}" applied — ${COUPON_CODES[code]}% off!`);
    } else {
      setCouponError("Invalid coupon code.");
      toast.error("Invalid coupon code.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponInput("");
    setCouponError("");
    toast.info("Coupon removed.");
  };

  const grouped = groupCartItems(cartItems);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price),
    0,
  );
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  const handleCheckout = () => {
    if (grouped.length === 0) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout");
    }, 2200);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0A0A0A]">
      <LoadingVideo isVisible={isLoading} message="Preparing your order..." />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={spring.gentle} className="mb-14">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group w-fit"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Games
          </Link>

          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Your Cart
              </h1>
              <p className="text-white/50 text-lg">
                {grouped.length === 0
                  ? "No items yet"
                  : `${cartItems.length} server plan${cartItems.length !== 1 ? "s" : ""} selected`}
              </p>
            </div>

            {grouped.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-1 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold"
              >
                {grouped.length} item{grouped.length !== 1 ? "s" : ""}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Empty State */}
        {grouped.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring.gentle}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-16 text-center overflow-hidden"
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10">
              <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <ShoppingCart className="w-14 h-14 text-teal-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Your cart is empty
              </h2>
              <p className="text-white/50 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
                Browse our game servers and add a plan to get started.
              </p>
              <Link
                to="/games"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold hover:from-teal-500 hover:to-teal-400 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 group"
              >
                Browse Servers
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Cart Items ── */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {grouped.map((group, index) => {
                  const lineTotal = parsePrice(group.price) * group.quantity;
                  return (
                    <motion.div
                      key={group.key}
                      layout
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24, height: 0 }}
                      transition={{ delay: index * 0.05, ...spring.gentle }}
                      className="relative group/card rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6 hover:border-teal-500/30 transition-all duration-300 overflow-hidden"
                    >
                      {/* Hover shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                      </div>

                      <div className="relative z-10 flex items-center gap-5 flex-wrap sm:flex-nowrap">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                          <Package className="w-7 h-7 text-teal-400" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-lg leading-tight truncate">
                            {group.name}
                          </h3>
                          <p className="text-white/40 text-sm capitalize mt-0.5">
                            {group.gameId} Server
                            {group.tier ? ` · ${group.tier}` : ""}
                          </p>
                          {group.ram && (
                            <p className="text-white/30 text-xs mt-1">
                              {group.ram} · {group.cpu} · {group.storage}
                            </p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(group.key)}
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-teal-500/20 hover:border-teal-500/30 transition-all flex items-center justify-center"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-white font-bold min-w-[2rem] text-center tabular-nums">
                            {group.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(group.key)}
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-teal-500/20 hover:border-teal-500/30 transition-all flex items-center justify-center"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-bold text-teal-400 tabular-nums">
                            ₹{lineTotal.toFixed(2)}
                          </p>
                          {group.quantity > 1 && (
                            <p className="text-white/30 text-xs mt-0.5">
                              {group.price} each
                            </p>
                          )}
                          <p className="text-white/30 text-xs">/month</p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeGroup(group.key)}
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400/70 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all flex items-center justify-center flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Coupon Code */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: grouped.length * 0.05 + 0.1,
                  ...spring.gentle,
                }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6"
              >
                <h4 className="text-white/70 font-semibold text-sm mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-teal-400" />
                  Coupon Code
                </h4>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-teal-300 font-bold tracking-wider text-sm">
                        {appliedCoupon}
                      </span>
                      <span className="text-teal-400/70 text-sm">
                        — {discount}% off applied
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-white/30 hover:text-red-400 transition-colors text-xs underline underline-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError("");
                          }}
                          onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                          placeholder="ENTER CODE"
                          className={clsx(
                            "w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/20 text-sm focus:outline-none transition-colors tracking-widest font-medium",
                            couponError
                              ? "border-red-500/50 focus:border-red-500/70"
                              : "border-white/10 focus:border-teal-500/50",
                          )}
                        />
                      </div>
                      <button
                        onClick={applyCoupon}
                        className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError ? (
                      <p className="text-red-400 text-xs flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        {couponError}
                      </p>
                    ) : (
                      <p className="text-white/20 text-xs flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        Try WELCOME10 for 10% off your first order
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* ── Order Summary Sidebar ── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, ...spring.gentle }}
                className="sticky top-28 space-y-4"
              >
                {/* Summary Card */}
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden">
                  {/* Dot-grid background */}
                  <div
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {/* Top teal glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Order Summary
                    </h3>

                    {/* Line items */}
                    <div className="space-y-3 mb-5 pb-5 border-b border-white/[0.08]">
                      {grouped.map((group) => (
                        <div
                          key={group.key}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-white/50 truncate pr-2">
                            {group.name}
                            {group.quantity > 1 && (
                              <span className="text-white/30 ml-1">
                                ×{group.quantity}
                              </span>
                            )}
                          </span>
                          <span className="text-white/70 font-medium tabular-nums flex-shrink-0">
                            ₹
                            {(parsePrice(group.price) * group.quantity).toFixed(
                              2,
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal & discount */}
                    <div className="space-y-2.5 mb-5 pb-5 border-b border-white/[0.08]">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Subtotal</span>
                        <span className="text-white/70 tabular-nums">
                          ₹{subtotal.toFixed(2)}
                        </span>
                      </div>

                      {discount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-teal-400">
                            Discount ({discount}%)
                          </span>
                          <span className="text-teal-400 font-semibold tabular-nums">
                            −₹{discountAmount.toFixed(2)}
                          </span>
                        </motion.div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Tax</span>
                        <span className="text-white/40">₹0.00</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-end justify-between mb-7">
                      <span className="text-white/60 font-medium">
                        Total due
                      </span>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white tabular-nums">
                          ₹{total.toFixed(2)}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5">
                          per month
                        </p>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold text-base transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 flex items-center justify-center gap-2 group/btn"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-white/20 text-[11px] text-center mt-3">
                      Instant setup · No hidden fees · Cancel anytime
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-5">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { icon: Shield, label: "Secure Pay" },
                      { icon: Zap, label: "Instant Setup" },
                      { icon: Headset, label: "24/7 Support" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-9 h-9 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-teal-400" />
                        </div>
                        <p className="text-white/40 text-[11px] font-medium leading-tight">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
