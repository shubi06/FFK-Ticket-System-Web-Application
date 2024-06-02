import {
    PaymentElement,
    LinkAuthenticationElement
  } from '@stripe/react-stripe-js';
  import { useState, useEffect, useContext } from 'react';
  import { useStripe, useElements } from '@stripe/react-stripe-js';
  import { CartContext } from '../Services/CartContext';

  import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51PMYxGKZSCNvwzpPpalShd0ed3RuEiZqlpa51qkcNuWIqN46ngMuPKuPq3eEhJqKsHxKhmN729ZtcVlq0LWvlCj700qYIlraVI');
  
  export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { cart, getCart } = useContext(CartContext);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
  
    useEffect(() => {
      getCart();
      // Fetch the user's email from your user context or API
      // setEmail(fetchedEmail);
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      setIsLoading(true);
  
      const totalAmount = cart.cartSeats.reduce((total, seat) => total + seat.cmimi * seat.quantity, 0) * 100; // Amount in cents
  
      const response = await fetch('http://localhost:5178/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          amount: totalAmount // amount in cents
        })
      });
  
      const data = await response.json();
  
      if (data && data.sessionId) {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/completion`,
            payment_intent: data.paymentIntent
          },
        });
  
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
      } else {
        setMessage("Failed to create checkout session.");
      }
  
      setIsLoading(false);
    }
  
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(event) => setEmail(event.value.email)}
          options={{ defaultValues: { email: email } }}
        />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    )
  }
  