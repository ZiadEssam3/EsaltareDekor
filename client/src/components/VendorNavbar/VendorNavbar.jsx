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
                    <Link to='/' className='vendor-console-package'>
                        <img src={assets.ED_logo} alt="Esaltare Dekor" className="inside-ED-vendor-logo" />
                    </Link>
                </div>
                <div className="account">
                    <i className="account-icon"><FaRegUserCircle size={20} /></i>
                    <Link to='/vendorprofile' className='vendor-console-package'>
                        <div>My Account</div>
                    </Link>
                </div>
            </div>

            <nav className="ED-vendor-nav">
                <Link to='/vendorhome' className="vendor-nav-links">MyPackage</Link>
                <Link to='/vendorprofile' className="vendor-nav-links">Profile</Link>
                <Link to='/add-brand' className="vendor-nav-links">AddBrand</Link>
                <Link to='/vendoraddproduct' className="vendor-nav-links">Add Product</Link>
            </nav>

        </>


    );
}

export default VendorNavbar;