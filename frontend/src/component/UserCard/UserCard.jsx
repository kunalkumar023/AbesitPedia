import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';

const UserCard = ({ article }) => {
  if (!article || !article.owner) {
    return null; // Return null or display a placeholder if owner data is missing
  }

  return (
    <div className="user-info">
      <div className='logoname' style={{ display: 'flex' }}>
        <Link to={`/user/${article.owner._id}`}>
          <img
            src={'https://img.icons8.com/?size=64&id=tZuAOUGm9AuS&format=png'}
            alt="User Profile"
            className="user-profile"
          />
        </Link>
        <p style={{ paddingTop: '10px' }}>{article.owner.name}</p>
      </div>
      <p>{article.owner.email}</p>
    </div>
  );
};

export default UserCard;
