
import React from 'react';
import Header from './Header';
import Slider from './Slider';
import './Home.css'; // Import the CSS file

const Home = () => (
  <div>

  <Slider/>
    
    <div className="content-container">
      <section className="news-section">
        <h2>Latest News</h2>
        <div className="news-content">
          <div className="news-item">
            <h3>News Title 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae nisl scelerisque dictum.</p>
          </div>
          <div className="news-item">
            <h3>News Title 2</h3>
            <p>Phasellus eget lacus eget augue pulvinar lacinia. Curabitur ullamcorper diam nec eros auctor, non gravida velit laoreet.</p>
          </div>
          <div className="news-item">
            <h3>News Title 3</h3>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vitae elit a ligula tincidunt.</p>
          </div>
        </div>
      </section>
      <section className="matches-section">
        <h2>Upcoming Matches</h2>
        <div className="matches-content">
          <div className="match-item">
            <h3>Team A vs Team B</h3>
            <p>Date: June 15, 2024</p>
            <p>Time: 7:00 PM</p>
            <p>Location: Stadium 1</p>
            <button className="buy-ticket-button">Buy Ticket</button>
          </div>
          <div className="match-item">
            <h3>Team C vs Team D</h3>
            <p>Date: June 20, 2024</p>
            <p>Time: 5:00 PM</p>
            <p>Location: Stadium 2</p>
            <button className="buy-ticket-button">Buy Ticket</button>
          </div>
          <div className="match-item">
            <h3>Team E vs Team F</h3>
            <p>Date: June 25, 2024</p>
            <p>Time: 8:00 PM</p>
            <p>Location: Stadium 3</p>
            <button className="buy-ticket-button">Buy Ticket</button>
          </div>
        </div>
      </section>
      <section className="results-section">
        <h2>Recent Results</h2>
        <div className="results-content">
          <div className="result-item">
            <h3>Team A 2-1 Team B</h3>
            <p>Date: May 10, 2024</p>
            <p>Location: Stadium 1</p>
          </div>
          <div className="result-item">
            <h3>Team C 3-0 Team D</h3>
            <p>Date: May 15, 2024</p>
            <p>Location: Stadium 2</p>
          </div>
          <div className="result-item">
            <h3>Team E 1-1 Team F</h3>
            <p>Date: May 20, 2024</p>
            <p>Location: Stadium 3</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default Home;
