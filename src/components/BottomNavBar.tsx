"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ),
      label: "Home",
    },
    {
      href: "/workout",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      label: "Workout",
    },
    {
      href: "/meal",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      label: "Meal",
    },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div
        className="liquid-glass-card rounded-4xl border border-[var(--color-2)]/30 shadow-2xl"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
        }}
      >
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isActive ? "flex-1" : "flex-none"
                }`}
              >
                {/* Active Pill Background */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full mx-1 transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  />
                )}

                {/* Content */}
                <div
                  className={`relative flex items-center gap-2 px-4 py-2.5 transition-all duration-300 ${
                    isActive ? "flex-row" : "flex-col"
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 flex-shrink-0 ${
                      isActive
                        ? "text-[var(--color-10)]"
                        : "text-[var(--color-8)]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isActive && (
                    <span className="text-sm font-semibold text-[var(--color-10)] whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
