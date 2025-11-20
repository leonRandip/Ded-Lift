"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function ProgressChart() {
  const [activeTab, setActiveTab] = useState("steps");
  const [zoomLevel, setZoomLevel] = useState(1);
  const chartRef = useRef<HTMLDivElement>(null);

  // Sample data for weekly steps
  const weeklyData = [
    { day: "Sat", value: 65, label: "Sat" },
    { day: "Sun", value: 85, label: "Sun" },
    { day: "Mon", value: 55, label: "Mon" },
    { day: "Tue", value: 80, label: "Tue" },
    { day: "Wed", value: 100, label: "Wed" }, // Highlighted
    { day: "Thu", value: 70, label: "Thu" },
    { day: "Fri", value: 60, label: "Fri" },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));
  const yAxisSteps = 5; // Number of steps on Y-axis
  const yAxisMax = Math.ceil(maxValue / 20) * 20; // Round up to nearest 20
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((yAxisMax / yAxisSteps) * i)
  );

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleDownload = async () => {
    if (!chartRef.current) return;

    try {
      // Find the parent container that includes the chart background
      const chartContainer = chartRef.current.parentElement
        ?.parentElement as HTMLElement;
      const elementToCapture = chartContainer || chartRef.current;

      // Capture the chart as canvas using html2canvas-pro (supports oklab colors)
      const canvas = await html2canvas(elementToCapture, {
        backgroundColor:
          getComputedStyle(elementToCapture).backgroundColor || "#f0f0f0",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF using jsPDF
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If image is taller than page, scale it down
      const finalHeight =
        imgHeight > pageHeight - 2 * margin
          ? pageHeight - 2 * margin
          : imgHeight;
      const finalWidth = (canvas.width * finalHeight) / canvas.height;

      pdf.addImage(imgData, "PNG", margin, margin, finalWidth, finalHeight);
      pdf.save("progress-chart.pdf");
    } catch (error) {
      console.error("Error downloading chart:", error);
      alert("Unable to download chart. Please try again.");
    }
  };

  return (
    <div className="liquid-glass-card p-4 md:p-6 rounded-3xl">
      {/* Tab Navigation */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={() => setActiveTab("steps")}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
            activeTab === "steps"
              ? "bg-white/90 text-[var(--color-10)] shadow-md"
              : "bg-transparent text-[var(--color-8)] border border-white/30"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
          <span>Steps</span>
        </button>

        <button
          onClick={() => setActiveTab("heart")}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
            activeTab === "heart"
              ? "bg-white/90 text-[var(--color-10)] shadow-md"
              : "bg-transparent text-[var(--color-8)] border border-white/30"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>Steps</span>
        </button>

        <button
          onClick={() => setActiveTab("regularity")}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
            activeTab === "regularity"
              ? "bg-white/90 text-[var(--color-10)] shadow-md"
              : "bg-transparent text-[var(--color-8)] border border-white/30"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span>Regularity</span>
        </button>
      </div>

      {/* Stats Display */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 md:p-6 mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-5xl font-bold text-[var(--color-10)]">5,400</h2>
            <p className="text-sm text-[var(--color-8)] mt-1">average steps</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/60 rounded-full text-sm font-medium text-[var(--color-10)]">
            <span>This Week</span>
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        {/* Bar Chart with Axes */}
        <div className="bg-[var(--color-2)] rounded-2xl p-2 md:p-4 relative">
          {/* Control Buttons - Top Right - Fixed Position */}
          <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleZoomOut();
              }}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out"
              disabled={zoomLevel <= 0.5}
            >
              <svg
                className="w-4 h-4 text-[var(--color-10)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleZoomIn();
              }}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In"
              disabled={zoomLevel >= 3}
            >
              <svg
                className="w-4 h-4 text-[var(--color-10)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleResetZoom();
                }}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm"
                title="Reset Zoom"
              >
                <svg
                  className="w-4 h-4 text-[var(--color-10)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload();
              }}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm"
              title="Download Chart as PDF"
            >
              <svg
                className="w-4 h-4 text-[var(--color-10)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Chart Container */}
          <div className="overflow-x-auto overflow-y-visible" ref={chartRef}>
            {/* Chart Container with Axes */}
            <div className="flex min-w-[600px] md:min-w-0">
              {/* Y-Axis */}
              <div className="flex flex-col justify-between h-48 pr-2 md:pr-3">
                {[...yAxisLabels].reverse().map((value) => (
                  <div
                    key={value}
                    className="text-xs md:text-sm text-[var(--color-8)] font-medium"
                    style={{ height: `${100 / yAxisSteps}%` }}
                  >
                    {value}
                  </div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="flex-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {yAxisLabels.map((_, index) => (
                    <div
                      key={index}
                      className="border-t border-white/20"
                      style={{ height: `${100 / yAxisSteps}%` }}
                    />
                  ))}
                </div>

                <div
                  className="flex items-end justify-between h-48 gap-2 md:gap-4 relative z-10 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "left bottom",
                    minWidth: `${600 * zoomLevel}px`,
                  }}
                >
                  {weeklyData.map((item) => {
                    const heightPercent = (item.value / yAxisMax) * 100;
                    const isActive = item.day === "Wed";

                    return (
                      <div
                        key={item.day}
                        className="flex flex-col items-center flex-1 h-full relative min-w-[60px]"
                      >
                        {/* Bar */}
                        <div
                          className="w-full relative"
                          style={{ height: "100%" }}
                        >
                          <div
                            className={`absolute bottom-0 w-full rounded-2xl transition-all duration-500 border-1 border-white ${
                              isActive
                                ? "bg-gradient-to-b from-[var(--color-9)] to-[var(--color-10)] shadow-lg"
                                : "bg-white"
                            }`}
                            style={{
                              height: `${heightPercent}%`,
                              boxShadow: isActive
                                ? "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)"
                                : "inset 0 0 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            {/* Glossy highlight for active bar */}
                            {isActive && (
                              <div
                                className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl"
                                style={{
                                  background:
                                    "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between mt-2 gap-2 md:gap-4 min-w-[600px] md:min-w-0">
                  {weeklyData.map((item) => (
                    <div
                      key={item.day}
                      className="flex-1 text-center min-w-[60px]"
                    >
                      <span className="text-xs md:text-sm text-[var(--color-8)] font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
