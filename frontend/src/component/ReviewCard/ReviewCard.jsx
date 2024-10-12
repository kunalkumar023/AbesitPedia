import React from 'react';

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    reviewer: {
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    reviewText: {
        marginBottom: '8px',
    },
    date: {
        color: '#888',
        fontSize: '14px',
    },
};

const ReviewCard = ({ reviewer, text, date }) => {
    return (
        <div style={styles.card}>
            <div style={styles.reviewer}>{reviewer}</div>
            <div style={styles.reviewText}>{text}</div>
            <div style={styles.date}>{new Date(date).toLocaleDateString()}</div>
        </div>
    );
};

export default ReviewCard;
