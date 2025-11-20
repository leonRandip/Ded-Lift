import DateTimeDisplay from "@/components/DateTimeDisplay";
import MealPlanCard from "@/components/MealPlanCard";
import MuscleProgressCard from "@/components/MuscleProgressCard";
import ProgressChart from "@/components/ProgressChart";

export default function Home() {
  return (
    <div className="container mx-auto px-2 md:px-4 py-6 max-w-5xl">
      {/* Top Cards Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <DateTimeDisplay />
        </div>
        <div className="flex-1 min-w-0">
          <MealPlanCard />
        </div>
        <div className="flex-1 min-w-0">
          <MuscleProgressCard />
        </div>
      </div>

      {/* Progress Chart */}
      <div className="w-full">
        <ProgressChart />
      </div>
    </div>
  );
}
