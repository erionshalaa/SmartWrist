import React from 'react';


function ContactUs() {
    return (
        <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card mx-4 mx-md-5 shadow">
                    <div className="card-body py-5 px-md-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className="fw-bold mb-5">Do you have a message?</h2>
                                <form>
                                    <div className="form-floating mb-4">
                                        <input type="text" id="form3Example1" className="form-control form-control-lg" placeholder="your name..." />
                                        <label className="form-label" htmlFor="form3Example1">Name</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="email" id="form3Example2" className="form-control form-control-lg" placeholder="your email address..." />
                                        <label className="form-label" htmlFor="form3Example2">Email Address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <textarea id="form3Example3" className="form-control form-control-lg" placeholder="Your message..." rows="4"></textarea>
                                        <label className="form-label" htmlFor="form3Example3">Message</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg mb-3 form-control">
                                        Submit
                                    </button>
                                    <div>
                                        <p className="mb-0 mt-5">
                                            Don't have an account? <a href="/signup" className="text-decoration-none fw-bold">Sign Up</a>
                                        </p>
                                    </div>
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