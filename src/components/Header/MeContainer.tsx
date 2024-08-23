/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import my_avatar from '../../images/tung_english_avatar.png';

const styledName = {
  color: '#27272a',
  fontWeight: '600',
  fontSize: '20px',
  textDecoration: 'none'
};

const styledRole = {
  padding: '0 0 4px 8px',
  color: '#616e7c',
  fontSize: '15px'
};

const MeContainer: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <a href="/">
        <img
          src={my_avatar}
          alt="Tung Duong Khac"
          height="64"
          width="63"
          style={{ borderRadius: '50%' }}
          className="avatar"
        />
      </a>
      <div>
        <a href="https://www.facebook.com/tienganhmrtung/" style={styledName} target="_blank" rel="noopener noreferrer">
          Mr.Tung English
        </a>
        <div style={styledRole}>English With Joy</div>
      </div>
    </div>
  );
};

export default MeContainer;
