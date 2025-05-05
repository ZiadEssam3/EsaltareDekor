import React from "react";
import { useGLTF } from "@react-three/drei";

const ModelPreview = ({ modelPath, scale }) => {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={scale || [1.2, 1.2, 1.2]} />;
};

export default ModelPreview;