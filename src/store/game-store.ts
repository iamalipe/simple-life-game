import type { ICharacter } from "@/type/general";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const localStorageKey = "game-store";

// Define the shape of your state (Skip this block if using plain JS)
interface GameStore {
  character: ICharacter | null;
  // Actions
  onSetCharacter: (character: ICharacter | null) => void;
}

// Create the store wrapped in the `persist` middleware
export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      // --- Initial State ---
      character: null,

      // --- Actions ---
      onSetCharacter: (character) => set({ character }),
    }),
    {
      name: localStorageKey, // The key used in localStorage
    },
  ),
);

// apiService.js (or any non-React file)
// import { useAppStore } from './store';

// export const performBackgroundSync = async () => {
//   // 1. READ state outside a component
//   const currentTasks = useAppStore.getState().tasks;
//   const user = useAppStore.getState().userProfile;

//   if (!user) {
//     console.log("No user logged in, skipping sync.");
//     return;
//   }

//   console.log(`Syncing ${currentTasks.length} tasks for ${user.name}...`);

//   try {
//     // Simulate an API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // 2. WRITE state outside a component
//     useAppStore.setState({ theme: 'dark' });
//     console.log("Sync complete, theme switched to dark.");

//   } catch (error) {
//     console.error("Sync failed", error);
//   }
// };

// import { useStore } from './store';
// import { useShallow } from 'zustand/react/shallow';

// // ✅ BEST: Select exactly what you need in one clean object.
// // It will only re-render if health or happiness specifically change.
// const { health, happiness } = useStore(
//   useShallow((state) => ({
//     health: state.player.stats.health,
//     happiness: state.player.stats.happiness,
//   }))
// );
