"use client";

import { useState } from "react";
import { UserPreferences } from "./MealPlanPage";

interface MealPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: UserPreferences) => void;
  initialData?: UserPreferences;
}

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Maintain Weight",
  "General Health",
  "Athletic Performance",
];

const DIETARY_PREFERENCES = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Low Carb",
  "High Protein",
  "Gluten Free",
  "Dairy Free",
];

const ALLERGIES = [
  "Peanut Allergy",
  "Lactose Intolerance",
  "Gluten Allergy",
  "Shellfish Allergy",
  "Egg Allergy",
  "Soy Allergy",
  "Tree Nut Allergy",
  "Fish Allergy",
  "Sesame Allergy",
  "Sulfite Sensitivity",
];

export default function MealPlanDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: MealPlanDialogProps) {
  const [formData, setFormData] = useState<UserPreferences>({
    name: initialData?.name || "",
    age: initialData?.age || "",
    gender: initialData?.gender || "",
    weight: initialData?.weight || "",
    fitnessGoal: initialData?.fitnessGoal || "",
    dietaryPreferences: initialData?.dietaryPreferences || [],
    allergies: initialData?.allergies || [],
  });

  const [dietarySearch, setDietarySearch] = useState("");
  const [allergySearch, setAllergySearch] = useState("");
  const [showDietaryDropdown, setShowDietaryDropdown] = useState(false);
  const [showAllergyDropdown, setShowAllergyDropdown] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.age &&
      formData.gender &&
      formData.weight &&
      formData.fitnessGoal
    ) {
      onSubmit(formData);
    }
  };

  const toggleDietaryPreference = (pref: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(pref)
        ? prev.dietaryPreferences.filter((p) => p !== pref)
        : [...prev.dietaryPreferences, pref],
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const filteredDietary = DIETARY_PREFERENCES.filter((pref) =>
    pref.toLowerCase().includes(dietarySearch.toLowerCase())
  );

  const filteredAllergies = ALLERGIES.filter((allergy) =>
    allergy.toLowerCase().includes(allergySearch.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--color-10)]/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="liquid-glass-card rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          style={{
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-10)]">
              Create Your Meal Plan
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[var(--color-8)]/20 hover:bg-[var(--color-8)]/40 flex items-center justify-center transition-all"
            >
              <svg
                className="w-5 h-5 text-[var(--color-10)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)]"
                required
              />
            </div>

            {/* Age and Gender Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)]"
                  required
                  min="1"
                  max="120"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)] bg-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)]"
                required
                min="1"
                step="0.1"
              />
            </div>

            {/* Fitness Goal */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Fitness Goal
              </label>
              <select
                value={formData.fitnessGoal}
                onChange={(e) =>
                  setFormData({ ...formData, fitnessGoal: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)] bg-transparent"
                required
              >
                <option value="">Select Fitness Goal</option>
                {FITNESS_GOALS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Dietary Preferences
              </label>
              <button
                type="button"
                onClick={() => setShowDietaryDropdown(true)}
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all"
              >
                {formData.dietaryPreferences.length > 0
                  ? `${formData.dietaryPreferences.length} selected`
                  : "Click to select dietary preferences..."}
              </button>
              {formData.dietaryPreferences.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.dietaryPreferences.map((pref) => (
                    <span
                      key={pref}
                      className="px-3 py-1 rounded-lg bg-[var(--color-5)]/20 text-[var(--color-10)] text-sm flex items-center"
                    >
                      {pref}
                      <button
                        type="button"
                        onClick={() => toggleDietaryPreference(pref)}
                        className="ml-2"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-10)] mb-2">
                Allergies
              </label>
              <button
                type="button"
                onClick={() => setShowAllergyDropdown(true)}
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-left text-[var(--color-10)] hover:bg-[var(--color-2)]/30 transition-all"
              >
                {formData.allergies.length > 0
                  ? `${formData.allergies.length} selected`
                  : "Click to select allergies..."}
              </button>
              {formData.allergies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-3 py-1 rounded-lg bg-red-500/20 text-[var(--color-10)] text-sm flex items-center"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => toggleAllergy(allergy)}
                        className="ml-2"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 text-[var(--color-10)] font-medium hover:bg-[var(--color-2)]/30 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-5)] to-[var(--color-7)] text-white font-medium hover:from-[var(--color-6)] hover:to-[var(--color-8)] transition-all shadow-lg"
              >
                Generate Meal Plan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Dietary Preferences Popup Modal */}
      {showDietaryDropdown && (
        <>
          <div
            className="fixed inset-0 bg-[var(--color-10)]/30 backdrop-blur-sm z-50"
            onClick={() => setShowDietaryDropdown(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="liquid-glass-card rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
              style={{
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--color-10)]">
                  Select Dietary Preferences
                </h3>
                <button
                  onClick={() => setShowDietaryDropdown(false)}
                  className="w-8 h-8 rounded-full bg-[var(--color-8)]/20 hover:bg-[var(--color-8)]/40 flex items-center justify-center transition-all"
                >
                  <svg
                    className="w-5 h-5 text-[var(--color-10)]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={dietarySearch}
                onChange={(e) => setDietarySearch(e.target.value)}
                placeholder="Search dietary preferences..."
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)] mb-4"
                autoFocus
              />
              <div className="flex-1 overflow-y-auto">
                {filteredDietary.map((pref) => {
                  const isSelected = formData.dietaryPreferences.includes(pref);
                  return (
                    <div
                      key={pref}
                      onClick={() => toggleDietaryPreference(pref)}
                      className={`px-4 py-3 cursor-pointer transition-all rounded-lg mb-2 ${
                        isSelected
                          ? "bg-[var(--color-5)]/30 text-[var(--color-10)] font-medium border border-[var(--color-5)]/50"
                          : "hover:bg-[var(--color-2)]/30 text-[var(--color-10)]"
                      }`}
                    >
                      <span className="text-sm">{pref}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Allergies Popup Modal */}
      {showAllergyDropdown && (
        <>
          <div
            className="fixed inset-0 bg-[var(--color-10)]/30 backdrop-blur-sm z-50"
            onClick={() => setShowAllergyDropdown(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="liquid-glass-card rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
              style={{
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--color-10)]">
                  Select Allergies
                </h3>
                <button
                  onClick={() => setShowAllergyDropdown(false)}
                  className="w-8 h-8 rounded-full bg-[var(--color-8)]/20 hover:bg-[var(--color-8)]/40 flex items-center justify-center transition-all"
                >
                  <svg
                    className="w-5 h-5 text-[var(--color-10)]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={allergySearch}
                onChange={(e) => setAllergySearch(e.target.value)}
                placeholder="Search allergies..."
                className="w-full px-4 py-2 rounded-xl liquid-glass-card border border-[var(--color-2)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-5)] text-[var(--color-10)] mb-4"
                autoFocus
              />
              <div className="flex-1 overflow-y-auto">
                {filteredAllergies.map((allergy) => {
                  const isSelected = formData.allergies.includes(allergy);
                  return (
                    <div
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`px-4 py-3 cursor-pointer transition-all rounded-lg mb-2 ${
                        isSelected
                          ? "bg-red-500/30 text-[var(--color-10)] font-medium border border-red-500/50"
                          : "hover:bg-[var(--color-2)]/30 text-[var(--color-10)]"
                      }`}
                    >
                      <span className="text-sm">{allergy}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
