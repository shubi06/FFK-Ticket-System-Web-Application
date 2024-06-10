import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPDF from './TicketPDF'; // Importo komponentin që krijuam më parë

const Success = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      navigate('/'); // Redirect to home if no userId is found
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://localhost:5178/api/bileta/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error('Failed to fetch tickets');
          navigate('/error');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        navigate('/error');
      }
    };

    fetchTickets();
  }, [navigate]);

  return (
    <div className="success-wrapper">
      <h1>Payment Successful!</h1>
      <h2>Your Tickets</h2>
      {tickets.length > 0 ? (
        <>
          <ul>
            {tickets.map(ticket => (
              <li key={ticket.id}>
                <div>{ticket.firstName} {ticket.lastName}</div>
                <div>Ndeshja: Kosova vs {ticket.ekipiKundershtar}</div>
                <div>Numri Uleses: {ticket.numriUlses }</div>
                <div>Sektori: {ticket.sektoriUlses }</div>
                <div>Cmimi: {ticket.cmimi} EUR</div>
                <div>Ora e Blerjes: {new Date(ticket.oraBlerjes).toLocaleString()}</div>
              </li>
            ))}
          </ul>
          <PDFDownloadLink
            document={<TicketPDF tickets={tickets} />}
            fileName="tickets.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download Tickets as PDF'
            }
          </PDFDownloadLink>
        </>
      ) : (
        <p>No tickets found</p>
      )}
    </div>
  );
};

export default Success;
