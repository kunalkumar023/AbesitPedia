import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/user/${id}`);
                setUser(response.data.user);
                setArticles(response.data.articles);
                setLoading(false);
            } catch (err) {
                setError('Failed to load user data. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-profile-container">
            {user && (
                <div className="user-info">
                    <img
                        src="https://img.icons8.com/?size=64&id=tZuAOUGm9AuS&format=png"
                        alt="User Profile"
                        className="user-profile-pic"
                    />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )}

            {/* Display user's articles */}
            <div className="user-articles">
                <h3>{user.name}'s Articles</h3>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article._id} className="article">
                            <h4>{article.heading}</h4>
                            <p>{article.des}</p>
                            <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
