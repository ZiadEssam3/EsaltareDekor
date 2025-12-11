import React, { useCallback } from "react";
import { useDesignStore } from "../../../stores/useDesignStore";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./BackgroundUploader.css";
import CustomizerPanel from "../CustomizerPanel/CustomizerPanel";

const BackgroundUploader = () => {
    const { backgroundImage, setBackgroundImage } = useDesignStore();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setBackgroundImage(url);
            toast.success("Background image uploaded!");
        }
    }, [setBackgroundImage]);

    const handleRemoveImage = () => {
        setBackgroundImage(null);
        toast.info("Background image removed.");
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 1,
    });

    return (
        <div className="background-uploader">
            <h3 className="Updload_3D-Image">Upload Background</h3>

            {!backgroundImage ? (
                <div
                    {...getRootProps()}
                    className={`upload-area ${isDragActive ? "active" : ""}`}
                >
                    <input {...getInputProps()} className="file-input" />
                    {isDragActive ? (
                        <p>Drop the image here...</p>
                    ) : (
                        <p>
                            Upload Image<br />
                            <span className="">Click or drag to select</span>
                        </p>
                    )}
                </div>
            ) : (
                <div className="preview-container">
                    <h4>Preview:</h4>
                    <img
                        src={backgroundImage}
                        alt="Preview"
                        onError={(e) => {
                            e.target.style.display = "none";
                            toast.error("Failed to load image!");
                        }}
                    />
                    <button onClick={handleRemoveImage} className="remove-btn">
                        Remove Image
                    </button>
                </div>
            )}

            <div className="controls-container">
                <CustomizerPanel />
            </div>
        </div>
    );
};

export default BackgroundUploader;
