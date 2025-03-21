// App.js
import React, { useState } from "react";
import "./App.css";
import SudokuGame from "./SudokuGame";
import AuthModal from './AuthModal';

function App() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div className="App">
            <div className="header">
                <button
                    className="auth-button"
                    onClick={() => setIsAuthModalOpen(true)}
                >
                    ⋮
                </button>
            </div>
            <SudokuGame />
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLoginSuccess={(userData) => {
                    setIsAuthModalOpen(false);
                }}
            />
        </div>
    );
}

export default App;