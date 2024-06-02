/*import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../Services/CartContext';

const Success = () => {
  const { clearCart } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    if (sessionId) {
      console.log('Payment successful, clearing cart...');
      clearCart();
    }
  }, [clearCart, location]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your payment was successful. Your cart has been cleared.</p>
    </div>
  );
};

export default Success;

*/
