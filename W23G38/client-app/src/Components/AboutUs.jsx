import React from 'react';
import whatwedo from '../icons/whatwedo.png';
import mission from '../icons/mission.png';
import history from '../icons/history.png';

function AboutUs() {

    const containerStyle = {
        padding: '20px',
        paddingTop: '70px'
    };
    const aboutUsSectionStyle = {
        backgroundColor: '#331',
        color: '#fff',
        padding: '30px',
        borderRadius: '15px'
    };
    const imageStyle = {
        maxWidth: '50%',
        height: 'auto',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto', 
        display: 'block',     
    };

    const SecondImage = {
        maxWidth: '65%', 
        height: 'auto',
        marginBottom: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',  
    };

    return (

        <div className="container body-content" style={containerStyle}>
            {/* Upper Section */}
            <div className="row text-light p-5 mb-4">
                <div className="col-md-12">
                    <div style={aboutUsSectionStyle}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>About Us</h2>
                        <h3 style={{ fontSize: '1.3em', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Welcome to Smart Wrist, where time meets technology in style.</h3>
                        <p style={{ fontSize: '1.1em', fontFamily: 'Arial, sans-serif' }}>
                            Our passion for smart tech drives us to deliver a seamless shopping experience, ensuring you access the latest innovations in wearable tech. <br />
                            Explore our platform to discover a world where fashion meets functionality, and timekeeping becomes a statement.
                        </p>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-12 text-center">
                        <h1 style={{ fontSize: '2.8em', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', padding: '30px', marginTop: '30px', color: 'black' }} >Who We Are</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 d-flex">
                        <div className="card shadow flex-fill">
                            <div className="card-body card-container-color">
                                <h2 className="card-title custom-card-title">History of Our Page</h2>
                                <img src={history} alt="History" className="img-fluid mx-auto" style={imageStyle} />
                                <p className="card-text">
                                    It all began with a vision to create an innovative space where technology and style intersect. From our humble beginnings, we have evolved into a premier destination for smart watches enthusiasts. Over the years, our commitment to quality, cutting-edge products, and exceptional customer service has been the driving force behind our growth. Explore the milestones that have shaped our story and join us in celebrating the rich history of Smart Wrist.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex">
                        <div className="card shadow flex-fill">
                            <div className="card-body card-container-color">
                                <h2 className="card-title custom-card-title">What we are offering</h2>
                                <img src={whatwedo} alt="History" className="img-fluid mx-auto" style={SecondImage} />
                                <p className="card-text">
                                    Our carefully curated collection features cutting-edge smartwatches from top brands, ensuring you stay connected and stylish at all times. Whether you're looking for fitness tracking, advanced health features, or simply a sleek accessory, we have something for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex">
                        <div className="card shadow flex-fill">
                            <div className="card-body card-container-color">
                                <h2 className="card-title custom-card-title">Our Mission</h2>
                                <img src={mission} alt="History" className="img-fluid  custom-image mx-auto" style={imageStyle} />
                                <p className="card-text">
                                    At Smart Wrist, our mission is to redefine the way you experience smart technology. We are dedicated to curating a collection of top-notch smart watches that seamlessly blend style and functionality. Our goal is to empower individuals with cutting-edge wearable tech, providing a bridge between fashion and innovation. Committed to delivering excellence, we aim to enhance your lifestyle by offering high-quality products and an unparalleled shopping experience. Join us in embracing the future of smart living.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
