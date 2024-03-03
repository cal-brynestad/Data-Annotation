import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import flowerImage from './images/flower.jpg';
import dogImage from './images/dog.jpeg';
import skyImage from './images/sky.jpeg';

const images = [
  { src: flowerImage, alt: 'Flower' },
  { src: dogImage, alt: 'Dog' },
  { src: skyImage, alt: 'Sky' },
];

function App() {
  return (
    <div className="carousel-container">
      <Carousel>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
