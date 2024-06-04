import React, { useState, useEffect } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5178/api/About")
      .then((response) => {
        console.log(response.data);
        setSections(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">Rreth Federatës së Futbollit të Kosovës</h1>
      <table className="about-table">
        <thead>
          <tr>
            <th>Titulli</th>
            <th>Përmbajtja</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
            <tr key={section.id} className={`about-row about-row-${index}`}>
              <td className="about-title-cell">{section.title}</td>
              <td className="about-content-cell">{section.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default About;
