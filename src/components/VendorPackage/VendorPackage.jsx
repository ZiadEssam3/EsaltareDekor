import React from "react";
import "./VendorPackage.css";

function PackageCard({ title, tier, price, features, buttonColor }) {
    return (
        <div className="package-card">
            <div className="package-header">
                <h3 className="package-title">{title}</h3>
            </div>

            <div className="package-tier">{tier}</div>

            <div className="package-price">{price}</div>

            <ul className="package-features">
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>

            <button className="package-button" style={{ backgroundColor: buttonColor }}>BUY NOW</button>
        </div>
    );
}

export default PackageCard;