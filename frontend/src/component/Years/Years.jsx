import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Years.css'; // Import the CSS file

const Years = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);

    const handleYearClick = (year) => {
        navigate(`/articles/${year}`);
    };

    return (
        <div className="container">
            {[1, 2, 3, 4].map(year => (
                <div
                    key={year}
                    onClick={() => handleYearClick(year)}
                    onMouseEnter={() => setHovered(year)}
                    onMouseLeave={() => setHovered(null)}
                    className={`yearDiv ${hovered === year ? 'yearDivHover' : ''}`}
                    style={{
                        backgroundImage: `url('/path/to/image-${year}.jpg')`, // Replace with actual image paths
                    }}
                >
                    {`${year}st Year`}
                </div>
            ))}
        </div>
    );
};

export default Years;
