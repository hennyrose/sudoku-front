// AuthModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isLoginMode ? '/api/users/login' : '/api/users/register';
            const response = await axios.post(endpoint, formData);
            onLoginSuccess(response.data);
            onClose();
        } catch (err) {
            setError(err.response?.data || 'An error occurred');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="modal-header">
                    <button
                        className="modal-cancel-button"
                        onClick={onClose}
                        aria-label="Cancel"
                    >
                        Cancel
                    </button>
                    <h2 className="modal-title">{isLoginMode ? 'Sign In' : 'Create Account'}</h2>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nickname"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                            minLength="3"
                            maxLength="20"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                            minLength="6"
                        />
                    </div>
                    <button
                        type="submit"
                        className={isLoginMode ? 'login-button' : 'register-button'}
                        disabled={!formData.username || !formData.password}
                    >
                        {isLoginMode ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-switch">
                    <button onClick={() => setIsLoginMode(!isLoginMode)}>
                        {isLoginMode ? 'Need to create an account?' : 'Already have an account?'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;