import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../stores/UserSlice';
import './SetNewPassword.css';
import { Auth_Logo } from '../../assets/assets';
import { useParams } from 'react-router-dom';

function SetNewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams] = useSearchParams();
    const { token } = useParams();
    const email = searchParams.get('email');  
    const navigate = useNavigate();
    const { isLoading, error, message, resetPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!password.trim()) {
            toast.error('Please enter your new password');
            document.getElementById('password').focus();
            return;
        }

        if (!confirmPassword.trim()) {
            toast.error('Please confirm your new password');
            document.getElementById('confirmPassword').focus();
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            setConfirmPassword(''); 
            document.getElementById('confirmPassword').focus();
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters');
            document.getElementById('password').focus();
            return;
        }

        if (!token || !email) {
            toast.error('Invalid reset token or email');
            navigate('/forgot-password');
            return;
        }

        try {
            await resetPassword(token, email, password, confirmPassword);
            toast.success('Password updated successfully!');
            navigate('/login');
        } catch (err) {
            toast.error(err.message || 'Failed to reset password');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className='ED-Top-logo-item'>
                <img src={Auth_Logo.AuthLogo} alt="Authlogo" className="Authlogo" />
            </div>

            <h2 className="forgot-password-title">Set New Password</h2>
            <p className="forgot-password-instruction">Please enter and confirm your new password</p>

            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="password" className="input-label">New Password</label>
                    <input
                        type="password"
                        id="password"
                        className="email-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Enter new password (min 8 characters)"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="email-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Confirm your new password"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                <button
                    type="submit"
                    className="reset-password-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Set New Password'}
                </button>
            </form>
        </div>
    );
}

export default SetNewPassword;
