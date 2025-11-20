"use client";

import Image from "next/image";
import { Workout } from "./WorkoutPlanPage";

interface WorkoutCardProps {
  workout: Workout;
  isMobile?: boolean;
}

export default function WorkoutCard({
  workout,
  isMobile = false,
}: WorkoutCardProps) {
  if (isMobile) {
    return (
      <div className="liquid-glass-card rounded-2xl p-4 overflow-hidden">
        <div className="mb-3 flex gap-2">
          <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-5)]/20 text-[var(--color-10)] text-xs font-medium">
            {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}
          </span>
          <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-7)]/20 text-[var(--color-10)] text-xs font-medium">
            {workout.difficulty.charAt(0).toUpperCase() +
              workout.difficulty.slice(1)}
          </span>
        </div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 liquid-glass-card bg-gradient-to-br from-[var(--color-2)]/30 to-[var(--color-4)]/30">
          {workout.image && workout.image.trim() !== "" ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              unoptimized={workout.image.startsWith("/api/")} // Don't optimize API route images
              onError={(e) => {
                // Hide image and show placeholder on error
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector("svg")) {
                  const placeholder = document.createElement("div");
                  placeholder.className =
                    "w-full h-full flex items-center justify-center";
                  placeholder.innerHTML = `<svg class="w-20 h-20 text-[var(--color-8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
                  parent.appendChild(placeholder);
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-20 h-20 text-[var(--color-8)]"
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
          )}
        </div>
        <h3 className="text-lg font-bold text-[var(--color-10)] mb-2">
          {workout.name}
        </h3>
        <div className="text-sm text-[var(--color-8)] mb-3">
          <p>Equipment: {workout.equipment}</p>
          <p>Type: {workout.type}</p>
        </div>
        <p className="text-sm text-[var(--color-10)] leading-relaxed line-clamp-3">
          {workout.instructions}
        </p>
      </div>
    );
  }

  // Desktop: Full card with info
  return (
    <div className="liquid-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="mb-4 flex gap-2">
        <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-5)]/20 text-[var(--color-10)] text-xs font-medium">
          {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}
        </span>
        <span className="inline-block px-3 py-1 rounded-lg bg-[var(--color-7)]/20 text-[var(--color-10)] text-xs font-medium">
          {workout.difficulty.charAt(0).toUpperCase() +
            workout.difficulty.slice(1)}
        </span>
      </div>
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 liquid-glass-card p-2 bg-gradient-to-br from-[var(--color-2)]/30 to-[var(--color-4)]/30">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {workout.image && workout.image.trim() !== "" ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              unoptimized={workout.image.startsWith("/api/")} // Don't optimize API route images
              onError={(e) => {
                // Hide image and show placeholder on error
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector("svg")) {
                  const placeholder = document.createElement("div");
                  placeholder.className =
                    "w-full h-full flex items-center justify-center";
                  placeholder.innerHTML = `<svg class="w-24 h-24 text-[var(--color-8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
                  parent.appendChild(placeholder);
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-24 h-24 text-[var(--color-8)]"
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
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[var(--color-10)] mb-4">
        {workout.name}
      </h3>
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center gap-1 text-[var(--color-8)]">
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span>{workout.equipment}</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-8)]">
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>{workout.type}</span>
        </div>
      </div>
      <p className="text-sm text-[var(--color-10)] leading-relaxed line-clamp-4">
        {workout.instructions}
      </p>
    </div>
  );
}
