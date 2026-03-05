import { motion } from "motion/react";
import { ShoppingCart, Trash2, ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { assets } from "../assets";
import { fadeUp, spring } from "../lib/animations";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/moving-border";

interface CartItem {
  id: string;
  name: string;
  price: string;
  gameId: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("belyx_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("belyx_cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return acc + (isNaN(priceValue) ? 0 : priceValue);
  }, 0);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <Link to="/games" className="text-white/40 hover:text-white flex items-center gap-2 mb-8 transition-colors group w-fit">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Games
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Cart</h1>
          <p className="text-white/60">Review your selected game server plans.</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            {...fadeUp}
            className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-400">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/60 mb-8 max-w-sm mx-auto">
              Looks like you haven't added any game servers to your cart yet.
            </p>
            <Button
              as={Link}
              to="/games"
              duration={2000}
              className="bg-teal-500 hover:bg-teal-400 text-black font-bold flex items-center gap-2 justify-center"
              containerClassName="h-12 w-fit px-8"
              borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
            >
              Browse Games
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-teal-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{item.name}</h3>
                      <p className="text-white/40 text-sm capitalize">{item.gameId} Server</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-bold">{item.price}</p>
                      <p className="text-white/30 text-xs">/month</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/20 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                {...fadeUp}
                className="bg-white/5 border border-teal-500/20 p-8 rounded-3xl sticky top-32"
              >
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Tax (0%)</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-white">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-teal-400">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  as={Link}
                  to="/checkout"
                  duration={2000}
                  className="bg-teal-500 hover:bg-teal-400 text-black font-bold flex items-center justify-center gap-2 w-full"
                  containerClassName="w-full h-14"
                  borderClassName="bg-[radial-gradient(var(--color-teal-500)_40%,transparent_60%)]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-[10px] text-white/30 mt-6 text-center">
                  Instant setup after payment. No hidden fees.
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
