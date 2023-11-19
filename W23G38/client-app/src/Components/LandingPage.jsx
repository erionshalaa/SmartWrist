import React from 'react';
import apple from '../icons/apple.png';
import xiaomi from '../icons/xiaomi.png';
import fitbit from '../icons/fitbit.png';
import smartwatch from '../icons/smart-watch.png';

function LandingPage() {
    return (
        <div className="container body-content">
            <div className="container-fluid pt-4">
                <div className="row landing-page">
                    <div className="col-sm-4 text">
                        <h1 id="first-h1" class="display-2">Discover <br /> Most Suitable <br />Watches</h1>
                        <h3 className="lead">Find the best, reliable smart watches here. <br /> We focus on product quality. Here you can find<br /> smart watches of almost all brands. <br />Order now!</h3>
                    </div>
                    <div className="col-sm-8 photo">
                        <img id="bg-svg" src={smartwatch} alt="Alternate Text" className="img-fluid" />
                    </div>
                </div>

                <div className="row brands">
                    <div className="col-md-4">
                        <div className="element">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={apple} alt="Alternate Text" className="img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="text">
                                        <h2 className="h-text">Apple</h2>
                                        <p className="p-text">Apple is one of the <br /> most famous smart <br /> watches providing <br /> company</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="element">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={xiaomi} alt="Alternate Text" className="img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="text">
                                        <h2 className="h-text">Xiaomi</h2>
                                        <p className="p-text">Xiaomi smart watches <br />are produced by MI <br /> company</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="element">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={fitbit} alt="Alternate Text" className="img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="text">
                                        <h2 className="h-text">Fitbit</h2>
                                        <p className="p-text">Fitbit smart watches <br /> are best for their <br /> health and fitness <br /> features</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="title display-4">Latest Products</h1>
                </div>
            </div>

            <section style={{ backgroundColor: '#eee'}}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-12 col-lg-4 mb-3 mb-lg-0">
                            <div className="card">
                                <div className="d-flex justify-content-end p-3">
                                    <div className="btn-group">
                                        <button className="btn btn-danger rounded-circle me-2">
                                            <i className="fas fa-heart"></i>
                                        </button>
                                        <button className="btn btn-warning rounded-circle text-white">
                                            <i className="fas fa-shopping-cart"></i>
                                        </button>
                                    </div>
                                </div>

                                <img src="https://i5.walmartimages.com/seo/Apple-Watch-SE-1st-Gen-GPS-40mm-Space-Gray-Aluminum-Case-with-Midnight-Sport-Band-Regular_f243bd02-11e4-41fc-aecd-63190edc5e35.3a24d00e2b8799042fd91bc7794d7cc2.jpeg?odnHeight=431&odnWidth=646&odnBg=FFFFFF"
                                className="card-img-top img-fluid" alt="Smart-Watch" style={{width: '100%', maxHeight: '250px', objectFit: 'contain'}}/>

                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="mb-0 fw-bold">Apple Watch SE</h5>
                                        <h5 className="text-dark mb-0">$170.00</h5>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        <p className="text-muted mb-0">Available: <span class="fw-bold">6</span></p>
                                        <div className="ms-auto text-warning">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        );
}

export default LandingPage;