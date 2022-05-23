import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const RightSideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const NewBlogButton = styled.button`
  background-color: #0164ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  margin: 0 10px;
`;
