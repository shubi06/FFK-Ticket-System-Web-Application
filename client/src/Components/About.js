import React, { useState, useEffect } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5178/api/About") // Make sure this URL is correct
      .then((response) => {
        console.log(response.data); // Check if data is coming through
        setSections(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="about-container">
      <h1>Rreth Federatës së Futbollit të Kosovës</h1>
      <table>
        <thead>
          <tr>
            <th>Titulli</th>
            <th>Përmbajtja</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section.id}>
              <td>{section.title}</td>
              <td>{section.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default About;
