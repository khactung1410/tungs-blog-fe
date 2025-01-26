import React from 'react';

interface MeContainerProps {
  avatar: string; // URL hoặc đường dẫn tới ảnh avatar
  text?: string;   // Văn bản hiển thị
}

const MeContainer: React.FC<MeContainerProps> = ({ avatar, text }) => {

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center', // Căn giữa theo chiều dọc
        gap: '12px', // Khoảng cách giữa avatar và text
        margin: '12px 6px'
      }}
    >
      <a>
        <img
          src={avatar}
          alt="Avatar"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
          className="avatar"
        />
      </a>
      <div>{text ? text : ''}</div>
    </div>
  );
};

export default MeContainer;
