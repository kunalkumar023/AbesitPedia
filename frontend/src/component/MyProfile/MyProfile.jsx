import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';
const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); 

                const userResponse = await axios.get('http://localhost:4000/api/v1/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                setUser(userResponse.data.user);
                setLoading(false);
            } catch (err) {
                setError('Failed to load profile. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const isImage = (fileType) => {
        return fileType.startsWith('others');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>My Profile</h1>
                <div className="user-info">
                    <img src={"https://img.icons8.com/?size=64&id=tZuAOUGm9AuS&format=png"} alt="User Avatar" className="user-avatar" />
                    <div>
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
            </div>

            <div className="articles-section">
                <h2>My Articles</h2>
                {user.articles.length > 0 ? (
                    user.articles.map(article => (
                        <div key={article._id} className="article-card">
                            <h3>{article.heading}</h3>
                            <p>{article.des}</p>
                            {article.file && (
                        <div className="file">
                            <h3>Uploaded File:</h3>
                            {isImage(article.filetype) ? (
                                <img
                                    src={`https://res.cloudinary.com/daxeb8y2k/image/upload/f_auto,q_auto/v1/${article.file.public_id}`}
                                    alt="Uploaded content"
                                    style={{ maxWidth: "600px", height: "auto", display: "block", margin: "0 auto" }}
                                />
                            ) : (
                                <iframe
                                    src={`https://res.cloudinary.com/daxeb8y2k/image/upload/f_auto,q_auto/v1/${article.file.public_id}`}
                                    height="500"
                                    width="600"
                                    frameBorder="10"
                                ></iframe>
                            )}
                        </div>
                    )}
                            <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-articles">You have not posted any articles yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
