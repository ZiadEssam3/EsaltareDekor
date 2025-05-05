import React from "react";
import { useDrag } from "react-dnd";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelPreview from "../ModelPreview/ModelPreview";
import "./DragDropClipboard.css";
import CustomizerPanel from "../CustomizerPanel/CustomizerPanel";
import BackgroundUploader from "../BackgroundUploader/BackgroundUploader";

const models = [
    { name: "Shell Chair", path: "/models/shell_chair.glb" },
    { name: "Chair", path: "/models/chair.glb" },
    { name: "Antique Chair", path: "/models/antique_chair.glb" },
    { name: "Old Chair", path: "/models/old_wooden_chair.glb" },
    { name: "Hookah", path: "/models/hookah.glb" },
    { name: "Table", path: "/models/table.glb" },
    { name: "sofa", path: "/models/sofa.glb" },
    { name: "sofaset", path: "/models/sofa_set.glb" },
];

const DragDropClipboard = () => {
    return (
        <div className="sidebar">
            <h3>3D Models</h3>
            <div className="model-list">
                {models.map((model, index) => {
                    const [{ isDragging }, drag] = useDrag(() => ({
                        type: "MODEL",
                        item: { modelType: model.name, modelPath: model.path },
                        collect: (monitor) => ({
                            isDragging: !!monitor.isDragging(),
                        }),
                    }));

                    return (
                        <div ref={drag} className="draggable-item" key={index}>
                            <p>{model.name}</p>
                            <div className="canvas-container">
                                <Canvas style={{ width: '100px' }}>
                                    <ambientLight intensity={3} />
                                    <OrbitControls autoRotate minDistance={5} maxDistance={10} />
                                    <ModelPreview modelPath={model.path} />
                                </Canvas>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default DragDropClipboard;