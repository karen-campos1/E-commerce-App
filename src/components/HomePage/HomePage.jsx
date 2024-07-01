import React, { useState } from 'react';
import { Carousel as BootstrapCarousel, Button, Modal } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

// Import images
import diorBlushImage from '../../assets/dior_blush.png';
import yslPerfumeImage from '../../assets/ysl_perfume.png';
import diorlipgloss from '../../assets/dior_lipgloss.png';
import summerBannerImage from '../../assets/summer.jpg';
import sample_video from '../../assets/sample_video.gif';
import skin_newsletter from '../../assets/skin_newsletter.png';
import glow_enhancer from '../../assets/glow_enhancer.png'
import newsletter1 from '../../assets/1.png';
import newsletter2 from '../../assets/2.png';
import gifbanner from '../../assets/home-banner.gif';
import cream_img from '../../assets/cream_img.png';
import serum from '../../assets/serum.png';

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Add useState here

  const handleImageClick = () => {
    navigate('/shop');
  };

  const handleBannerButtonClick = () => {
    navigate('/shop');
  };

  const handleNewsletterImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.bannerContainer}>
          <img src={summerBannerImage} alt="Summer Banner" className={styles.bannerImage} />
          <div className={styles.bannerContent}>
            <Button className={styles.bannerButton} onClick={handleBannerButtonClick}>
              Shop Now
            </Button>
          </div>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselContainer}>
            <h2>Featured Products</h2>
            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={5000}
              infinite={true}
              className={styles.carousel}
            >
              <div className={styles.productCard}>
                <img src={diorBlushImage} alt="Dior Rosy Glow" className={styles.carouselImage} />
                <h3 className="carouselCaption">Dior Rosy Glow</h3>
                <p>Subtle Pink</p>
                <Link to="/shop" className={styles.shopNow}>Shop Now</Link>
              </div>
              <div className={styles.productCard}>
                <img src={yslPerfumeImage} alt="YSL Libre Eau De Parfum" className={styles.carouselImage} />
                <h3>YSL Libre Eau De Parfum</h3>
                <p>Warm Floral</p>
                <Link to="/shop" className={styles.shopNow}>Shop Now</Link>
              </div>
              <div className={styles.productCard}>
                <img src={diorlipgloss} alt="Dior Addict Lipgloss" className={styles.carouselImage} />
                <h3>Dior Addict Lipgloss</h3>
                <p>Rosewood</p>
                <Link to="/shop" className={styles.shopNow}>Shop Now</Link>
              </div>
              <div className={styles.productCard}>
                <img src={glow_enhancer} alt="Armani Glow Enhancer" className={styles.carouselImage} />
                <h3>Armani Glow Enhancer</h3>
                <p>Sun Kissed</p>
                <Link to="/shop" className={styles.shopNow}>Shop Now</Link>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className={`container ${styles.mediaContainer}`}>
        <div className="row">
          <div className="col-md-6">
            <img src={sample_video} alt="Models Video" className="w-100" />
          </div>
          <div className="col-md-6" onClick={handleNewsletterImageClick}>
            <img src={skin_newsletter} alt="Newsletter" className="w-100" />
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Newsletter Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={newsletter1} alt="Newsletter" className="img-fluid" />
          <img src={newsletter2} alt="Another Newsletter Image" className="img-fluid mt-3" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.gifBannerContainer}>
        <img src={gifbanner} alt="GIF Banner" className={styles.gifBanner} />
      </div>
    </>
  );
}

export default HomePage;
