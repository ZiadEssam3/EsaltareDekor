import React from "react";
import { assets } from '../../assets/assets';
import "./Footer.css";
import {
    FaFacebook,
    FaWhatsapp,
    FaLinkedin,
    FaYoutube,
    FaCcVisa,
    FaCcPaypal,
    FaCcMastercard,
    FaApplePay,
    FaAmazonPay,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="ED-footer">
            <div className="ED-footer-container">
                <div className="ED-footer-logo">
                    <img src={assets.ED_logo} alt="Esaltare Dekor Logo" />
                </div>

                <div className="ED-footer-section">
                    <h3>The company</h3>
                    <ul>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Jobs</a></li>
                    </ul>
                </div>

                <div className="ED-footer-section">
                    <h3>Important Links</h3>
                    <ul>
                        <li><a href="#">Privacy policy</a></li>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Join as a partner</a></li>
                        <li><a href="#">Return Policy</a></li>
                    </ul>
                </div>

                <div className="ED-footer-help">
                    <h3>Need Help ?</h3>
                    <p>Esaltare@help.org</p>
                </div>
            </div>

            <div className="ED-footer-bottom">
                <div className="ED-footer-social">
                    <h4>Follow Us</h4>
                    <div className="ED-social-icons">
                        <FaFacebook />
                        <FaWhatsapp />
                        <FaLinkedin />
                        <FaYoutube />
                    </div>
                </div>

                <div className="ED-footer-payment">
                    <h4>Payment Methods</h4>
                    <div className="ED-payment-icons">
                        <FaCcVisa />
                        <FaCcPaypal />
                        <FaCcMastercard />
                        <FaApplePay />
                        <FaAmazonPay />
                    </div>
                </div>
            </div>

            <p className="ED-footer-rights">All rights reserved 2025 &copy;</p>
        </footer>
    );
};

export default Footer;
