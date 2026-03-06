import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Layout } from "./components/ui/Layout";

// Lazy-load every page so Vite can split them into separate chunks.
// This keeps the initial bundle small and only loads what the user actually visits.
const Home         = lazy(() => import("./pages/Home"));
const GameHosting  = lazy(() => import("./pages/GameHosting"));
const Cart         = lazy(() => import("./pages/Cart"));
const Checkout     = lazy(() => import("./pages/Checkout"));
const Dedicated    = lazy(() => import("./pages/Dedicated"));
const Shared       = lazy(() => import("./pages/Shared"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

// Minimal inline fallback – rendered while a lazy chunk is being fetched.
// Keeps the dark background consistent so there's no white flash.
function PageFallback() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-teal-500/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-400 animate-spin" />
        </div>
        <p className="text-white/30 text-sm font-medium tracking-wider uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}

/**
 * Wrap a lazy component in Suspense so each route gets its own boundary.
 * This lets pages show their own fallback independently.
 */
function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true,              element: withSuspense(Home)          },
      { path: "games",            element: withSuspense(GameHosting)   },
      { path: "games/:gameId",    element: withSuspense(GameHosting)   },
      { path: "dedicated",        element: withSuspense(Dedicated)     },
      { path: "shared",           element: withSuspense(Shared)        },
      { path: "cart",             element: withSuspense(Cart)          },
      { path: "checkout",         element: withSuspense(Checkout)      },
      { path: "privacy",          element: withSuspense(PrivacyPolicy) },
      { path: "tos",              element: withSuspense(TermsOfService)},
      { path: "*",                element: withSuspense(Home)          },
    ],
  },
]);
