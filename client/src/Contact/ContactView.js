import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ContactView() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5178/api/contact/${id}`
        );
        setContact(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact details", error);
      }
    };
    fetchContact();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!contact) return <p>No contact found</p>;

  return (
    <div className="container">
      <h3>Contact Details</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{contact.name}</h5>
          <p className="card-text">ID: {contact.id}</p>
          <p className="card-text">Name: {contact.name}</p>
          <p className="card-text">Email: {contact.email}</p>
          <p className="card-text">Message: {contact.message}</p>
        </div>
      </div>
      <Link to="/portal/contacts" className="btn btn-primary mt-3">
        Back to List
      </Link>
    </div>
  );
}

export default ContactView;
