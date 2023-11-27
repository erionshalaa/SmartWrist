import React from 'react';



function SignupForm() {
    return (
            <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }} >
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="card mx-4 mx-md-5 shadow" >
                        <div className="card-body py-5 px-md-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <h2 className="fw-bold mb-5">Sign up now</h2>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input type="text" id="form3Example1" className="form-control form-control-lg" placeholder=" " />
                                                    <label className="form-label" for="form3Example1">First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input type="text" id="form3Example2" className="form-control form-control-lg" placeholder=" " />
                                                    <label className="form-label" for="form3Example2">Last name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder=" " />
                                            <label className="form-label" for="form3Example3">Email address</label>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder=" " />
                                                    <label className="form-label" for="form3Example4">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder=" " />
                                                    <label className="form-label" for="form3Example4">Confirm Password</label>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-lg mb-3 form-control">
                                            Sign up
                                        </button>
                                        <div className="text-center">
                                            <p>or sign up with:</p>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-google"></i>
                                            </button>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-twitter"></i>
                                            </button>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-github"></i>
                                            </button>
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

export default SignupForm;