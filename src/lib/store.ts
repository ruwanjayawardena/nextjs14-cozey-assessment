import { create } from 'zustand';

export type hiddenCards = string[];

export type States = {
    hiddenCards: hiddenCards;
}

export type Actions = {
    setHiddenCards: (order_id: string) => void;
    refreshHiddenCards: () => void;
}

const useStore = create<States & Actions>(set => ({
    hiddenCards: [],
    setHiddenCards: (order_id: string) => set((state) => ({
        hiddenCards: [...state.hiddenCards, order_id]        
    })),
    refreshHiddenCards: () => set(() => ({
        hiddenCards: []
    }))
}));

export default useStore;



