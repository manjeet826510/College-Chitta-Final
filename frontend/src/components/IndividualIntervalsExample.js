import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';

function IndividualIntervalsExample() {
  return (
    <Carousel className='corousel' >
      <Carousel.Item className='carousel-item' interval={1000}>
        <ExampleCarouselImage text="First slide" imgUrl = '/testimonials/t1.jpg' />
        
      </Carousel.Item>
      <Carousel.Item className='carousel-item' interval={500}>
        <ExampleCarouselImage text="Second slide" imgUrl = '/testimonials/t2.jpg' />
        
      </Carousel.Item>
      <Carousel.Item className='carousel-item'>
        <ExampleCarouselImage text="Third slide" imgUrl = '/testimonials/t3.jpg' />
        
      </Carousel.Item>
      <Carousel.Item className='carousel-item'>
        <ExampleCarouselImage text="Third slide" imgUrl = '/testimonials/t4.jpg' />
        
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;
