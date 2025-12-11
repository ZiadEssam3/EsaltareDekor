import React from "react";
import { useDrop } from "react-dnd";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ModelPreview from "../ModelPreview/ModelPreview";
import { useDesignStore } from "../../../stores/useDesignStore";

const DesignScene = () => {
    const backgroundImage = useDesignStore((state) => state.backgroundImage);
    const models = useDesignStore((state) => state.models);
    const setSelectedModel = useDesignStore((state) => state.setSelectedModel);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "MODEL",
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            if (offset) {
                const x = offset.x / 100 - 5;
                const y = offset.y / 100 - 5;
                // Add new model with unique position and scale
                useDesignStore.getState().addModel({
                    type: item.modelType,
                    modelPath: item.modelPath,
                    position: [x, y, 0], // Set initial position
                    scale: [1.5, 1.5, 1.5], // Set initial scale
                });
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const exportWebGLCanvas = () => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "design-scene.png";
            link.click();
        }
    };

    return (
        <div ref={drop} className="workspace">
            {backgroundImage && <img src={backgroundImage} alt="Background" className="background-image" />}
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ height: '600px' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 0, 0]} intensity={12} />
                <OrbitControls />
                <Environment preset="city" />

                {models.map((model, index) => (
                    <group
                        key={index}
                        position={model.position}
                        rotation={model.rotation || [0, 0, 0]} 
                        scale={model.scale}
                        onClick={() => setSelectedModel(index)}
                    >
                        <ModelPreview modelPath={model.modelPath} />
                    </group>
                ))}
            </Canvas>

            {isOver && <p className="drop-indicator">Drop Here!</p>}
        </div>
    );
};

export default DesignScene;
