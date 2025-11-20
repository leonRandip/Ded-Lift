"use client";

export default function DateTimeDisplay() {
  // Get current date at render time
  const date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="liquid-glass-card p-6 rounded-3xl h-full">
      <div className="flex items-center space-x-3">
        <div className="w-11 h-11 bg-gradient-to-br from-[var(--color-9)] to-[var(--color-10)] rounded-2xl flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </div>
        <div className="min-w-0">
          <h2 className="text-3xl font-bold text-[var(--color-10)] leading-tight">
            {dayName}
          </h2>
          <p className="text-sm text-[var(--color-8)] mt-0.5">{dateString}</p>
        </div>
      </div>
    </div>
  );
}
