import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  ChevronLeft,
  Shield,
  Lock,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  MapPin,
  Building,
  Hash,
} from "lucide-react";
import { spring, fadeUp } from "../lib/animations";
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

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

interface FormErrors {
  [key: string]: string;
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  maxLength,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ElementType;
  maxLength?: number;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={clsx(
            "w-full py-3 rounded-xl bg-white/5 border text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-200",
            Icon ? "pl-10 pr-4" : "px-4",
            error
              ? "border-red-500/50 focus:border-red-500/70 bg-red-500/5"
              : "border-white/10 focus:border-teal-500/50 focus:bg-white/[0.07]",
          )}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  }
  return digits;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const saved = localStorage.getItem("belyx_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Redirect to cart if empty
  useEffect(() => {
    if (!isProcessing && !isSuccess && cartItems.length === 0) {
      const timer = setTimeout(() => navigate("/cart"), 100);
      return () => clearTimeout(timer);
    }
  }, [cartItems, isProcessing, isSuccess, navigate]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price),
    0,
  );
  const discountRaw = localStorage.getItem("belyx_discount");
  const discount = discountRaw ? parseInt(discountRaw, 10) : 0;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  // Group items for summary
  const grouped: { name: string; price: number; qty: number }[] = [];
  for (const item of cartItems) {
    const existing = grouped.find((g) => g.name === item.name);
    if (existing) {
      existing.qty += 1;
    } else {
      grouped.push({ name: item.name, price: parsePrice(item.price), qty: 1 });
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Name
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Address
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    } else if (!/^\d{5,6}$/.test(formData.zip.replace(/\s/g, ""))) {
      newErrors.zip = "Enter a valid ZIP/PIN code";
    }

    // Card
    const rawCard = formData.cardNumber.replace(/\s/g, "");
    if (!rawCard) {
      newErrors.cardNumber = "Card number is required";
    } else if (rawCard.length < 16) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }

    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = "Expiry date is required";
    } else {
      const parts = formData.cardExpiry.replace(/\s/g, "").split("/");
      const month = parseInt(parts[0], 10);
      if (parts.length !== 2 || isNaN(month) || month < 1 || month > 12) {
        newErrors.cardExpiry = "Enter a valid expiry (MM/YY)";
      }
    }

    if (!formData.cardCvc.trim()) {
      newErrors.cardCvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = "Enter a valid 3–4 digit CVC";
    }

    if (!formData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "cardExpiry") formatted = formatExpiry(value);
    if (name === "cardCvc") formatted = value.replace(/\D/g, "").slice(0, 4);
    if (name === "zip") formatted = value.replace(/\D/g, "").slice(0, 6);

    setFormData((prev) => ({ ...prev, [name]: formatted }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors below.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Clear cart
      localStorage.removeItem("belyx_cart");
      localStorage.removeItem("belyx_discount");
    }, 3000);
  };

  // ─── Success Screen ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring.bouncy}
          className="relative max-w-md w-full text-center"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 -z-10 bg-teal-500/10 blur-3xl rounded-full scale-150" />

          <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-12 backdrop-blur-xl overflow-hidden">
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Top shimmer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />

            <div className="relative z-10">
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...spring.bouncy, delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-teal-500/10 border-2 border-teal-500/40 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ ...spring.snappy, delay: 0.4 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-teal-400" />
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white mb-3"
              >
                Order Confirmed!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-white/50 mb-2 leading-relaxed"
              >
                Thank you for your purchase. Your server is being provisioned
                and will be ready within minutes.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-teal-400 text-sm font-semibold mb-10"
              >
                Confirmation sent to {formData.email}
              </motion.p>

              {/* Order total */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="rounded-2xl bg-teal-500/5 border border-teal-500/20 px-6 py-4 mb-8 text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-sm">Total charged</span>
                  <span className="text-2xl font-bold text-teal-400 tabular-nums">
                    ₹{total.toFixed(2)}
                    <span className="text-sm text-white/40 font-normal">
                      /mo
                    </span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="https://gp.belyxhost.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold text-sm transition-all shadow-lg shadow-teal-500/20 text-center"
                >
                  Open Control Panel
                </a>
                <Link
                  to="/"
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm transition-all text-center"
                >
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main Checkout ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0A0A0A]">
      <LoadingVideo isVisible={isProcessing} message="Processing payment..." />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={spring.gentle} className="mb-12">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group w-fit"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Checkout
              </h1>
              <p className="text-white/50 text-lg flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                Secure, encrypted payment
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left: Form ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: 0.05 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-teal-400" />
                  Contact Information
                </h2>
                <InputField
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={Mail}
                  autoComplete="email"
                />
              </motion.div>

              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-400" />
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="First name"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    icon={User}
                    autoComplete="given-name"
                  />
                  <InputField
                    label="Last name"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    autoComplete="family-name"
                  />
                </div>
              </motion.div>

              {/* Billing Address */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: 0.15 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <InputField
                    label="Street address"
                    name="address"
                    placeholder="123 Server Street"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    icon={MapPin}
                    autoComplete="street-address"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <InputField
                        label="City"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                        icon={Building}
                        autoComplete="address-level2"
                      />
                    </div>
                    <InputField
                      label="State"
                      name="state"
                      placeholder="Maharashtra"
                      value={formData.state}
                      onChange={handleChange}
                      error={errors.state}
                      autoComplete="address-level1"
                    />
                    <InputField
                      label="ZIP / PIN"
                      name="zip"
                      placeholder="400001"
                      value={formData.zip}
                      onChange={handleChange}
                      error={errors.zip}
                      icon={Hash}
                      maxLength={6}
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: 0.2 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-teal-400" />
                  Payment Details
                </h2>

                {/* Card number */}
                <div className="space-y-4">
                  <InputField
                    label="Card number"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    error={errors.cardNumber}
                    icon={CreditCard}
                    maxLength={19}
                    autoComplete="cc-number"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expiry date"
                      name="cardExpiry"
                      placeholder="MM / YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      error={errors.cardExpiry}
                      maxLength={7}
                      autoComplete="cc-exp"
                    />
                    <InputField
                      label="CVC / CVV"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      error={errors.cardCvc}
                      maxLength={4}
                      autoComplete="cc-csc"
                    />
                  </div>

                  <InputField
                    label="Name on card"
                    name="cardName"
                    placeholder="JOHN DOE"
                    value={formData.cardName}
                    onChange={handleChange}
                    error={errors.cardName}
                    icon={User}
                    autoComplete="cc-name"
                  />
                </div>

                {/* Secure badge */}
                <div className="mt-5 flex items-center gap-2 text-white/30 text-xs">
                  <Shield className="w-3.5 h-3.5 text-teal-500/60" />
                  Your payment info is encrypted and never stored on our
                  servers.
                </div>
              </motion.div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring.gentle, delay: 0.15 }}
                className="sticky top-28 space-y-4"
              >
                {/* Summary card */}
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden">
                  {/* Dot grid */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {/* Top shimmer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Order Summary
                    </h3>

                    {/* Line items */}
                    <div className="space-y-3 mb-5 pb-5 border-b border-white/[0.08]">
                      {grouped.map((item) => (
                        <div
                          key={item.name}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-white/50 truncate pr-2">
                            {item.name}
                            {item.qty > 1 && (
                              <span className="text-white/30 ml-1">
                                ×{item.qty}
                              </span>
                            )}
                          </span>
                          <span className="text-white/70 font-medium tabular-nums flex-shrink-0">
                            ₹{(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2.5 mb-5 pb-5 border-b border-white/[0.08]">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Subtotal</span>
                        <span className="text-white/70 tabular-nums">
                          ₹{subtotal.toFixed(2)}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-teal-400">
                            Discount ({discount}%)
                          </span>
                          <span className="text-teal-400 font-semibold tabular-nums">
                            −₹{discountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Tax</span>
                        <span className="text-white/40">₹0.00</span>
                      </div>
                    </div>

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

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={spring.fast}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold text-base transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 flex items-center justify-center gap-2 group/btn"
                    >
                      <Lock className="w-4 h-4" />
                      Pay ₹{total.toFixed(2)}
                    </motion.button>

                    <p className="text-white/20 text-[11px] text-center mt-3">
                      By completing your purchase you agree to our{" "}
                      <Link
                        to="/tos"
                        className="underline underline-offset-2 hover:text-white/40 transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: Shield,
                        label: "SSL Secured",
                        sub: "256-bit encryption",
                      },
                      {
                        icon: Lock,
                        label: "PCI Compliant",
                        sub: "Bank-level security",
                      },
                    ].map(({ icon: Icon, label, sub }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs font-semibold leading-tight">
                            {label}
                          </p>
                          <p className="text-white/25 text-[10px]">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
