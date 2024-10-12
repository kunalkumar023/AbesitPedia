import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';
import './Signin.css';  // Import the CSS file

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:4000/api/v1/login', formData);
            dispatch(authActions.login());

            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('user', JSON.stringify(response.data.isUser)); 

            setLoading(false);
            alert(response.data.message);

            navigate('/year'); 
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Invalid email or password.');
            alert(error);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
