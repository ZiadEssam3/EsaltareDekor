import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { assets } from "../../assets/assets";

const LoadingSpinner = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000); 
    }, []);

    return loading ? (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
        }}>
            <img src={assets.ED_logo} alt="ED Logo" className="ED-logo" />
            <ClipLoader color="#7b0606" size={50} />
            <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>Loading...</p>
        </div>
    ) : null;
};

export default LoadingSpinner;
