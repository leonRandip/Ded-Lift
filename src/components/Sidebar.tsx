"use client";

import Link from "next/link";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      {onClose && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[var(--color-10)]/20 backdrop-blur-sm z-40"
        />
      )}
      <aside className="fixed right-0 top-0 h-full w-80 z-50 flex flex-col">
      {/* Main Sidebar Panel */}
      <div className="flex-1 liquid-glass-card rounded-l-3xl m-2 mr-0 p-6 flex flex-col shadow-xl bg-gradient-to-br from-[var(--color-9)]/80 to-[var(--color-10)]/90 backdrop-blur-xl relative">
        {/* Collapse Button - Extends out on the left edge */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 -left-12 w-10 h-10 rounded-full bg-[var(--color-8)]/40 hover:bg-[var(--color-8)]/60 flex items-center justify-center transition-all duration-300 shadow-lg liquid-glass-card"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        )}

        {/* User Card - Larger with more information */}
        <div className="liquid-glass-card rounded-2xl p-5 mb-4 bg-gradient-to-br from-[var(--color-8)]/40 to-[var(--color-7)]/30 backdrop-blur-md">
          <div className="flex items-start space-x-4">
            {/* Profile Picture/Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-5)] to-[var(--color-7)] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">
                Design Awesome
              </h3>
              <p className="text-sm text-[var(--color-2)] truncate mt-1">
                design.awesome@gmail.com
              </p>
              {/* Additional Stats */}
              <div className="mt-3 flex items-center space-x-4">
                <div>
                  <p className="text-xs text-[var(--color-2)]">Workouts</p>
                  <p className="text-base font-semibold text-white">24</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-2)]">Meals</p>
                  <p className="text-base font-semibold text-white">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Account Button */}
        <button className="w-full liquid-glass-card rounded-xl p-4 mb-4 bg-gradient-to-r from-[var(--color-7)]/50 to-[var(--color-6)]/50 hover:from-[var(--color-7)]/70 hover:to-[var(--color-6)]/70 transition-all duration-300 flex items-center justify-center space-x-2">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="text-white font-semibold">Manage Account</span>
        </button>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col space-y-2">
          {/* Workout */}
          <Link
            href="/workout"
            onClick={() => onClose?.()}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[var(--color-8)]/30 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-5)] to-[var(--color-7)] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span className="text-white font-medium">Workout</span>
          </Link>

          {/* Meal */}
          <Link
            href="/meal"
            onClick={() => onClose?.()}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[var(--color-8)]/30 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-5)] to-[var(--color-7)] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <span className="text-white font-medium">Meal</span>
          </Link>

          {/* Wilks Test - Disabled */}
          <div
            className="flex items-center justify-between p-3 rounded-xl opacity-50 cursor-not-allowed"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-5)] to-[var(--color-7)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <span className="text-white font-medium">Wilks Test</span>
            </div>
            {/* Lock Icon */}
            <svg
              className="w-4 h-4 text-white/60 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
        </nav>

        {/* Logout Button - Red at the bottom */}
        <button className="w-full rounded-xl p-4 mt-auto bg-red-500 hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span className="text-white font-semibold">Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}

