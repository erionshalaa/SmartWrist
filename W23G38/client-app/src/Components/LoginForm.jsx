import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []); 

    if (isLoggedIn) {
        return window.location.href = '/';
    }



    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('https://localhost:7180/api/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                
                localStorage.setItem('token', token);
                
                setIsLoggedIn(true);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setLoginError(true);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (


        <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card mx-4 mx-md-5 shadow">
                    <div className="card-body py-5 px-md-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className="fw-bold mb-5">Welcome Back</h2>
                               
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}>
                                    {loginError && ( 
                                        <div className="alert alert-danger" role="alert">
                                            Login failed. Please check your credentials.
                                        </div>
                                    )}
                                    <div className="form-floating mb-4">
                                        <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder=" "
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder=" "
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
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
