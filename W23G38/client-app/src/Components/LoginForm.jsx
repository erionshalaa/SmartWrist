import React from 'react';

function LoginForm() {
    return (
        <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card mx-4 mx-md-5 shadow">
                    <div className="card-body py-5 px-md-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className="fw-bold mb-5">Welcome Back</h2>
                                <form>
                                    <div className="form-floating mb-4">
                                        <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder=" " />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder=" " />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="d-flex justify-content-start">
                                                <a href="/" className="text-decoration-none">Forgot Password?</a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-check d-flex justify-content-end">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33Right" />
                                                <label className="form-check-label" htmlFor="form2Example33Right">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg mb-3 form-control">
                                        Log in
                                    </button>
                                    <div className="text-center">
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

export default LoginForm;
