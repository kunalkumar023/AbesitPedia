import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
    const navigate = useNavigate();
    const [heading, setHeading] = useState('');
    const [des, setDes] = useState('');
    const [year, setYear] = useState('');
    const [fileType, setFileType] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('des', des);
        formData.append('year', year);
        formData.append('fileType', fileType);
        if (file) {
            formData.append('file', file);
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:4000/api/v1/article/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert(res.data.message);
            setLoading(false);
            navigate('/');
        } catch (err) {
            setError('Failed to add article.');
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Add New Article</h1>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Article Heading:</label>
                    <input
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        required
                        style={styles.input}
                        placeholder="Enter article heading"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        required
                        rows="5"
                        style={styles.textarea}
                        placeholder="Enter article description"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        min="1"
                        max="4"
                        style={styles.input}
                        placeholder="Enter year"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>File Type:</label>
                    <select
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">Select File Type</option>
                        <option value="pdf">PDF</option>
                        <option value="docx">DOCX</option>
                        <option value="ppt">PPT</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Upload File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        style={styles.fileInput}
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Article'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Roboto, sans-serif',
    },
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
        letterSpacing: '1px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '15px',
        fontSize: '14px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#555',
        marginBottom: '8px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        width: '100%',
        transition: 'border-color 0.3s ease',
        outline: 'none',
    },
    inputFocus: {
        borderColor: '#4caf50',
    },
    textarea: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        width: '100%',
        resize: 'vertical',
    },
    select: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        width: '100%',
        backgroundColor: '#fff',
    },
    fileInput: {
        padding: '10px 0',
        fontSize: '16px',
        fontFamily: 'inherit',
        border: 'none',
        cursor: 'pointer',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4caf50',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
};

export default AddArticle;
