import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

// Import images
import diorBlushImage from '../../assets/dior_blush.png';
import yslPerfumeImage from '../../assets/ysl_perfume.png';
import carouselImage3 from '../../assets/dior_lipgloss.png';
import summerBannerImage from '../../assets/summer.jpg';
import sample_video from '../../assets/sample_video.gif';
import skin_newsletter from '../../assets/skin_newsletter.png';

function HomePage() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/shop');
  };

  const handleBannerButtonClick = () => {
    navigate('/shop');
  };

  return (
<>
    <div className={styles.homePage}>
      <div className={styles.bannerContainer}>
        <img src={summerBannerImage} alt="Summer Banner" className={styles.bannerImage} />
        <div className={styles.bannerContent}>
          {/* <h2>Shop the latest summer trends</h2> */}
          <Button className={styles.bannerButton} onClick={handleBannerButtonClick}>
            Shop Now
          </Button>
        </div>
      </div>
      <div className={styles.carouselContainer}>
        <Carousel>
          <Carousel.Item onClick={handleImageClick} className={styles.carouselItem}>
            <img
              className="d-block w-100"
              src={diorBlushImage}
              alt="Dior Blush"
            />
            <div className={styles.carouselCaption}>
              <h3>DIOR ROSY GLOW</h3>
              <p>Subtle Pink</p>
            </div>
          </Carousel.Item>
          <Carousel.Item onClick={handleImageClick} className={styles.carouselItem}>
            <img
              className="d-block w-100"
              src={yslPerfumeImage}
              alt="Yves Saint Laurent"
            />
            <div className={styles.carouselCaption}>
              <h3>YSL LIBRE EAU DE PARFUM</h3>
              <p>Warm Floral</p>
            </div>
          </Carousel.Item>
          <Carousel.Item onClick={handleImageClick} className={styles.carouselItem}>
            <img
              className="d-block w-100"
              src={carouselImage3}
              alt="Lipgloss"
            />
            <div className={styles.carouselCaption}>
              <h3>DIOR ADDICT LIPGLOSS</h3>
              <p>Rosewood</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
    
    <div className={`container ${styles.mediaContainer}`}>
    <div className="row">
      <div className="col-md-6">
      <img src={sample_video} alt="Models Video" className="w-100" />
      </div>
      <div className="col-md-6">
        <img src={skin_newsletter} alt="News Letter" className="w-100" />
      </div>
    </div>
    </div>
</>
  );
}

export default HomePage;
