import React, { useState } from 'react';
import './SetNewPassword.css';
import { Eye, EyeOff } from 'lucide-react';
import { Auth_Logo } from '../../assets/assets';

const SetNewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        alert('Password updated successfully');
    };

    return (
        <div className="reset-password-container">
            <div className='ED-Top-logo-item'>
                <img src={Auth_Logo.AuthLogo} alt="Authlogo" className="Authlogo" />
            </div>
            <button className="back-button">←</button>
            <h2 className="title">Set a New Password</h2>
            <p className="subtitle">
                Create a new password<br />Ensure it’s different from the previous password
            </p>

            <form onSubmit={handleUpdate}>
                <div className="input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="icon">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>

                <div className="input-group">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="icon">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>

                <div className="remember-container">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember">Remember me</label>
                </div>

                <button type="submit" className="update-btn">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default SetNewPassword;