
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  const toastTimer = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);
        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      }

      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);
        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      }
    } catch (error) {
      console.error("Could not load FitLog data:", error);
    } finally {
      setReady(true);
    }
  }, []);

  // Persist data after localStorage hydration
  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    } catch (error) {
      console.error("Could not save FitLog data:", error);
    }
  }, [plan, saved, ready]);

  // Clear toast timer when provider unmounts
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  // Show toast notification
  const showToast = (message) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast(message);

    toastTimer.current = setTimeout(() => {
      setToast("");
      toastTimer.current = null;
    }, 2500);
  };

  // Add workout to plan (maximum 5, no duplicates)
  const addToPlan = (workout) => {
    if (!workout || workout.id == null) {
      showToast("Invalid workout");
      return;
    }

    if (plan.some((item) => String(item.id) === String(workout.id))) {
      showToast("Workout already in your plan");
      return;
    }

    if (plan.length >= 5) {
      showToast("Your plan is limited to 5 workouts");
      return;
    }

    setPlan((current) => {
      // Recheck against the latest state
      if (
        current.some(
          (item) => String(item.id) === String(workout.id)
        ) ||
        current.length >= 5
      ) {
        return current;
      }

      return [...current, { ...workout, done: false }];
    });

    showToast("Added to today's plan");
  };

  // Save workout (no duplicates)
  const saveWorkout = (workout) => {
    if (!workout || workout.id == null) {
      showToast("Invalid workout");
      return;
    }

    if (saved.some((item) => String(item.id) === String(workout.id))) {
      showToast("Workout already saved");
      return;
    }

    setSaved((current) => {
      if (
        current.some(
          (item) => String(item.id) === String(workout.id)
        )
      ) {
        return current;
      }

      return [...current, workout];
    });

    showToast("Saved for later");
  };

  // Remove workout from plan
  const removeFromPlan = (id) => {
    setPlan((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );

    showToast("Removed from today's plan");
  };

  // Remove workout from saved
  const removeFromSaved = (id) => {
    setSaved((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );

    showToast("Removed from Saved");
  };

  // Mark workout as completed
  const markAsDone = (id) => {
    setPlan((current) =>
      current.map((item) =>
        String(item.id) === String(id)
          ? { ...item, done: true }
          : item
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
          aria-live="polite"
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