import React, { useEffect } from "react";
import { useDesignStore } from "../../../stores/useDesignStore";
import { toast } from "react-toastify";
import './CustomizerPanel.css';

const CustomizerPanel = () => {
    const { selectedModel, models, setDimensions } = useDesignStore();
    const moveModel = useDesignStore((state) => state.moveModel);

    useEffect(() => {
        if (selectedModel !== null) {
            const key = `savedDimensions_model_${selectedModel}`;
            const savedDimensions = JSON.parse(localStorage.getItem(key));
            if (savedDimensions) {
                setDimensions(savedDimensions[0], savedDimensions[1]);
            }
        }
    }, [selectedModel, setDimensions]);

    const dimensions = models[selectedModel]?.scale || [1, 1, 1];

    const handleMoveModel = (direction) => {
        moveModel(direction);
    };

    const handleSaveSettings = () => {
        const key = `savedDimensions_model_${selectedModel}`;
        localStorage.setItem(key, JSON.stringify(dimensions));
        toast.success("Data Saved Successfully!🎉");
    };

    return (
        <div className="model-customizer-panel">
            <h3 className="model-panel-title">Model Customization</h3>
            {selectedModel !== null ? (
                <>
                    <div className="model-input-group">
                        <label>Width:</label>
                        <input
                            type="number"
                            value={dimensions[0]}
                            onChange={(e) =>
                                setDimensions(Math.max(Number(e.target.value), 0.5), dimensions[1])
                            }
                            min="0.5"
                            step="0.1"
                        />
                    </div>

                    <div className="model-input-group">
                        <label>Height:</label>
                        <input
                            type="number"
                            value={dimensions[1]}
                            onChange={(e) =>
                                setDimensions(dimensions[0], Math.max(Number(e.target.value), 0.5))
                            }
                            min="0.5"
                            step="0.1"
                        />
                    </div>

                    <div className="model-controls">
                        <div className="model-grid-controls">
                            <button onClick={() => handleMoveModel("left")}>Left</button>
                            <button onClick={() => handleMoveModel("right")}>Right</button>
                            <button onClick={() => handleMoveModel("up")}>Up</button>
                            <button onClick={() => handleMoveModel("down")}>Down</button>
                            <button onClick={() => handleMoveModel("forward")}>Forward</button>
                            <button onClick={() => handleMoveModel("backward")}>Backward</button>
                            <button onClick={() => handleMoveModel("rotate")}>Rotate</button>
                        </div>
                    </div>

                    <button className="model-save-button" onClick={handleSaveSettings}>💾 Save Settings</button>
                    <button onClick={() => useDesignStore.getState().removeAndReAddModel()}>Delete and Add Model</button>
                    <button onClick={() => useDesignStore.getState().removeModel()}>
                        ❌ Move to Unused List
                    </button>
                </>
            ) : (
                <p className="model-placeholder">Select a model to customize</p>
            )}
        </div>
    );
};

export default CustomizerPanel;
