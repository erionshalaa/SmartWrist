import React, { useState } from 'react';
import axios from 'axios'; 

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/ContactsAPI', formData);
            alert('Message sent successfully!');
        } catch (error) {
            alert('Message could not be sent. Please try again later.');
        }
    };

    return (
        <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card mx-4 mx-md-5 shadow">
                    <div className="card-body py-5 px-md-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className="fw-bold mb-5">Do you have a message?</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-4">
                                        <input value={formData.name} type="text" name="name" id="form3Example1" className="form-control form-control-lg" placeholder="your name..." onChange={handleChange} />
                                        <label className="form-label" htmlFor="form3Example1">Name</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input value={formData.email} type="email" name="email" id="form3Example2" className="form-control form-control-lg" placeholder="your email address..." onChange={handleChange} />
                                        <label className="form-label" htmlFor="form3Example2">Email Address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <textarea value={formData.message} name="message" id="form3Example3" className="form-control form-control-lg" placeholder="Your message..." rows="4" onChange={handleChange}></textarea>
                                        <label className="form-label" htmlFor="form3Example3">Message</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg mb-3 form-control">
                                        Submit
                                    </button>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;
