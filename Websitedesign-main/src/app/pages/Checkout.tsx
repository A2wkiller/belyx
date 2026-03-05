import { motion } from "motion/react";
import { Shield, CreditCard, ChevronRight, Check, Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { spring, fadeUp } from "../lib/animations";
import { toast } from "sonner";
import { Button } from "../components/ui/moving-border";

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

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return acc + (isNaN(priceValue) ? 0 : priceValue);
  }, 0);

  const handlePayment = () => {
    setLoading(true);
    // This is where you'd call your backend to create the Cashfree order
    // and then use the startPayment helper.
    setTimeout(() => {
      setLoading(false);
      toast.success("Redirecting to Cashfree Secure Gateway...");
      // In production, replace with actual Cashfree integration:
      // window.location.href = cashfreePaymentUrl;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={spring.gentle}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Review Order</h1>
              <p className="text-white/50">You're one step away from launching your high-performance server.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-start pb-4 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{item.name}</h3>
                      <p className="text-white/40 text-xs capitalize">{item.gameId} Server{item.tier ? ` · ${item.tier}` : ""}</p>
                      {item.ram && (
                        <p className="text-white/30 text-[10px] mt-1">
                          {item.ram} · {item.cpu} · {item.storage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{item.price}</p>
                    <p className="text-white/30 text-xs">/month</p>
                  </div>
                </div>
              ))}

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Tax (0%)</span>
                  <span>₹0.00</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-white">
                  <span className="font-bold text-lg">Total due today</span>
                  <span className="font-bold text-lg text-teal-400">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {["Instant Provisioning", "Enterprise DDoS Protection", "24/7 Premium Support"].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-teal-500" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20">
              <Shield className="w-6 h-6 text-teal-400 shrink-0" />
              <p className="text-xs text-white/60">
                Your payment is secure. We use enterprise-grade encryption to protect your data.
              </p>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...spring.gentle, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-teal-400" />
                Payment Method
              </h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl border border-teal-500 bg-teal-500/10 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                      UPI
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Cashfree Payments</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">UPI, Cards, Netbanking</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-teal-500" />
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                duration={2000}
                className="bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
                containerClassName="w-full h-16"
                borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Pay ₹{totalPrice.toFixed(2)}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-white/30 text-[10px] mt-6 leading-relaxed">
                By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
                Subscriptions can be cancelled at any time from your account settings.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 opacity-30 grayscale">
              <div className="flex items-center justify-center p-4 border border-white/10 rounded-xl">
                <span className="font-bold text-xs">VISA</span>
              </div>
              <div className="flex items-center justify-center p-4 border border-white/10 rounded-xl">
                <span className="font-bold text-xs">UPI</span>
              </div>
              <div className="flex items-center justify-center p-4 border border-white/10 rounded-xl">
                <span className="font-bold text-xs">RUPAY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
