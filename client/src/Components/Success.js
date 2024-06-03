import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext';
import { CartContext } from '../Services/CartContext';
import {jwtDecode} from 'jwt-decode';

const Success = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { getCart } = useContext(CartContext);

  useEffect(() => {
    const completePayment = async () => {
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        if (!userId) {
          console.error('User ID is not available');
          return;
        }

        const response = await fetch(`http://localhost:5178/api/cart/complete-payment/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          console.log('Payment completed successfully.');
          getCart(); // Refresh the cart
        } else {
          const errorData = await response.json();
          console.error('Failed to complete payment:', errorData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    completePayment();
  }, [token, getCart]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="success-wrapper">
      <h1>Payment Successful!</h1>
      <p>Your seats have been successfully purchased.</p>
      <button onClick={handleGoBack} className="go-back-button">Go Back to Home</button>
    </div>
  );
};

export default Success;
