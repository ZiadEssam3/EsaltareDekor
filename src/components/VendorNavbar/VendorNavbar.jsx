import React from "react";
import "./VendorNavbar.css";
import { assets } from "../../assets/assets";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function VendorNavbar() {
    return (
        <>
            <div className="ED-vendor-header">
                <div className="ED-vendor-logo">
                    <img src={assets.ED_logo} alt="Esaltare Dekor" className="inside-ED-vendor-logo" />
                </div>
                <div className="account">
                    <i className="account-icon"><FaRegUserCircle size={20} /></i>
                    <div>My Account</div>
                </div>
            </div>

            <nav className="ED-vendor-nav">
                <Link to='/vendorprofile' className="vendor-nav-links">Profile</Link>
                <Link to='/vendoraddproduct' className="vendor-nav-links">Add Product</Link>
            </nav>

        </>


    );
}

export default VendorNavbar;