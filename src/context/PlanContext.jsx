"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (error) {
      console.error("Could not load FitLog data:", error);
    } finally {
      setReady(true);
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!ready) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, ready]);

  // Show toast notification
  const showToast = (message) => {
    setToast(message);

    // Clear previous notification after a short delay
    setTimeout(() => setToast(""), 2500);
  };

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      showToast("Workout already in your plan");
      return;
    }

    if (plan.length >= 5) {
      showToast("Your plan is limited to 5 workouts");
      return;
    }

    setPlan((current) => [...current, { ...workout, done: false }]);
    showToast("Added to today's plan");
  };

  const saveWorkout = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      showToast("Workout already saved");
      return;
    }

    setSaved((current) => [...current, workout]);
    showToast("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    showToast("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    showToast("Removed from Saved");
  };

  const markAsDone = (id) => {
    setPlan((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: true } : item
      )
    );

    showToast("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        toast,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        showToast,
      }}
    >
      {children}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-lg border border-[#C2F800]/40 bg-[#15171D] px-5 py-3 text-sm text-white shadow-xl"
        >
          <span className="mr-2 text-[#C2F800]">✓</span>
          {toast}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}