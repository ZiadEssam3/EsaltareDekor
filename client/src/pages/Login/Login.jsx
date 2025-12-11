import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/UserSlice";
import { toast } from 'react-toastify';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Auth_Logo } from '../../assets/assets';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Check for empty fields
        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }
        // Proceed with login
        try {
            await login(email, password);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error('Invalid Email or Password');
        }
    };

    return (
        <div className="login-container">
            <div className='ED-Top-logo-item'>
                <img src={Auth_Logo.AuthLogo} alt="Authlogo" className="Authlogo" />
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>
                {/* Email Input */}
                <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Password Input */}
                <div className="password-input-container">
                    <Input
                        icon={Lock}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                </div>
                <div className="login-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <Link to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
                </div>
                {error && <p className="error-text">{error}</p>}
                <button
                    className="login-button"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
                <div className="social-login">
                    <button className="social-button google-button">
                        <FcGoogle className="social-icon" />
                        Continue with Google
                    </button>
                    <button className="social-button facebook-button">
                        <FaFacebookF className="social-icon" />
                        Continue with Facebook
                    </button>
                </div>
                <p className="sign-up-text">
                    Don't have an account?{" "}
                    <Link to="/signup" className="sign-up-link">Sign Up</Link>
                </p>
            </form>
            <h6 className="ED-login-title-h">
                By subscribing to the Esaltare Deckör platform, you agree to
                Terms and Conditions
                and Return policy
            </h6>
        </div>
    );
};

export default LoginPage;
