"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navLinks = [
  { label: "About", shortLabel: "About", href: "/about" },
  { label: "Vaults", shortLabel: "Vaults", href: "/vaults" },
  { label: "Perps", shortLabel: "Perps", href: "/perp" },
  {
    label: "Compliance & Risk Disclosure",
    shortLabel: "Compliance",
    href: "/compliance-risk-disclosure",
  },
  { label: "FAQ", shortLabel: "FAQ", href: "/faq" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-gradient-primary">
            IndiceX
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-primary bg-muted font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.shortLabel}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openConnectModal,
                openChainModal,
                mounted,
              }) => {
                const connected = mounted && account && chain;
                return (
                  <button
                    onClick={connected ? openChainModal : openConnectModal}
                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {connected
                      ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                      : "Connect Wallet"}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <div className="h-14" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-card flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold text-gradient-primary"
              >
                IndiceX
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col px-4 py-6 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-muted font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="px-6 pb-8 mt-auto">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openConnectModal,
                  openChainModal,
                  mounted,
                }) => {
                  const connected = mounted && account && chain;
                  return (
                    <button
                      onClick={connected ? openChainModal : openConnectModal}
                      className="w-full bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-full text-center hover:opacity-90 transition-opacity"
                    >
                      {connected
                        ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                        : "Connect Wallet"}
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
