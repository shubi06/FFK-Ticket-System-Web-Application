// src/components/Slider.js
import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import Slide1 from '../Assets/Slider1.2.jpg';
import Slide2 from '../Fadil.jpg';
import Slide3 from '../Fadil.jpg';
import './Slider.css';

const Slider = () => (
  <div className="slider-container">
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-slide"
          src={Slide1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-slide"
          src={Slide2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-slide"
          src={Slide3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <Button className="static-button"  variant="danger">Buy Now Ticket</Button>
  </div>
);

export default Slider;
/*<Link className="nav-link" to="/portal/list-users">
          <span>USERS</span>
        </Link>*/
        