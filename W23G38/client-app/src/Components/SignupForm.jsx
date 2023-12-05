import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SignupForm() {
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: ''
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsLoggedIn(!!storedToken);
    }, []);

    if (isLoggedIn) {
        return window.location.href = '/';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrors({
                ...errors,
                passwordError: 'Passwords do not match'
            });
            return;
        }

        try {
            setErrors({
                ...errors,
                passwordError: ''
            });

            const response = await axios.post('https://localhost:7180/api/auth/register', {
                Email: formData.email,
                Password: formData.password,
                ConfirmPassword: formData.confirmPassword,
                Name: formData.firstName,
                UserName: formData.firstName,
                Surname: formData.lastName
            });

            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                alert('Registration was Successful');
            } 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailExistsError(true);
            } else {
                console.error('Error occurred:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === 'password') {
            const uppercaseRegex = /[A-Z]/;
            const symbolRegex = /[!@#$%^&*.]/;
            const numberRegex = /[0-9]/;

            const hasUppercase = uppercaseRegex.test(value);
            const hasSymbol = symbolRegex.test(value);
            const hasNumber = numberRegex.test(value);

            let errorMessage = '';

            if (!hasUppercase) {
                errorMessage += 'Password must contain at least one uppercase letter';
            } else if (!hasSymbol) {
                errorMessage += (errorMessage ? ', ' : '') + 'Password must contain at least one symbol (!@#$%^&*.)';
            } else if (!hasNumber) {
                errorMessage += (errorMessage ? ', ' : '') + 'Password must contain at least one number';
            } else if (value.length < 8) {
                errorMessage += (errorMessage ? ', ' : '') + 'Password must contain and be at least 8 characters long';
            }

            setErrors({
                ...errors,
                passwordError: errorMessage
            });
        } else if (id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors({
                    ...errors,
                    emailError: 'Invalid email format',

                });
            }
            else {
                setErrors({
                    ...errors,
                    emailError: ''
                });
            }

        }
        else if (id === 'confirmPassword') {
            if (value !== formData.password) {
                setErrors({
                    ...errors,
                    passwordError: 'Passwords do not match'
                });
            }
            else {
                setErrors({
                    ...errors,
                    passwordError: ''
                });
            }
        }


        setFormData({
            ...formData,
            [id]: value
        });
    };




    return (
        <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }} >
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card mx-4 mx-md-5 shadow" >
                    <div className="card-body py-5 px-md-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className="fw-bold mb-5">Sign up now</h2>
                                {emailExistsError &&(
                                    <div className="alert alert-danger" role="alert">
                                        This email is already in use
                                    </div>
                                       )}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" required id="firstName" className="form-control form-control-lg" placeholder=" " value={formData.firstName} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="firstName">First name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" id="lastName" className="form-control form-control-lg" placeholder=" "
                                                    value={formData.lastName}
                                                    onChange={handleInputChange} required />
                                                <label className="form-label" htmlFor="lastName">Last name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="email" id="email" className="form-control form-control-lg" placeholder=" "
                                            value={formData.email}
                                            onChange={handleInputChange} required />
                                        <label className="form-label" htmlFor="email">Email address</label>
                                        {errors.emailError && <p style={{ color: 'red' }}>{errors.emailError}</p>}
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="password" id="password" className="form-control form-control-lg" placeholder=" "
                                                    value={formData.password} onChange={handleInputChange} required />
                                                {errors.passwordError && <p style={{ color: 'red' }}>{errors.passwordError}</p>}

                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="password" id="confirmPassword" className="form-control form-control-lg" placeholder=" "
                                                    value={formData.confirmPassword} onChange={handleInputChange} required />
                                                
                                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
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
