/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import my_avatar from '../../images/tung_english_avatar.png';

export const HomeWrapper = styled.div`
  padding: 0px 0px;
`;

const HomePage: React.FC = () => {
  return (
    <HomeWrapper>
      <div style={{ height: '100px' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginLeft: '40px' }}>
        {Array.from(Array(10).keys()).map((key) => (
          <div key={key} className="single-blog-wrapper">
            <div className="blog-card blog-card-blog">
              <div className="blog-card-image">
                <img
                  className="img"
                  alt="..."
                  src="https://picsum.photos/id/1084/535/353?grayscale"
                />
                <div className="ripple-cont" />
              </div>
              <div className="blog-table">
                <h6 className="blog-category blog-text-success">
                  <i className="far fa-newspaper" /> Active
                </h6>
                <h4 className="blog-card-caption">
                  Lớp 3A
                </h4>
                <p className="blog-card-description">
                  Ghi chú: ......
                </p>
                <div className="ftr">
                  <div className="author">
                    <p>
                      <img
                        src={my_avatar}
                        alt="..."
                        className="avatar img-raised"
                      />
                      <span>GVCN: TungDK</span>
                    </p>
                  </div>
                  <div className="stats">
                    <i className="far fa-clock" /> Sĩ số:
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </HomeWrapper>
  );
};

export default HomePage;
