import React, { useState } from 'react';
import './ForgotPassword.css';
import { useAuthStore } from '../../stores/authStore';
import { toast } from 'react-toastify';
import { Auth_Logo } from '../../assets/assets';

function ForgotPassword() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isLoading, forgotPassword } = useAuthStore();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setIsSubmitted(true);
            toast.success('Password reset email sent!');
        } catch (error) {
            toast.error('Failed to send reset email. Try again.');
        }
    };


    return (
        <div className="forgot-password-container">
            <div className='ED-Top-logo-item'>
                <img src={Auth_Logo.AuthLogo} alt="Authlogo" className="Authlogo" />
            </div>
            <h2 className="forgot-password-title">Forgot Password</h2>
            <p className="forgot-password-instruction">Please enter your email to reset the password</p>
            <div className="input-container">
                <label htmlFor="email" className="input-label">Your Email</label>
                <input type="email" id="email" className="email-input" />
            </div>
            <button className="reset-password-button" onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
}

export default ForgotPassword;