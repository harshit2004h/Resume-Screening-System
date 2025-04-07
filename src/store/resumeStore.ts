// src/store/useResumeStore.ts
import { create } from "zustand";

type ResumeStore = {
  pdfUrl: string | null;
  setPdfUrl: (url: string | null) => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  pdfUrl: null,
  setPdfUrl: (url) => set({ pdfUrl: url }),
}));
