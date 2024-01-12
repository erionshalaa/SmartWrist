import React, { useState, useEffect } from 'react';
import axios from 'axios';




function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: ''
    });
    const [Error, setError] = useState(false);
    


    useEffect(() => {
        // Fetch user data and set it in the form
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://localhost:7180/api/Auth/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data.data;
                setFormData({
                    name: userData.name,
                    surname: userData.surname,
                    email: userData.email,
                    role: userData.roles,
                    id: userData.id
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `https://localhost:7180/api/Auth/updateuser`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('User profile updated successfully');
        } catch (error) {
            setError(true);
            console.error('Error updating user profile:', error);
        }
    };



    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    
    return (
        <section className="text-center" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card mx-4 mx-md-5 shadow">
                    <div className="card-body py-5 px-md-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 className="fw-bold mb-5">Edit Profile</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {Error && (
                                            <div className="alert alert-danger" role="alert">
                                                Error updating user profile!
                                            </div>
                                        )}
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" required id="name" className="form-control form-control-lg" placeholder=" "
                                                    value={formData.name} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="firstName">First name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" id="surname" className="form-control form-control-lg" placeholder=" "
                                                    value={formData.surname}
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
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="text" id="role" className="form-control form-control-lg" placeholder=" "
                                            value={formData.role} readonly />
                                        <label className="form-label" >Role</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="text" id="id" className="form-control form-control-lg" placeholder=" "
                                            value={formData.id} readonly />
                                        <label className="form-label" >Id</label>
                                    </div>



                                    <button type="submit" className="btn btn-primary btn-lg mb-3 form-control">
                                        Update Profile
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

export default EditProfile;

