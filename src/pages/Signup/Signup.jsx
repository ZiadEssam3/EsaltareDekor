import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'; // Import the Eye and EyeOff icons
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './Signup.css';
import { Auth_Logo } from '../../assets/assets';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuthStore } from "../../stores/UserSlice";

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Track password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Track confirm password visibility
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            toast.error('All fields are required!');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        try {
            await signup(email, password, username);
            toast.success('Signup successful! Please verify your email.');
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.message || 'Signup failed! Please try again.');
        }
    };

    return (
        <div className="ED-signup-container">
            <div className='ED-Top-logo-item'>
                <img src={Auth_Logo.AuthLogo} alt="Authlogo" className="ED-Authlogo" />
            </div>
            <form className="ED-signup-form" onSubmit={handleSignUp}>
                <h2 className="ED-signup-title">Sign Up</h2>
                <Input
                    icon={User}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-input-container">
                    <Input
                        icon={Lock}
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff /> : <Eye />} {/* Toggle Eye icon */}
                    </div>
                </div>
                <div className="password-input-container">
                    <Input
                        icon={Lock}
                        type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff /> : <Eye />} {/* Toggle Eye icon */}
                    </div>
                </div>
                {password !== confirmPassword && confirmPassword.length > 0 && (
                    <p className="ED-error-text">Passwords do not match!</p>
                )}
                <button
                    className="ED-signup-button"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
                <div className="ED-social-signup">
                    <button className="ED-social-button ED-google-button">
                        <FcGoogle className="ED-social-icon" />
                        Continue with Google
                    </button>
                    <button className="ED-social-button ED-facebook-button">
                        <FaFacebookF className="ED-social-icon" />
                        Continue with Facebook
                    </button>
                </div>
                <p className="ED-login-text">
                    Already have an account?{" "}
                    <Link to="/login" className="ED-login-link">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
