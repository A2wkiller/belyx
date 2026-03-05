import { createBrowserRouter } from "react-router";
import { Layout } from "./components/ui/Layout";
import Home from "./pages/Home";
import Dedicated from "./pages/Dedicated";
import GameHosting from "./pages/GameHosting";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Shared from "./pages/Shared";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "dedicated", Component: Dedicated },
      { path: "games", Component: GameHosting },
      { path: "games/:gameId", Component: GameHosting },
      { path: "shared", Component: Shared },
      { path: "checkout", Component: Checkout },
      { path: "cart", Component: Cart },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "tos", Component: TermsOfService },
      { path: "*", Component: Home }, // Fallback to Home
    ],
  },
]);