import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleByYear.css';
import UserCard from '../UserCard/UserCard';

const ArticlesByYear = () => {
    const { year } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/api/v1/articles/${year}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArticles(response.data.articles);
                console.log(response.data.articles)
                setLoading(false);
            } catch (err) {
                setError('Failed to load articles. Please try again later.');
                setLoading(false);
            }
        };

        fetchArticles();
    }, [year]);

    const handleReviewSubmit = async (articleId) => {
        if (!newReview) {
            alert("Review cannot be empty.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:4000/api/v1/article/review/${articleId}`, {
                des: newReview,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setArticles(prevArticles =>
                prevArticles.map(article =>
                    article?._id === articleId ? { ...article, reviews: [...article.reviews, response.data.review] } : article
                )
            );
            setNewReview('');
        } catch (error) {
            alert('Failed to submit review. Please try again later.');
        }
    };

    const handleUpvoteArticle = async (articleId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:4000/api/v1/articles/upvote/${articleId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setArticles(prevArticles =>
                prevArticles.map(article =>
                    article?._id === articleId ? { ...article, upvotes: response.data.upvotes } : article
                )
            );
        } catch (error) {
            alert('Failed to upvote. Please try again later.');
        }
    };

    const isImage = (fileType) => {
        return fileType.startsWith('other');  // Fix for checking image types
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (articles.length === 0) {
        return <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>No articles available for {year} Year.</div>;
    }

    return (
        <div className="Artcontainer">
            <h1>Articles for {year} Year</h1>
            {articles && articles.length > 0 ? (
                articles.map(article => (
                    article && (  // Ensure article is not null or undefined
                    
                        <div key={article._id} className="article-container">
                            <div className="article-header">
                                {console.log(article)
                                }
                                <UserCard article={article} />
                            </div>

                            <h2>{article.heading}</h2>
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
                            <p>Upvotes: {article.upvotes.length}</p>

                            <button onClick={() => handleUpvoteArticle(article._id)}>
                                Upvote
                            </button>

                            <h3>Reviews:</h3>
                            <div className="reviews">
                                {article.reviews && article.reviews.length > 0 ? (
                                    article.reviews.map(review => (
                                        review && (  // Ensure review is not null
                                            <div key={review._id} className="review-container">
                                                <UserCard article={review} />
                                                <p>{review.des}</p>
                                                <p>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>

                            <textarea
                                value={newReview}
                                onChange={e => setNewReview(e.target.value)}
                                placeholder="Add your review here..."
                            />
                            <button onClick={() => handleReviewSubmit(article._id)}>Submit Review</button>
                        </div>
                    )
                ))
            ) : (
                <p>No articles available.</p>
            )}
        </div>
    );
};

export default ArticlesByYear;
