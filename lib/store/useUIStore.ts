import { create } from "zustand";

interface UIState {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// No persist() here -- unlike the wishlist, whether the mobile menu is
// open should always reset to closed on a fresh page load, not be
// remembered across sessions.
export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));