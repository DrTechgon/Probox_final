"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Career", href: "#" },
];

const TOP_NAV = "border-transparent bg-transparent backdrop-blur-none shadow-none py-5";
const SCROLLED_NAV = "border-white/30 bg-slate-950/10 backdrop-blur-2xl shadow-[0_20px_52px_rgba(15,23,42,0.10)] py-3";
const TOP_SHELL = "border-transparent bg-transparent shadow-none";
const SCROLLED_SHELL = "border-white/55 bg-white/55 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,23,42,0.06)]";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const shellRef = useRef(null);
  const accentRef = useRef(null);
  const pillRef = useRef(null);
  const lastScrollY = useRef(0);
  const isVisible = useRef(true);

  const toggleVisibility = useCallback((el, show) => {
    if (isVisible.current === show) return;
    isVisible.current = show;
    el.classList.toggle("translate-y-0", show);
    el.classList.toggle("opacity-100", show);
    el.classList.toggle("-translate-y-full", !show);
    el.classList.toggle("opacity-0", !show);
  }, []);

  /* ── Scroll: state + visibility ── */
  const syncNav = useCallback(() => {
    const y = window.scrollY;
    const header = headerRef.current;
    const nav = navRef.current;
    const shell = shellRef.current;
    const accent = accentRef.current;
    if (!header || !nav || !shell || !accent) return;

    const isScrolled = y > 16;

    // Swap nav classes
    TOP_NAV.split(" ").forEach((c) => nav.classList.toggle(c, !isScrolled));
    SCROLLED_NAV.split(" ").forEach((c) => nav.classList.toggle(c, isScrolled));
    TOP_SHELL.split(" ").forEach((c) => shell.classList.toggle(c, !isScrolled));
    SCROLLED_SHELL.split(" ").forEach((c) => shell.classList.toggle(c, isScrolled));
    accent.classList.toggle("opacity-100", isScrolled);
    accent.classList.toggle("opacity-0", !isScrolled);

    // Show / hide
    if (y <= 24 || y <= 200) {
      toggleVisibility(header, true);
    } else if (y > lastScrollY.current + 50) {
      toggleVisibility(header, false);
    } else if (y < lastScrollY.current - 30) {
      toggleVisibility(header, true);
    }
    lastScrollY.current = y;
  }, [toggleVisibility]);

  useEffect(() => {
    window.addEventListener("scroll", syncNav, { passive: true });
    syncNav();
    return () => window.removeEventListener("scroll", syncNav);
  }, [syncNav]);

  /* ── Sliding pill hover ── */
  const handleLinkHover = (e) => {
    const pill = pillRef.current;
    const shell = shellRef.current;
    if (!pill || !shell) return;
    const lr = e.currentTarget.getBoundingClientRect();
    const sr = shell.getBoundingClientRect();
    pill.style.width = `${lr.width}px`;
    pill.style.transform = `translateX(${lr.left - sr.left}px)`;
    pill.style.opacity = "1";
  };

  const handleShellLeave = () => {
    if (pillRef.current) pillRef.current.style.opacity = "0";
  };

  /* ── Mobile menu ── */
  const toggleMobile = () => setMobileOpen((o) => !o);

  useEffect(() => {
    const close = (e) => {
      if (mobileOpen && !e.target.closest("nav")) setMobileOpen(false);
    };
    const esc = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", esc);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 translate-y-0 opacity-100 transition-all duration-500 ease-in-out will-change-transform"
    >
      <nav
        ref={navRef}
        className="relative w-full border-b border-transparent bg-transparent px-4 py-5 backdrop-blur-none transition-all duration-300 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 transition duration-300 hover:opacity-95">
            <Image
              src="/brand/probox-logo-wordmark-transparent.png"
              alt="Probox"
              width={272}
              height={56}
              className="h-12 w-auto max-w-[272px] object-contain sm:h-14"
              priority
            />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-slate-900 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            onClick={toggleMobile}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-2 md:flex">
            <div
              ref={shellRef}
              className="relative flex items-center gap-1 rounded-full border border-transparent bg-transparent px-1.5 py-1.5 transition-all duration-300"
              onMouseLeave={handleShellLeave}
            >
              <div
                ref={pillRef}
                className="pointer-events-none absolute left-0 top-1.5 h-[calc(100%-12px)] rounded-full bg-white/80 opacity-0 transition-all duration-300 ease-out will-change-[width,transform]"
              />
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`desktop-link relative z-10 inline-flex items-center rounded-full px-4 py-2.5 text-[0.95rem] font-semibold tracking-[-0.01em] transition duration-300 hover:-translate-y-0.5 ${
                    i === 0
                      ? "text-slate-950"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                  onMouseEnter={handleLinkHover}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="#"
              className="group inline-flex items-center gap-3 rounded-full border border-[#d79a5d] bg-[#c98545] px-3 py-2.5 pl-5 text-sm font-semibold text-[#0f2145] shadow-[0_16px_30px_rgba(201,133,69,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#b87435]"
            >
              <span>Let&apos;s Connect</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mt-3 rounded-[1.75rem] border border-white/50 bg-white/78 p-2 shadow-xl backdrop-blur-2xl md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition duration-300 hover:bg-white ${
                    i === 0
                      ? "text-slate-950"
                      : "text-slate-700 hover:text-slate-950"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              ))}
              <Link
                href="#"
                className="group mt-2 inline-flex items-center justify-center gap-3 rounded-2xl border border-[#d79a5d] bg-[#c98545] px-5 py-3 text-sm font-semibold text-[#0f2145] shadow-[0_14px_24px_rgba(201,133,69,0.22)] transition duration-300 hover:bg-[#b87435]"
                onClick={() => setMobileOpen(false)}
              >
                <span>Let&apos;s Connect</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* Accent line */}
        <div
          ref={accentRef}
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/80 to-amber-400/80 opacity-0 transition-opacity duration-300"
        />
      </nav>
    </header>
  );
}
