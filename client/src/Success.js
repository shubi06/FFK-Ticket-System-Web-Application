import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPDF from './TicketPDF'; // Import the component that we created earlier
import './Success.css'; // Import the CSS file for styling

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
        <div>
          <ul className="ticket-list">
            {tickets.map(ticket => (
              <li key={ticket.id} className="ticket-item">
                <div className="ticket-info">
                  <div><strong>{ticket.firstName} {ticket.lastName}</strong></div>
                  <div>Ndeshja: <strong>Kosova vs {ticket.ekipiKundershtar}</strong></div>
                  <div>Numri Uleses: <strong>{ticket.numriUlses}</strong></div>
                  <div>Sektori: <strong>{ticket.sektoriUlses}</strong></div>
                  <div>Cmimi: <strong>{ticket.cmimi} EUR</strong></div>
                  <div>Ora e Blerjes: <strong>{new Date(ticket.oraBlerjes).toLocaleString()}</strong></div>
                </div>
                <PDFDownloadLink
                  document={<TicketPDF tickets={[ticket]} />}
                  fileName={`ticket-${ticket.id}.pdf`}
                  className="download-link"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download Ticket'
                  }
                </PDFDownloadLink>
              </li>
            ))}
          </ul>
          <div className="download-all">
            <PDFDownloadLink
              document={<TicketPDF tickets={tickets} />}
              fileName="all-tickets.pdf"
              className="download-link"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download All Tickets'
              }
            </PDFDownloadLink>
          </div>
        </div>
      ) : (
        <p>No tickets found</p>
      )}
    </div>
  );
};

export default Success;
