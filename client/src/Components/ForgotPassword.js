import React, { useState } from 'react';
import './ForgotPassword.css'; // Importo stilet CSS

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5178/api/account/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            console.log(data);
            setPopupMessage(data.message);
            setShowPopup(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-content">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
