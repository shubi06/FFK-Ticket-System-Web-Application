import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './ResetPassword.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isValidLink, setIsValidLink] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const emailParam = urlParams.get('email');
        const tokenParam = urlParams.get('token');
        const validUntil = urlParams.get('validUntil');

        console.log('URL Parameters:', { email: emailParam, token: tokenParam, validUntil });

        setEmail(emailParam || '');
        setToken(tokenParam || '');

        if (emailParam && tokenParam && validUntil) {
            validateLink(emailParam, tokenParam, validUntil);
        } else {
            navigate('/login'); // Redirect if URL parameters are missing
        }
    }, [location.search]);

    const validateLink = async (email, token, validUntil) => {
        try {
            const response = await fetch('http://localhost:5178/api/account/validate-reset-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, validUntil }),
            });

            const data = await response.json();
            console.log('Validation Response:', data);

            if (response.ok) {
                setIsValidLink(true);
            } else {
                setMessage(data.message);
                setShowModal(true);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors(['An unexpected error occurred.']);
            setShowModal(true);
            navigate('/login');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', { email, token, newPassword });

        try {
            const response = await fetch('http://localhost:5178/api/account/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, newPassword }),
            });

            const data = await response.json();
            console.log('Server Response:', data);

            if (response.ok) {
                setMessage(data.message);
            } else {
                setErrors(data.errors || [data.message]);
            }
            setShowModal(true);
        } catch (error) {
            console.error('Error:', error);
            setErrors(['An unexpected error occurred.']);
            setShowModal(true);
        }
    };

    return (
        <div className="reset-password-container">
            {isValidLink ? (
                <div className="reset-password-box">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            New Password:
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </label>
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            ) : (
                <p>Validating link...</p>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message || errors.join(', ')}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetPassword;
