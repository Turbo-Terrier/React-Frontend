import '../css/simple-slider.css'
import '../css/simple-slider-swiper-bundle.min.css'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'

function ImageSlides() {

    const containerStyle = {
        paddingBottom: '24px',
    };


    return (
        <div className="container" style={containerStyle}>
            <Carousel slide={true} interval={6000}>
                <Carousel.Item>
                    <Image src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" fluid />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" fluid />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" fluid />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default ImageSlides;
