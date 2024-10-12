import React from 'react';

const OurGoals = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Our Goals</h2>
            <p style={styles.description}>
                Our aim is to foster a collaborative learning environment where students can share their academic insights, exchange valuable resources, and continuously improve through peer feedback. We strive to build a comprehensive, student-powered platform that enhances knowledge-sharing, encourages critical thinking, and supports academic excellence.
            </p>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        maxWidth: '100vw',
        height:"60vh",
        textAlign: 'center',
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    title: {
        color: '#333',
        fontSize: '2em',
        marginBottom: '10px',
    },
    description: {
        color: '#555',
        fontSize: '1.2em',
        lineHeight: '1.5',
    },
};

export default OurGoals;
