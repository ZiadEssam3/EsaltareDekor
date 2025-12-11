import { create } from "zustand";

export const useDesignStore = create((set) => ({
    backgroundImage: JSON.parse(localStorage.getItem("backgroundImage")) || null,
    setBackgroundImage: (img) => {
        localStorage.setItem("backgroundImage", JSON.stringify(img)); 
        set({ backgroundImage: img });
    },

    models: JSON.parse(localStorage.getItem("savedDesign")) || [],
    unusedModels: JSON.parse(localStorage.getItem("unusedModels")) || [], 

    addModel: (model) =>
        set((state) => {
            const newModels = [...state.models, model];
            localStorage.setItem("savedDesign", JSON.stringify(newModels));
            return { models: newModels };
        }),

    selectedModel: null,
    setSelectedModel: (index) => set({ selectedModel: index }),

    moveModel: (direction) => set((state) => {
        if (state.selectedModel !== null) {
            const updatedModels = [...state.models];
            const model = { ...updatedModels[state.selectedModel] };

            model.position = [...model.position];
            model.rotation = model.rotation ? [...model.rotation] : [0, 0, 0];

            if (direction === "left") model.position[0] -= 0.3;
            if (direction === "right") model.position[0] += 0.3;
            if (direction === "up") model.position[1] += 0.3;
            if (direction === "down") model.position[1] -= 0.3;
            if (direction === "forward") model.position[2] -= 0.3;
            if (direction === "backward") model.position[2] += 0.3;
            if (direction === "rotate") model.rotation[1] += Math.PI / 8;

            updatedModels[state.selectedModel] = model;

            localStorage.setItem("savedDesign", JSON.stringify(updatedModels));
            return { models: updatedModels };
        }
        return state;
    }),

    setDimensions: (width, height) =>
        set((state) => {
            if (state.selectedModel !== null) {
                const updatedModels = [...state.models];
                updatedModels[state.selectedModel].scale = [width, height, 1];
                localStorage.setItem("savedDesign", JSON.stringify(updatedModels));
                return { models: updatedModels };
            }
            return state;
        }),

    saveDesign: () => set((state) => {
        localStorage.setItem("savedDesign", JSON.stringify(state.models));
    }),

    clearDesign: () => set(() => {
        localStorage.removeItem("savedDesign");
        localStorage.removeItem("backgroundImage");
        localStorage.removeItem("unusedModels");
        return { models: [], backgroundImage: null, unusedModels: [] };
    }),

    removeModel: () => set((state) => {
        if (state.selectedModel !== null) {
            const modelToRemove = state.models[state.selectedModel];
            const updatedModels = state.models.filter((_, index) => index !== state.selectedModel);
            const updatedUnusedModels = [...state.unusedModels, modelToRemove]; 

            localStorage.setItem("savedDesign", JSON.stringify(updatedModels));
            localStorage.setItem("unusedModels", JSON.stringify(updatedUnusedModels));

            return { models: updatedModels, unusedModels: updatedUnusedModels, selectedModel: null };
        }
        return state;
    }),

    removeModel: () => set((state) => {
        if (state.selectedModel !== null) {
            const modelToRemove = state.models[state.selectedModel];
            const updatedModels = state.models.filter((_, index) => index !== state.selectedModel);
            const updatedUnusedModels = [...state.unusedModels, modelToRemove];
    
            localStorage.removeItem("savedDesign");
    
            return { models: updatedModels, unusedModels: updatedUnusedModels, selectedModel: null };
        }
        return state;
    }),


}));