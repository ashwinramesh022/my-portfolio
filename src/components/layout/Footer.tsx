"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig, footerLinks } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border-subtle)] mt-auto relative overflow-hidden">
      {/* Subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.005))",
        }}
      />

      <div className="container-narrow py-16 md:py-20 relative">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand */}
          <motion.div className="md:col-span-5" variants={itemVariants}>
            <Link
              href="/"
              className="inline-block text-overline tracking-wider text-[var(--color-text-primary)] hover:text-[var(--color-highlight)] transition-colors duration-200 mb-4"
            >
              ARK
            </Link>
            <p className="text-body-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
              Software engineer crafting meaningful products with modern technologies. 
              Always learning, always building.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <h4 className="text-caption text-[var(--color-text-subtle)] uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/chapters", label: "Chapters" },
                { href: "/journal", label: "Journal" },
                { href: "/about", label: "About" },
                { href: "/resume", label: "Resume" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            <h4 className="text-caption text-[var(--color-text-subtle)] uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="group inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  Email
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div 
          className="mt-16 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-caption text-[var(--color-text-subtle)]">
            © {currentYear} {siteConfig.author.name}
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.site.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-caption text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute bottom-16 right-6 w-10 h-10 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-border)] transition-all duration-200"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
