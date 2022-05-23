import React from 'react';
import styled from 'styled-components';

export const HomeWrapper = styled.div`
  padding: 0px 40px;
`;

const Post: React.FC = () => {
  return (
    <HomeWrapper>
      <div style={{ height: '85px' }} />
      <h1>Create Post - Protected Page</h1>
    </HomeWrapper>
  );
};

export default Post;
