import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { id: 1, src: "/slider6.png" },
  { id: 2, src: "/slider5.webp" },
  { id: 3, src: "/slider4.jpg" },
  { id: 4, src: "/slider3.png" },
  { id: 5, src: "/slider2.jpg" },
  { id: 6, src: "/slider1.png" }
];

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      updateCount: 0
    };
  }

  componentDidMount() {
    // Change slide every 4 seconds
    this.interval = setInterval(() => {
      this.slider.slickNext();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () =>
        this.setState(state => ({
          updateCount: state.updateCount + 1
        })),
      beforeChange: (current, next) =>
        this.setState({ slideIndex: next })
    };
    return (
      <div className="slider">
        <center>
        <Slider {...settings} ref={slider => (this.slider = slider)}>
          {images.map(image => (
            <div key={image.id}>
              <img src={image.src} alt={image.id} />
            </div>
          ))}
        </Slider>
        </center>
       {/*<div>Current Slide Index: {this.state.slideIndex}</div>*/ } 
      </div>
    );
  }
}

export default SliderComponent;
