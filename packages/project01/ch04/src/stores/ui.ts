import { create } from "zustand"

export interface UIState {
  isLoading: boolean
}

export interface UIAction {
  finishLoading: () => void
}

export const useUIStore = create<UIState & UIAction>((set) => {
  return {
    isLoading: true,
    finishLoading: () => set(() => ({ isLoading: false }))
  }
})
