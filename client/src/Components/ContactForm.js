import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = ({ contact, onSave }) => {
  const [formData, setFormData] = useState({
    name: contact ? contact.name : "",
    email: contact ? contact.email : "",
    message: contact ? contact.message : "",
  });

  const [thankYouMessage, setThankYouMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedContact;
      if (contact) {
        const response = await axios.put(
          `http://localhost:5178/api/contact/${contact.id}`,
          formData
        );
        savedContact = response.data;
      } else {
        const response = await axios.post(
          "http://localhost:5178/api/contact",
          formData
        );
        savedContact = response.data;
      }
      setThankYouMessage("Faleminderit për kontaktin");
      onSave(savedContact);
    } catch (error) {
      console.error("There was an error saving the contact!", error);
    }
  };

  useEffect(() => {
    if (thankYouMessage) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [thankYouMessage, navigate]);

  return (
    <div id="contact-form-container">
      {thankYouMessage ? (
        <div id="thank-you-message">{thankYouMessage}</div>
      ) : (
        <>
          <h2 id="contact-form-title">
            {contact ? "Edit Contact" : "Create Contact"}
          </h2>
          <form id="unique-contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Emri:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mesazhi:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Dërgo</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;
