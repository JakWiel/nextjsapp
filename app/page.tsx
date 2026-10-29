"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  Menu,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read localStorage ONLY after mounting on the client to avoid SSR mismatch
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
    setMounted(true);
  }, []);

  // Handle header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("theme", nextMode ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        mounted && isDarkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* 1. HEADER / NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? mounted && isDarkMode
              ? "bg-slate-900/80 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800"
              : "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                NexusFlow
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
              <a
                href="#features"
                className={`transition-colors hover:text-indigo-500 ${mounted && isDarkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Features
              </a>
              <a
                href="#solutions"
                className={`transition-colors hover:text-indigo-500 ${mounted && isDarkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Solutions
              </a>
              <a
                href="#stats"
                className={`transition-colors hover:text-indigo-500 ${mounted && isDarkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Metrics
              </a>
              <a
                href="#pricing"
                className={`transition-colors hover:text-indigo-500 ${mounted && isDarkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                Pricing
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl border transition-all duration-200 ${
                  mounted && isDarkMode
                    ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/70"
                }`}
                aria-label="Toggle theme"
              >
                {mounted && isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Login Button */}
              <Link
                href="/login"
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center ${
                  mounted && isDarkMode
                    ? "text-slate-200 hover:text-white hover:bg-slate-800"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Sign In
              </Link>

              {/* Get Started / Action Button */}
              <button className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98]">
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg border ${
                  mounted && isDarkMode
                    ? "bg-slate-900 border-slate-800 text-amber-400"
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                {mounted && isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg border ${
                  mounted && isDarkMode
                    ? "bg-slate-900 border-slate-800 text-slate-200"
                    : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-4 pt-2 pb-6 space-y-3 ${
              mounted && isDarkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              Solutions
            </a>
            <a
              href="#stats"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              Metrics
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-2">
              <Link
                href="/login"
                className="w-full py-2.5 text-center font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                Sign In
              </Link>
              <button className="w-full py-2.5 text-center font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md">
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24">
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>Next Generation Workflow Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
                Automate your work.{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Scale your growth.
                </span>
              </h1>

              <p
                className={`text-lg sm:text-xl leading-relaxed mb-10 ${mounted && isDarkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Empower your team with automated real-time analytics, continuous
                integration, and seamless deployment tools engineered for modern
                tech stack.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  className={`w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl border transition-all duration-200 flex items-center justify-center space-x-2 ${
                    mounted && isDarkMode
                      ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <span>Book Live Demo</span>
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />{" "}
                  No credit card required
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />{" "}
                  14-day free trial
                </span>
              </div>
            </div>

            <div className="mt-16 relative mx-auto max-w-5xl">
              <div
                className={`p-2 rounded-2xl border shadow-2xl backdrop-blur-xl ${
                  mounted && isDarkMode
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white/60 border-slate-200/80"
                }`}
              >
                <div
                  className={`rounded-xl overflow-hidden border ${mounted && isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-100 bg-slate-900"}`}
                >
                  <div className="h-10 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      app.nexusflow.io/dashboard
                    </div>
                    <div className="w-12"></div>
                  </div>

                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-100">
                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-400">
                          Total Revenue
                        </span>
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-bold">$128,430.00</div>
                      <div className="text-xs text-emerald-400 mt-2 font-medium">
                        +18.2% from last month
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-400">
                          Active Users
                        </span>
                        <Users className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="text-2xl font-bold">24,521</div>
                      <div className="text-xs text-indigo-400 mt-2 font-medium">
                        +12.5% new registrations
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-400">
                          System Performance
                        </span>
                        <Zap className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-bold">99.98%</div>
                      <div className="text-xs text-emerald-400 mt-2 font-medium">
                        Optimal response speed
                      </div>
                    </div>

                    <div className="md:col-span-3 p-6 rounded-xl bg-slate-800/30 border border-slate-700/40">
                      <div className="h-32 w-full flex items-end gap-2 pt-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 100, 85].map(
                          (val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-sm"
                              style={{ height: `${val}%` }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LOGOS / TRUSTED BY */}
        <section
          className={`py-12 border-y ${mounted && isDarkMode ? "border-slate-800 bg-slate-900/30" : "border-slate-200/60 bg-slate-100/50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-8">
              Trusted by innovative teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="font-bold text-xl tracking-tight text-slate-600 dark:text-slate-300">
                ACME Corp
              </span>
              <span className="font-bold text-xl tracking-tight text-slate-600 dark:text-slate-300">
                GlobalTech
              </span>
              <span className="font-bold text-xl tracking-tight text-slate-600 dark:text-slate-300">
                Nebula Cloud
              </span>
              <span className="font-bold text-xl tracking-tight text-slate-600 dark:text-slate-300">
                Apex Media
              </span>
              <span className="font-bold text-xl tracking-tight text-slate-600 dark:text-slate-300">
                Vortex AI
              </span>
            </div>
          </div>
        </section>

        {/* 4. FEATURES GRID */}
        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-2">
                Capabilities
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Everything you need to deliver faster
              </p>
              <p
                className={`text-base sm:text-lg ${mounted && isDarkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Designed from the ground up to improve workflow efficiency,
                automate mundane tasks, and give your team deep insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  mounted && isDarkMode
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Automation</h3>
                <p
                  className={`text-sm leading-relaxed ${mounted && isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Trigger complex workflows with minimal configuration using our
                  intuitve event-driven automation pipeline.
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  mounted && isDarkMode
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
                <p
                  className={`text-sm leading-relaxed ${mounted && isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Bank-grade encryption, SOC-2 compliance, and role-based access
                  control to keep data strictly secure.
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  mounted && isDarkMode
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Edge Network</h3>
                <p
                  className={`text-sm leading-relaxed ${mounted && isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Deploy services seamlessly across 35+ global edge locations
                  for ultra-low latency around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. STATS SECTION */}
        <section
          id="stats"
          className={`py-20 border-y ${mounted && isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-indigo-900 text-white border-transparent"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 text-indigo-400">
                  99.9%
                </div>
                <div
                  className={`text-sm font-medium ${mounted && isDarkMode ? "text-slate-400" : "text-indigo-200"}`}
                >
                  Uptime SLA
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 text-indigo-400">
                  10M+
                </div>
                <div
                  className={`text-sm font-medium ${mounted && isDarkMode ? "text-slate-400" : "text-indigo-200"}`}
                >
                  Requests / Day
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 text-indigo-400">
                  150+
                </div>
                <div
                  className={`text-sm font-medium ${mounted && isDarkMode ? "text-slate-400" : "text-indigo-200"}`}
                >
                  Countries Supported
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 text-indigo-400">
                  4.9/5
                </div>
                <div
                  className={`text-sm font-medium ${mounted && isDarkMode ? "text-slate-400" : "text-indigo-200"}`}
                >
                  Customer Rating
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA SECTION */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-10 sm:p-16 text-center text-white shadow-2xl">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                  Ready to transform your development workflow?
                </h2>
                <p className="text-indigo-100 text-base sm:text-lg mb-8">
                  Join thousands of developers and teams who trust NexusFlow for
                  their modern architecture.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-900 bg-white rounded-xl hover:bg-slate-100 shadow-lg transition-all duration-200 active:scale-[0.98]">
                    Get Started Free
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200">
                    Talk to Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer
        className={`border-t pt-16 pb-12 ${mounted && isDarkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  NexusFlow
                </span>
              </div>
              <p className="text-sm max-w-sm mb-6">
                Next-generation workflow and infrastructure platform designed to
                scale high-performing software teams.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Enterprise
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs">
            <p>© Jakub Wielosik. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-indigo-500">
                Twitter
              </a>
              <a href="#" className="hover:text-indigo-500">
                GitHub
              </a>
              <a href="#" className="hover:text-indigo-500">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
