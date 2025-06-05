import React, { useState } from 'react';
import './ForgotPassword.css';
import { toast } from 'react-toastify';
import { Auth_Logo } from '../../assets/assets';
import { useAuthStore } from '../../stores/UserSlice';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isLoading, forgotPassword } = useAuthStore();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter Your email');
            return;
        }
        // Process
        try {
            await forgotPassword(email);
            setIsSubmitted(true);
            toast.success('Password reset email sent!');
            // navigate('/setnewpassword');
        } catch (error) {
            toast.error(error.message || 'Failed to send reset email. Try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className='ED-Top-logo-item'>
                <img src={Auth_Logo.AuthLogo} alt="Authlogo" className="Authlogo" />
            </div>
            <h2 className="forgot-password-title">Forgot Password</h2>
            <p className="forgot-password-instruction">Please enter your email to reset the password</p>
            <form onSubmit={handleResetPassword}> 
                <div className="input-container">
                    <label htmlFor="email" className="input-label">Your Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="email-input" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    className="reset-password-button" 
                    disabled={isLoading} 
                >
                    {isLoading ? 'Sending...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;