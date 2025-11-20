"use client";

import Image from "next/image";
import Link from "next/link";

export default function MuscleProgressCard() {
  return (
    <Link href="/workout" className="block h-full">
      <div className="liquid-glass-card p-6 rounded-3xl cursor-pointer hover:bg-white/30 transition-all duration-300 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[var(--color-9)] to-[var(--color-10)] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/muscle-flex.svg"
                alt="Muscle Icon"
                width={44}
                height={44}
                className="brightness-0 invert"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-3xl font-bold text-[var(--color-10)] leading-tight">
                Workout
              </h3>
              <p className="text-3xl font-bold text-[var(--color-10)] leading-tight">
                Plan
              </p>
            </div>
          </div>
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/arrow-right.svg"
              alt="Arrow"
              width={28}
              height={28}
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(30%) sepia(20%) saturate(1200%) hue-rotate(120deg) brightness(0.85) contrast(0.9)",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
