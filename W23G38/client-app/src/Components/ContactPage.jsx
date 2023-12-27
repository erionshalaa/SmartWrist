import React from 'react';
import message from '../icons/message.png';
import phone from '../icons/phone.png';
import location from '../icons/location.png';

function ContactPage() {
    return (
        <div className="container body-content">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="title display-4">Contact Us</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 d-flex">
                    <div className="card shadow text-center flex-fill">
                        <div className="card-body ">
                            <img src={location} alt="Location Icon" style={{ width: '50px', height: '50px' }} className="img-fluid icon" />
                            <h2 className="card-title" style={{ fontWeight: 'bold', color: 'rgba(255, 165, 0, 1.0)' }}>Our main offices</h2>
                            <p className="card-text" style={{ fontSize: '18px' }}>
                                <br /> Bill Clinton Boulevard, <br /> Prishtina <br /> <br /> Anton Cetta, <br /> Prishtina <br /> <br /> Zahir Pajaziti, <br /> Podujeva

                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex">
                    <div className="card shadow text-center flex-fill">
                        <div className="card-body">
                            <img src={message} alt="Message Icon" style={{ width: '50px', height: '50px' }} className="img-fluid icon" />
                            <h2 className="card-title" style={{ fontWeight: 'bold', color: 'rgba(255, 165, 0, 1.0)' }}>Get in touch</h2>

                            <p className="card-text" style={{ fontSize: '18px' }}>
                                <br />Whether you have questions about our products, want personalized recommendations, or simply want to share your thoughts with us, we'd love to hear from you. Feel free to reach out for any inquiries, feedback, or assistance. Your satisfaction is our priority!<br />
                            </p>
                            <br />
                            <a href="/ContactUs" className="btn btn-warning" style={{ border: '1px solid lightgray', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.11)' }}>Contact Us</a>

                        </div>
                        <br />
                    </div>
                </div>
                <div className="col-md-4 d-flex">
                    <div className="card shadow text-center flex-fill">
                        <div className="card-body contact-card-container">
                            <img src={phone} alt="Phone Icon" style={{ width: '50px', height: '50px' }} className="img-fluid icon" />
                            <h2 className="card-title" style={{ fontWeight: 'bold', color: 'rgba(255, 165, 0, 1.0)' }}>Contact info</h2>
                            <p className="card-text" style={{ fontSize: '18px' }}>
                                <br /> Phone: <br /> +383 49-123-456<br /> <br /> Email: <br /> smartwristcom@outlook.com <br /> smartwristcom@gmail.com <br />

                            </p>
                            <br />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ContactPage;
