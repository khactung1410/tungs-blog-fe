/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';

export const HomeWrapper = styled.div`
  padding: 0px 40px;
`;

const HomePage: React.FC = () => {
  const userinfo = useAppSelector((state: any) => state.authentication.userInfo);
  return (
    <HomeWrapper>
      <h1>{userinfo?.userName}&apos;s Blogs</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
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
                  <i className="far fa-newspaper" /> News
                </h6>
                <h4 className="blog-card-caption">
                  <a href="https://www.youtube.com/watch?v=eM213aMKTHg&list=PLv4t9A05XFZpIR_vrOzcTV-wcEww5xZwt&index=1">
                    Lorem Ipsum is simply dummy text of the printing and
                  </a>
                </h4>
                <p className="blog-card-description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <div className="ftr">
                  <div className="author">
                    <a href="https://www.youtube.com/watch?v=eM213aMKTHg&list=PLv4t9A05XFZpIR_vrOzcTV-wcEww5xZwt&index=1">
                      <img
                        src="https://picsum.photos/id/1005/5760/3840"
                        alt="..."
                        className="avatar img-raised"
                      />
                      <span>Lorem</span>
                    </a>
                  </div>
                  <div className="stats">
                    <i className="far fa-clock" /> 10 min
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
