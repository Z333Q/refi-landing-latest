import { create } from 'zustand';

export interface Stats {
  cagr: number;
  sharpe: number;
  max_dd: number;
  var95: number;
  es95: number;
}

export interface ApiResponse {
  stats: Stats;
  equity: number[];
  dates: string[];
}

interface PortfolioStore {
  portfolioData: ApiResponse | null;
  spyData: ApiResponse | null;
  isLoading: boolean;
  selectedAssets: string[];
  setPortfolioData: (data: ApiResponse) => void;
  setSpyData: (data: ApiResponse) => void;
  setLoading: (loading: boolean) => void;
  setSelectedAssets: (assets: string[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioData: null,
  spyData: null,
  isLoading: false,
  selectedAssets: [],
  setPortfolioData: (data) => set({ portfolioData: data }),
  setSpyData: (data) => set({ spyData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSelectedAssets: (assets) => set({ selectedAssets: assets }),
}));